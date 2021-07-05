import React from 'react';
import style from './index.module.css'
import classNames from "classnames";
import SettingsForm from "../../components/SettingsForm/SettingsForm";

export default function Index() {
    return (
        <div className={classNames(style.wrapper, 'container')}>
            <h1 className={style.title}>Your question</h1>
            <SettingsForm/>
        </div>
    )
}
