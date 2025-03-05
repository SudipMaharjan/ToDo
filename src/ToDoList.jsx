import { useState } from 'react'
import deleteIcon from './assets/delete.png';
import checkIcon from './assets/check.png';
import revertIcon from './assets/revert.png';

function ToDoList(){
    const [newTask, setNewTask] = useState('');
    const [completedTasks, setCompletedTasks] = useState([]);
    const [tasks, setTasks] = useState([]);

    function handleInputChange(e){
        setNewTask(e.target.value);
    }

    function AddTask(){
        if(newTask.trim() != ""){
            setTasks(t=> [...tasks, newTask]);
            setNewTask('');
        }
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_,i)=> i!== index);
        setTasks(updatedTasks);
    }

    function markDOne(index){
        setCompletedTasks(t=> [...completedTasks, tasks[index]]);
        deleteTask(index);
    }

    function revertTaskCompletion(index){
        setTasks(t=> [...tasks, completedTasks[index]]);
        const updatedCompletedTasks = completedTasks.filter((_,i)=> i!== index);
        setCompletedTasks(updatedCompletedTasks);
    }

    return(
        <div className='to-do-list'>
            <h1>To-Do List</h1>
            <input 
                type="text" 
                className='input-field'
                onChange={handleInputChange}
                value={newTask} 
                placeholder="Enter task" />
            <button 
                onClick={AddTask}
                title='Add Task'
                className='add-button'>
                Add Task
            </button>
            {tasks.length > 0 && (<div className='due-tasks-container'>
                <h3>Due Tasks</h3>
                <ul>
                    {tasks.map((task, index) => 
                        <li key={index}>
                            <span className='text'>{task}</span>
                            <div>
                                <button
                                    title='Mark as Completed'
                                    onClick={() => markDOne(index)}
                                    className='check-button'>
                                        <img src={checkIcon} width="20px" height="20px"/>
                                </button>
                                <button 
                                    title='Delete Task'
                                    onClick={() => deleteTask(index)} 
                                    className='delete-button'>
                                        <img src={deleteIcon} width="20px" height="20px"/>
                                </button>
                            </div>
                        </li>
                    )}
                </ul>
            </div>)}
            
            {completedTasks.length >0 && (<div className='completed-tasks-container'>
                <h3>Completed Tasks</h3>
                <ul>
                    {completedTasks.map((completedTask, index) => 
                        <li key={index}>
                            <span className='text'>{completedTask}</span>
                            <div>
                                <button
                                    className='revert-completion-button'
                                    title='revert Task Completion'
                                    onClick={()=>revertTaskCompletion(index)} >
                                        <img src={revertIcon} width="20px" height="20px"/>
                                </button>
                            </div>
                        
                        </li>
                    )}
                </ul>
            </div>)}            
                
        </div>
    );
}

export default ToDoList;