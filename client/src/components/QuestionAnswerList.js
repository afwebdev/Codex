import React from 'react';
import { Button, Comment, Form, Header, Grid } from 'semantic-ui-react'

const Questionlist = props => {
    console.log(props)
    return (
        <>
            <h1>{props.question}</h1>
        </>
    )
}


const Answerlist = props => {
    return (
        <>
        <Grid columns={1}>
            <Grid.Row>
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text id={props.id}>{props.children}</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action id={props.id} onClick={props.reply}>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
            </Grid.Row>
        </Grid>
        </>
    )
}

export { Questionlist, Answerlist };