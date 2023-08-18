import { useEffect, useState } from 'react';
import Form from '../components/Form'
import List from '../components/List';
import StopWatch from '../components/StopWatch';
import style from './App.module.scss'
import { ITask } from '../types/task';

const App = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selected, setTaskSelected] = useState<ITask>()
  const [btnDisable, setBtnDisable] = useState<boolean>(true)

  function selectTask(taskSelected:ITask) {
    setTaskSelected(taskSelected);
    setTasks(oldTasks => oldTasks.map(task => ({
      ...task,
      selected: task.id === taskSelected.id,
    })));
    
    setBtnDisable(false)
  }

  const taksDone = () => {
    if (selected && selected.enable) {
      setTaskSelected(undefined)
      setTasks(oldTasks => oldTasks.map(task => {
        if (selected.id === task.id) {
          return {
            ...task,
            selected: false,
            completed: true
          }
        }
        
        return {
          ...task,
          enable: true
        };
      }))
    }
  }

  const startWatch = (validation:boolean = false) => {
    if (selected) {      
      setTasks(oldTasks => oldTasks.map(task => {
        if (task.id !== selected.id && !task.completed) {
          return {
            ...task,
            enable: validation
          }
        }
        return {
          ...task,
          selected: false
        };
      }))
      setBtnDisable(true)
    }    
  }

  const deleteTask = (id:string) => {
    setTasks(oldTasks => oldTasks.filter(old => old.id !== id))    
    localStorage.setItem("Tasks", JSON.stringify([]))
  }
  
  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem("Tasks", JSON.stringify(tasks))
    }
    
  }, [tasks])

  useEffect(() => {
    if (localStorage.getItem("Tasks")) {
      setTasks(JSON.parse(localStorage.getItem("Tasks") || ''))
    }
  }, [])
  

  return (
    <div className={style.AppStyle}>
      <Form setTasks={setTasks}/>
      <List tasks={tasks} selectTask={selectTask} deleteTask={deleteTask}/>
      <StopWatch 
        selected={selected} 
        taksDone={taksDone}
        startWatch={startWatch}
        btnDisable={btnDisable}
        setBtnDisable={setBtnDisable}
      />
    </div>
  );
}

export default App;
 