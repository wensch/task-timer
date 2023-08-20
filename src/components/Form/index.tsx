import React, { useState } from "react";
import Button from "../Button";
import style from './Form.module.scss'
import { ITask } from "../../types/task";
import {v4 as uuidv4} from 'uuid';

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
};

const Form = ({ setTasks }: Props)  => {

  const [state, setState] = useState({
    task: '',
    time: "00:00:10",
    color: "#4D4D4D"
  });

  const [msgError, setMsgError] = useState<string>('')


  function addTask(e:React.FormEvent) {
    e.preventDefault();

    setTasks(oldTasks => {
      if (!oldTasks.find(t => state.task === t.task)) {
        setMsgError('')
        return [
          ...oldTasks,
          {
            ...state,
            selected: false,
            completed: false,
            id: uuidv4(),
            enable: true,
          }
        ]
      }

      setMsgError('Tarefa já cadastrada')
      return oldTasks
    })
    resetState()
  }

  function resetState() {
    setState({
      task: '',
      time: "00:00:00",
      color: "#4D4D4D"
    })
  }

  return(
    <form className={style.novaTarefa} onSubmit={addTask}>
      <div className={style.inputContainer}>
        <label htmlFor="task">Adicione um novo estudo </label>
        <input type="text" name="task" id="task" onChange={e => {setState({...state, task: e.target.value})}} value={state.task} placeholder="O que você quer estudar ?" required />
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="time">Tempo</label>
        <input type="time" step="1" name="time" id="time" onChange={e => setState({...state, time: e.target.value})} value={state.time} min="00:00:00" max="01:30:00" required />
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="cor">Cor</label>
        <input type="color" step="1" name="cor" id="cor" onChange={e => setState({...state, color: e.target.value})} value={state.color} min="00:00:00" max="01:30:00" required />
      </div>
      <Button type="submit">Adicionar </Button>
      {msgError && <span className={style.msgError}>{msgError}</span>}
    </form> 
  )
}

export default Form;