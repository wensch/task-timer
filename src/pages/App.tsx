import { useState } from 'react';
import Form from '../components/Form'
import List from '../components/List';
import StopWatch from '../components/StopWatch';
import style from './App.module.scss'
import { ITask } from '../types/task';

const App = () => {

  // UseStates
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selected, setTaskSelected] = useState<ITask>()

  function selectTask(taskSelected:ITask) {
    setTaskSelected(taskSelected);
    setTasks(oldTasks => oldTasks.map(task => ({
      ...task,
      selected: task.id === taskSelected.id,
    })));
  }

  function taksDone() {
    if (selected && selected.enable) {
      setTaskSelected(undefined)
      setTasks(oldTasks => oldTasks.map(task => {
        if (task.id === selected.id) {
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

  // function tested () {
  //   selected && selected.enable ? setTasks(oldTaks => testeb(oldTaks, selected, true)) : setTasks(oldTasks => testeb(oldTasks, selected, false))

  // }

  // function testeb (oldTasks: ITask[], selected: ITask, bool: boolean) {
  //   return oldTasks.map(task => {
  //     if (task.id === selected.id) {
  //       return {
  //         ...task,
  //         selected: false,
  //         completed: bool
  //       }
  //     }
      
  //     return {
  //       ...task,
  //       enable: true
  //     };
  //   })
  // }

  function startWatch() {
    if (selected) {
      setTaskSelected(undefined)
      setTasks(oldTasks => oldTasks.map(task => {
        if (task.id !== selected.id && !task.completed) {
          return {
            ...task,
            selected: false,
            enable: false
          }
        }
        return task;
      }))
    }
  }

  return (
    <div className={style.AppStyle}>
      <Form setTasks={setTasks}/>
      <List tasks={tasks} selectTask={selectTask}/>
      <StopWatch 
        selected={selected} 
        taksDone={taksDone}
        startWatch={startWatch}
      />
    </div>
  );
}

export default App;
 