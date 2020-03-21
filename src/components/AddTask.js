import React, {useState} from "react";
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment'; 

import { firebase } from '../Firebase';
import { generatePushId } from '../helpers';

import { useSelectedProjectValue } from '../context';


export const AddTask = ({ showAddTaskMain = true, shouldShowMain = false, showQuickAddTask, setShowQuickAddTask }) => {
   
   const [task, setTask] = useState('');
   const [taskDate, setTaskDate] = useState('');
   const [project, setProject] = useState('');
   const [showMain, setShowMain] = useState(shouldShowMain);
   const [showProjectOverlay, setShowProjectOverlay] = useState(false);
   const [showTaskDate, setShowTaskDate] = useState(false);

   const { selectedProject } = useSelectedProjectValue();
   const addTask = () => {
      const projectId = project || selectedProject || 'INBOX';

      let collatedDate = '';

      if (projectId === 'TODAY' || projectId === 'INBOX') {
         collatedDate = moment().format('DD/MM/YYYY');
      }

      if (projectId === 'NEXT_7') {
         collatedDate = moment()
            .add(7, 'days')
            .format('DD/MM/YYYY');
      }

      return (task && 
         projectId && 
         firebase
            .firestore()
            .collection('tasks')
            .add({
               project,
               task,
               archived: false,
               date: collatedDate || taskDate,
               userId: 'JtVxjg9IDZGZSFzI2OVq'
            })
            .then(() => {
               setTask('');
               setProject('');
               setShowMain('');
               setShowProjectOverlay(false);
            })
         );
   }

   
   return (
      <div className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task' }
         data-testid="add-task-comp">
         {showAddTaskMain && (
            <div className="add-task__shallow"
               data-testid="show-main-action"
               onClick={() => setShowMain(!showMain)}>
               <span className="add-task__plus">+</span>   
               <span className="add-task__text">Add Task</span>   
            </div>
         )}

         {(showMain || showQuickAddTask) && (
            <div className="add-task__main" data-testid="add-task-main">
               {showQuickAddTask && (
                  <div>
                     <h2 className="header">Quick Add Task</h2>
                     <span className="add-task__cancel-x"
                        data-testid="add-task-quick-cancel"
                        onClick={() => {
                           setShowMain(false);
                           setShowProjectOverlay(false);
                           setShowQuickAddTask(false);
                        }}>x</span>
                  </div>

               )}
               <p>ProjectOverlay here</p>
               <p>Task Date here</p>
               <input className="add-task__content" 
                  data-testid="add-task-content"
                  type="text"
                  value={task}
                  onChange={e => setTask(e.target.value)}
                  /> 
               <button className="add-task__submit"
                  type="button"
                  data-testid="add-task"
                  onClick={()=> addTask()}>Add Task</button>
               {!showQuickAddTask && (   
                  <span className="add-task__cancel-x"
                     data-testid="add-task-main-cancel"
                     onClick={() => {
                        setShowMain(false);
                        setShowProjectOverlay(false);
                     }}>
                        Cancel
                     </span>
               )}
               <span className="add-task__project"
                  data-testid="show-project-overlay"
                  onClick={() => setShowProjectOverlay(!showProjectOverlay)}>
                  <FaRegListAlt />
               </span>
               <span className="add-task__date"
                  data-testid="show-task-date-overlay"
                  onClick={() => setShowTaskDate(!setShowTaskDate)}>
                  <FaRegCalendarAlt />   
               </span>

            </div>
         )}
      </div>
   );
};