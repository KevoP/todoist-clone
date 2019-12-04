import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import moment from 'moment';
import { collatedTasksExist } from '../helpers';

export const useTasks = selectedProject => {
    const [tasks, useTasks] = useState([]);

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

    }, []);
};

export const useProjects = () => {
    const [projects, useProjects] = useState([]);

    useEffect(() => {}, []);
};