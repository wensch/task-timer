import {useEffect, useState} from "react";
import { timeForSecond } from "../../common/utils/time";
import { ITask } from "../../types/task";
import Button from "../Button"
import Clock from "./Clock"
import style from './StopWatch.module.scss'

interface Props {
  selected: ITask | undefined,
  taksDone: () => void,
  startWatch: () => void
}

const StopWatch = ({selected, taksDone, startWatch} : Props) => {
  
  const [time, setTime] = useState<number>();
  const [BlinkWatch, setBlinktWatch] = useState<boolean>(false)

  useEffect(() => {
    if (selected?.time) {
      setTime(timeForSecond(selected.time));
    }
  }, [selected])
  
  function regressive(count:number = 0) { 

    startWatch()
    setBlinktWatch(true)
    
    setTimeout(() => {
     if (count > 0) {
        setTime(count - 1);
        return regressive(count - 1);
      }
      taksDone()
      setBlinktWatch(false)
    }, 1000);
  }

  return (
    <div className={style.cronometro}>
      <h3 className={style.titulo}> Escolha um card e inicie o cronômetro </h3>
      <div className={style.relogioWrapper}>
        <Clock time={time} BlinkWatch={BlinkWatch} />
      </div>
      <Button onClick={() => regressive(time)}> Começar ! </Button>
    </div>
  )
}

export default StopWatch