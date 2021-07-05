import React from 'react';
import style from './InputWithLabel.module.css'
import classnames from "classnames";

type Props = {
    className?: string,
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    noNode?: boolean,
    disabled?: boolean
}

export default function InputWithLabel({className, label, onChange, value, noNode, disabled}: Props) {
    return (
        <label className={classnames(style.label, className)} style={noNode ? {display: 'contents'} : {}}>
            {label}
            <input
                type="text"
                className={style.input}
                onChange={onChange}
                value={value}
                disabled={disabled}
            />
        </label>
    );
}
