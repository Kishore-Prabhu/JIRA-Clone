import _ from 'lodash';
import React, { Component } from 'react';
import {Modal, Button, Form} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createUserFields } from './Auth/formFields';
import * as actions from '../actions/users';
import InputField from './Auth/InputField';
import { withRouter } from 'react-router-dom';

class CreateUser extends Component{

    renderFields(){
        return _.map(createUserFields, field => 
            <Field key={field.name} component={InputField}
            type="text"
            name={field.name}
            fields={field}
            />
        )
    }

    render(){
        return(
            <Modal 
                size="small" 
                centered={"false"} 
                trigger={<Button color="blue">Create New User</Button>} 
                closeOnDimmerClick={false}
                closeIcon
                >
                <Modal.Header>Create New User</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.props.handleSubmit(this.props.createNewUser)}>
                        {this.renderFields()}
                        <Form.Button type="submit" fluid>Create User</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

function validate(values){
    const errors = {};
    // fields = ["name"]
    _.each(createUserFields, ({ name }) => {

		if(!values[name]){
			errors[name] = `You must provide a ${name}`;
		}
    })
    
    return errors;
}

CreateUser = connect(null,actions)(withRouter(CreateUser))

export default reduxForm({
    validate,
    form:'newUserForm'
})(CreateUser)