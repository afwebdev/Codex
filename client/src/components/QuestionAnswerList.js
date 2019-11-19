import React from 'react';

const Questionlist = props => {
    console.log(props)
    return(
        <>
        <h1>{props.question}</h1>
        <h1>This is inside the component</h1>
        </>
    )
}

const Answerlist = props => {
    return (
        <ul>{props.children}</ul>
    )
}

export  {Questionlist,Answerlist};