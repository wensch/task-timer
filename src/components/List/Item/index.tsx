import { ITask } from "../../../types/task";
import style from "./Item.module.scss";

interface Props extends ITask {
  selectTask: (task: ITask) => void
}


const Item = ({task, time, completed, selected, id, enable,  selectTask}: Props) => {

  return (
    <li className={`
      ${style.item} 
      ${selected ? style.itemSelecionado : ''}
      ${completed ? style.itemCompletado : ''}
      ${enable ? '' : style.itemNotEnable}
    `} onClick={() => !completed && selectTask({
      task,
      time,
      completed,
      selected,
      id,
      enable
    })}>
      <h3>{task}</h3>
      <span>{time}</span>
      {completed && <span className={style.concluido} aria-label="tarefa concluída"></span>}
    </li>
  )
}

export default Item