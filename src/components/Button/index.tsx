import React from 'react'

import style from './Button.module.scss'


interface Props {
  type?: "button" | "submit" | "reset" | undefined,
  children: React.ReactNode,
  onClick?: () => void,
  disable?: boolean
}

const Button = ({onClick, type, children, disable}: Props) => {

  return (
    <button type={type} onClick={onClick} className={style.botao} disabled={disable}>
      {children} 
    </button>
  )
}

export default Button