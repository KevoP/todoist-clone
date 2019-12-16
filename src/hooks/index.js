import { useState, useEffect } from "react";
import { firebase } from "../Firebase";
import moment from 'moment';
import { collatedTasksExist } from '../helpers';
import { stringify } from "querystring";

export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .where('user_id', '==', 'JtVxjg9IDZGZSFzI2OVq');

        unsubscribe = selectedProject && !collatedTasksExist(selectedProject) 
            ? unsubscribe = unsubscribe.where('project_id', '==', selectedProject)
            : (selectedProject === 'TODAY')
                ? (unsubscribe = unsubscribe.where('date', '==', moment.format('DD/MM/YYYY')))
                : (selectedProject === 'INBOX' || selectedProject === 0)
                    ? (unsubscribe = unsubscribe.where('date', '==', moment.format('')))
                    : unsubscribe;

        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }));


            setTasks(
                selectedProject === 'NEXT_7'
                    ? newTasks.filter(
                        task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7
                            && task.archived !== true)
                    : newTasks.filter(task =>task.archived !== true)
            );

            setArchivedTasks(newTasks.filter(task => task.archived !== true));
        });



        return () => unsubscribe();
    }, [selectedProject]);

    return { tasks, archivedTasks };
};

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection('projects')
            // .where('userId', '==', 'JtVxjg9IDZGZSFzI2OVq')
            .where('userId', '==', '1')
            .orderBy('projectId')
            .get()
            .then(snapshot => {
                const allProjects = snapshot.docs.map( project => ({
                    ...project.data(),
                    docId: project.id
                }));
            
                if(JSON>stringify(allProjects) !== JSON>stringify(projects)){
                    setProjects(allProjects);
                }
            });

    }, [projects]);

    return { projects, setProjects }
};