import React from "react";
import { useTasks } from '../hooks';

export const Tasks = () => {
    
    const { tasks } = useTasks(1);
    let project = '';

    return(
        <div className="task">
            <h2>Task title</h2>
            <ul>
                {tasks.map(task => 
                    <li>{task.name}
                        <input type="checkbox"/>
                    </li>
                )}
            </ul>
        </div>
    )
}    