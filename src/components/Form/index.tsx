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
    time: "00:00:00",
  });

  function addTask(e:React.FormEvent) {
    e.preventDefault();
    setTasks(oldTasks => [
      ...oldTasks,
      {
        ...state,
        selected: false,
        completed: false,
        id: uuidv4(),
      }
    ])
    resetState()
  }

  function resetState() {
    setState({
      task: '',
      time: "00:00:00",
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
      <Button type="submit">Adicionar </Button>
    </form> 
  )
}

export default Form;