import { ITask } from '../../types/task'
import Item from './Item'
import style from './List.module.scss'

interface Props {
  tasks: ITask[],
  selectTask: (task: ITask) => void
}

const List = ({tasks, selectTask}: Props) => {
  return (
    <aside className={style.listaTarefas}>
      <h2> Estudos do dia </h2>
      <ul>
        {
          tasks.map(item => (
            <Item 
              key={item.id} 
              {...item}
              selectTask={selectTask} 
            />
          ))
        }
      </ul>
    </aside>
  )
}
export default List