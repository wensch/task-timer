import React from 'react'

import style from './Button.module.scss'


interface Props {
  type?: "button" | "submit" | "reset" | undefined,
  children: React.ReactNode,
  onClick?: () => void
}

const Button = ({onClick, type, children}: Props) => {
  return (
    <button type={type} onClick={onClick} className={style.botao}>
      {children} 
    </button>
  )
}

export default Button