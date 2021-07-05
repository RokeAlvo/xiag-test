import React, {ChangeEvent, FormEvent, useEffect} from 'react';
import {
    useParams
} from "react-router-dom";
import {observer} from "mobx-react";
import {useStores} from "../../hooks/useStore";
import ResultTable from "../../components/ResultTable/ResultTable";
import style from './Poll.module.css'
import Button from "../../components/Button/Button";
import classnames from "classnames";

function Poll() {
    const store = useStores()
    const {id} = useParams() as { id: string };
    useEffect(() => {
        store.pollPageStore.fetchPageData(id)
    }, [id, store.pollPageStore])
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await store.pollPageStore.submitForm()
    }
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        store.pollPageStore.name = e.target.value
    }
    const onChangeAnswer = (answerId: string) => {
        return () => {
            store.pollPageStore.activeAnswerId = answerId
        }
    }
    return (
        <div className={classnames('container', style.root)}>
            <h1>{store.pollPageStore.title}</h1>
            <form onSubmit={onSubmit} className={style.form}>
                <input
                    type="text"
                    disabled={store.pollPageStore.posted}
                    value={store.pollPageStore.name}
                    onChange={onChangeName}
                    className={style.input}
                />
                <div className={style.answerBlock}>
                    {store.pollPageStore.answers.map(a =>
                        <label className={style.answer} key={a.id}>
                            <input
                                type="radio"
                                name="answers" value={a.id}
                                onInput={onChangeAnswer(a.id)}
                                disabled={store.pollPageStore.posted}
                            />
                            <span key={a.title}>{a.title}</span>
                        </label>
                    )}
                </div>
                <Button type="submit" disabled={store.pollPageStore.disabled}>SUBMIT</Button>
            </form>
            {store.pollPageStore.pollResult?.length > 0 ? (
                <div className={style.resultTable}>
                    <h2>Results: </h2>
                    <ResultTable
                        answers={store.pollPageStore.answers}
                        votes={store.pollPageStore.pollResult}
                    />
                </div>
            ) : null}
        </div>
    );
}

export default observer(Poll)
