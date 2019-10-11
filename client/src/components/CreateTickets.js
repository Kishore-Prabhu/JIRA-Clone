import React, { Component } from 'react';
import {Modal, Button, Form, Dropdown} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as issueActions from '../actions/issues';

class CreateTickets extends Component{
    constructor(props){
        super(props);
        this.state = {summary:'',issueType:'',priority:'',description:'',assignee:''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e,data) => {
        
        const value = data != undefined ? data.value : e.target.value;
        const name = data != undefined ? data.name : e.target.name;
        // console.log(name,value);
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit = () => {
        // console.log("STATE",this.state)
        this.props.createIssue(this.state,this.props.match.params.projectId)
    }

    render(){
        // render all fields of the form
        const renderTicketName = () => {
           
            return (
                <Form.Field required>
                    <label>Ticket Name</label>
                    <input name="summary"
                         value={this.state.summary}
                         placeholder="Ticket Name"
                         onChange={this.handleChange}/>
                </Form.Field>
            )
        }
        
        const renderPriorityOptions = () => {
            var opts = [
                {
                    key:"low", value:"low", text:"Low" 
                },
                {
                    key:"medium", value:"medium", text:"Medium"
                },
                {
                    key:"high", value:"high", text:"High"
                },
                {
                    key:"severe", value:"severe", text:"Severe"
                },
            ]       
            return (
                <Form.Field>
                        <label>Priority</label>
                        <Dropdown
                            name="priority" 
                            placeholder="Priority"
                            // value={this.state.priority}
                            fluid
                            search
                            selection
                            options={opts}
                            onChange={this.handleChange}/>
                    </Form.Field>
            )
        }

        const renderIssueType = () => {
            var opts = [
                {
                    key:"bug",
                    value:"bug",
                    text:"Bug"
                },
                {
                    key:"epic",
                    value:"epic",
                    text:"Epic"
                },
                {
                    key:"task",
                    value:"task",
                    text:"Task"
                },
                {
                    key:"story",
                    value:"story",
                    text:"Story"
                },
            ]       
            return (
                <Form.Field>
                        <label>Issue Type</label>
                        <Dropdown 
                            name="issueType"
                            placeholder="type"
                            value={this.state.issueType}
                            fluid
                            search
                            selection
                            options={opts}
                            onChange={this.handleChange}/>
                    </Form.Field>
            )
        }
        const renderDescription = () => {
            return(
                <Form.TextArea 
                name="description"
                label='Description' 
                placeholder='Explain more about the issue...'
                onChange={this.handleChange}/>
            )
        }

        const renderAssignField = () => {
            // console.log(this.props.users)
            return (
                    <Form.Field>
                        <label>Assigned To</label>
                            <Dropdown
                                name="assignee" 
                                placeholder="Users"
                                fluid
                                search
                                selection
                                options={this.props.users}
                                onChange={this.handleChange}/>
                    </Form.Field>
            )
        }

        return(
            <Modal size="small" centered={"false"} 
                    trigger={<Button color="blue">Create New Issue</Button>} 
                    onOpen={()=> this.props.onOpen()}
                    closeOnDimmerClick={false}
                    closeIcon
                    >
                <Modal.Header>Create New Ticket</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        {renderTicketName()}
                        {renderPriorityOptions()}
                        {renderIssueType()}
                        {renderDescription()}
                        {renderAssignField()}
                        <Form.Button fluid type="submit">Create Ticket</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}
const validate = values =>{
    // console.log("Form Value",values)
}
CreateTickets = connect(null,issueActions)(withRouter(CreateTickets))
export default CreateTickets
