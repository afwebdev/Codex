import React from 'react';
import { Button, Comment, Form, Header, Grid } from 'semantic-ui-react'

const Reply = props =>{
return(
<Form>
    <Form.TextArea id="Reply"/>
    <Button
        id={props.id}
        content='Add Reply'
        labelPosition='left'
        icon='edit'
        primary
        onClick={props.submitReply}
    />
</Form>
)
}

export {Reply};