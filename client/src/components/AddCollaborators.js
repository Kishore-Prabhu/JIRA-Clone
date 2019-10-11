
import React, { Component } from 'react';
import {Modal, Button, Form} from 'semantic-ui-react'

export default class AddCollaborators extends Component{
    render(){
        return(
            <Modal size="small" centered={false} trigger={<Button color="blue">Create New Issue</Button>} closeIcon>
                <Modal.Header>Add New User</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field required>
                            <label>Username</label>
                            <input placeholder="Username"/>
                        </Form.Field>
                        <Form.Field label='Priority' control='select'>
                            <option value='high'>High</option>
                            <option value='medium'>Medium</option>
                            <option value='low'>Low</option>
                        </Form.Field>
                        
                        <Form.TextArea label='Description' placeholder='Explain more about the issue...' />
                        <Form.Field>
                            <label>Assigned To</label>
                            <input placeholder="enter username"/>
                        </Form.Field>
                        <Form.Button fluid>Create Ticket</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}