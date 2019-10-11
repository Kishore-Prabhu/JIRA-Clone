import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Header, Form, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import InputField from './InputField';
import { signInFields } from './formFields';
import * as actions from '../../actions/auth';

class SignIn extends Component {
    componentWillUnmount(){
        this.props.removeAlerts();
    }

    componentWillUpdate(nextProps){
        if(nextProps.authenticated){
            this.props.history.push('/dashboard');
        }
    }

    renderFields(){
        return _.map(signInFields, field => 
            <Field key={field.name} component={InputField}
            type="text"
            name={field.name}
            fields={field}
            />
        )
    }

    renderAlert(){
        if(this.props.signInAlert){
            return (
                <Message color={this.props.signInAlert.color}>{this.props.signInAlert.message}</Message>
            )
        }
    }

    render(){
        return (
            <div>
                <Form onSubmit={this.props.handleSubmit(this.props.signIn)}>
                    <Header as='h3' color='blue' textAlign='center'>
                        {' '}Welcome Back
                    </Header>
                    {this.renderFields()}
                    <Button type="submit" primary fluid size='large'>Login</Button>
                </Form>
                {this.renderAlert()}
            </div>
        )
    }
}

function validate(values){
    const errors = {};
    _.each(signInFields, ({ name }) => {

		if(!values[name]){
			errors[name] = `You must provide a ${name}`;
		}
    })
    
    return errors;
}

function mapStateToProps(state){
    return {
        signInAlert: state.auth.alert,
        authenticated: state.auth.authenticated
    }
}

SignIn = connect(mapStateToProps, actions)(withRouter(SignIn));

export default reduxForm({
    validate,
    form: 'signInForm'
})(SignIn);