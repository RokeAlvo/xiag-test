import classnames from 'classnames';
import React from 'react';
import {Vote, Answer} from '../../../../common/poll';
import style from './ResultTable.module.css'

type Props = {
    className?: string,
    answers: Answer[]
    votes: Vote[]
}

export default function ResultTable({className, votes, answers}: Props) {
    const voteRowList = votes.map(vote =>
        [{text: vote.userName, isActive: false}].concat(answers.map((answer) => {
            return {text: '', isActive: vote.answer && vote.answer.id === answer.id};
        }))
    )

    const cssVar = {'--columns': answers.length}

    return (
        // @ts-ignore
        <div className={classnames(className, style.root)} style={cssVar}>
            <div className={style.header}>
                <span className={classnames(style.cell, style.justifyStart, style.headerCell)}>Name</span>
                {answers.map(a =>
                    <span key={a.id} className={classnames(style.cell, style.headerCell)}>{a.title}</span>
                )}
            </div>
            {voteRowList.map((row, i) =>
                <div className={style.row} key={i}>
                    {row.map((cell, index) =>
                        <span key={index} className={classnames(style.cell, {
                            [style['cell--active']]: cell.isActive,
                            [style.justifyStart]: index===0
                        })}>
                                {cell.isActive ? 'X' : cell.text}
                            </span>
                    )}
                </div>
            )}
        </div>
    );
}
