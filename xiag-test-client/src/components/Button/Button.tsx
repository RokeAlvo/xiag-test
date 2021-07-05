import React from 'react';
import style from './Button.module.css'
import classNames from "classnames";

type Props = {
    className?: string,
    children: React.ReactNode,
    onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void
    disabled?: boolean,
    type?: 'submit' | 'button'
}

export default function Button({className, children, disabled, type, ...props}: Props) {
    return (
        <button type={type ?? "button"} disabled={disabled} className={classNames(className, style.root, {[style.disabled]: !!disabled})} {...props}>{children}</button>
    )
}
