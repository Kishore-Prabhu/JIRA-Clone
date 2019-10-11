import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Header, Form, Message } from 'semantic-ui-react';
import InputField from './InputField';
import { signUpFields } from './formFields';
import * as actions from '../../actions/auth';

class SignUp extends Component {
    componentWillUnmount(){
        this.props.removeAlerts();
    }

    renderFields(){
        return _.map(signUpFields, field => 
            <Field key={field.name} component={InputField}
            type="text"
            name={field.name}
            fields={field}
            />
        )
    }

    renderAlert(){
        if(this.props.signUpAlert){
            return (
                <Message color={this.props.signUpAlert.color}>{this.props.signUpAlert.message}</Message>
            )
        }
    }

    render(){
        return (
            <div>
                <Form onSubmit={this.props.handleSubmit(this.props.signUp)}>
                    <Header as='h3' color='blue' textAlign='center'>
                        {' '}Create a New Account
                    </Header>
                    {this.renderFields()}
                    <Button type="submit" color='blue' fluid size='large'>Login</Button>
                </Form>
                {this.renderAlert()}
            </div>
        )
    }
}

function validate(values){
    const errors = {};
    _.each(signUpFields, ({ name }) => {

		if(!values[name]){
			errors[name] = `You must provide a ${name}`;
		}
    })
    
    return errors;
}

function mapStateToProps(state){
    return {
        signUpAlert: state.auth.alert
    }
}

SignUp = connect(mapStateToProps, actions)(SignUp);

export default reduxForm({
    validate,
    form: 'signUpForm'
})(SignUp);