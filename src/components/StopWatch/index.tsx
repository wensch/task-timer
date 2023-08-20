import {useEffect, useState} from "react";
import { timeForSecond } from "../../common/utils/time";
import { ITask } from "../../types/task";
import Button from "../Button"
import Clock from "./Clock"
import style from './StopWatch.module.scss'

interface Props {
  selected: ITask | undefined,
  taksDone: () => void,
  startWatch: (validation:boolean) => void,
  btnDisable: boolean,
  setBtnDisable: React.Dispatch<React.SetStateAction<boolean>>,
}
  let timeout: NodeJS.Timeout

const StopWatch = ({selected, taksDone, startWatch, btnDisable, setBtnDisable} : Props) => {
  
  const [time, setTime] = useState<number>();
  const [BlinkWatch, setBlinktWatch] = useState<boolean>(false)
  const [controllerWatch, setControllerWatch] = useState<boolean>(true)


  useEffect(() => {
    if (selected?.time) {
      setTime(timeForSecond(selected.time));
    }
  }, [selected])
  

  function regressive(count:number = 0) {
    startWatch(false)
    
    timeout = setTimeout(() => {
      if (count > 0) {
        setControllerWatch(false)
        setTime(count - 1);
        
        setBlinktWatch(true)
        return regressive(count - 1);
      }
      setControllerWatch(true)
      taksDone()
      setBlinktWatch(false)
    }, 1000);
  }

  function stopTime() {
    clearTimeout(timeout)
    setBtnDisable(false) 
    setBlinktWatch(false)
  }
  
  function resetTime() {
    startWatch(true)
    clearTimeout(timeout)
    setTime(0);
    setBtnDisable(true)
    setControllerWatch(true)
    setBlinktWatch(false)
  }

  return (
    <div className={style.cronometro}>
      <h3 className={style.titulo}> Escolha um card e inicie o cronômetro </h3>
      <div className={style.relogioWrapper}>
        <Clock time={time} BlinkWatch={BlinkWatch} />
      </div>
      <div className={style.holderButtons}>
        <Button onClick={() => stopTime()} disable={controllerWatch}> <span className={style.btnPause}></span> </Button>
        <Button onClick={() => regressive(time)} disable={btnDisable}> <span className={style.btnStart}></span> </Button>
        <Button onClick={() => resetTime()} disable={controllerWatch}> <span className={style.btnStop}></span> </Button>
      </div>
    </div>
  )
}

export default StopWatch