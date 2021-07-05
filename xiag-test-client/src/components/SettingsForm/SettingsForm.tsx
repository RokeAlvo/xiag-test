import React, {ChangeEvent} from 'react';
import style from './SettingsForm.module.css'
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import Button from "../Button/Button";
import {observer} from "mobx-react";
import {useStores} from "../../hooks/useStore";
import {useHistory} from 'react-router-dom';


const component = observer(function SettingsForm() {

        const store = useStores().settingsFormStore
        const history = useHistory();

        const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
            store.question = (e.target.value)
        }

        const onChangeAnswer = (index: number) => {
            return (e: ChangeEvent<HTMLInputElement>) => {
                const newList = [...store.answerList]
                newList[index] = e.target.value
                store.answerList = newList
            }
        }

        const addAnswer = () => {
            store.answerList.push('')
        }

        const onSubmit = async () => {
            const poll = await store.createPoll()
            if (!poll) {
                //todo handle error
                return
            }
            history.push(`/poll/${poll.id}`)
        }

        return (
            <div className={style.root}>
                <InputWithLabel
                    label={'Question:'}
                    value={store.question}
                    onChange={onChangeQuestion}
                    noNode={true}
                    disabled={store.isLoading}
                />
                {store.answerList.map((answer, index) => (
                    <InputWithLabel
                        key={index}
                        label={'Answer ' + (index + 1)}
                        onChange={onChangeAnswer(index)}
                        value={answer}
                        className={style.listItem}
                        noNode={true}
                        disabled={store.isLoading}
                    />
                ))}
                <Button
                    onClick={addAnswer}
                    className={style.addButton}
                    disabled={store.isLoading}
                >
                    +
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={!store.disabled}
                    className={style.submit}
                >
                    START
                </Button>
            </div>
        );

    }
)

export default component
