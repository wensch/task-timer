import style from './Clock.module.scss'

interface Props {
  time: number | undefined,
  BlinkWatch: boolean
}

const Clock = ({time = 0, BlinkWatch = false}: Props) => {

  const min = Math.floor(time / 60)
  const sec = time % 60;
  const [minD, minU] = String(min).padStart(2, '0');
  const [secD, secU] = String(sec).padStart(2, '0');

  return (
    <>
      <span className={style.relogioNumero}>{minD}</span>
      <span className={style.relogioNumero}>{minU}</span>
      <span className={`
        ${style.relogioDivisao}
        ${BlinkWatch ? style.start : ''}
        `}>:</span>
      <span className={style.relogioNumero}>{secD}</span>
      <span className={style.relogioNumero}>{secU}</span>
    </>
  )
}

export default Clock