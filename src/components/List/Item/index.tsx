import { ITask } from "../../../types/task";
import style from "./Item.module.scss";

interface Props extends ITask {
  selectTask: (task: ITask) => void,
  deleteTask: (id: string) => void
}


const Item = ({task, time, color, completed, selected, id, enable, selectTask, deleteTask}: Props) => {

  return (
    <>
      <button className={style.buttonRemove} disabled={!enable} onClick={() => deleteTask(id)}>X</button>
      <li 
        style={{backgroundColor: color}}
        className={`
          ${style.item} 
          ${selected ? style.itemSelecionado : ''}
          ${completed ? style.itemCompletado : ''}
          ${enable ? '' : style.itemNotEnable}
        `} 
        onClick={() => !completed && selectTask({
          task,
          time,
          color,
          completed,
          selected,
          id,
          enable
        })}
        >
        <h3>{task}</h3>
        <span>{time}</span>
        {completed && <span className={style.concluido} aria-label="tarefa concluída"></span>}
        
      </li>
    </>
  )
}

export default Item