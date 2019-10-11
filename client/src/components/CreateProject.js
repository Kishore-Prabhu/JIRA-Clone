import React, { Component } from 'react'
import {Modal, Form, Button, Dropdown} from 'semantic-ui-react'
import * as projectActions from '../actions/projects';
import { connect } from 'react-redux';

class CreateProject extends Component {    
    constructor(props){
        super(props);
        this.state = {
            title: "",
            abbreviation: "",
            description: "",
            type: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e,data) => {
        
        const value = data != undefined ? data.value : e.target.value;
        const name = data != undefined ? data.name : e.target.name;
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit = () => {
        this.props.createNewProject(this.state);
        
    }
    static getDerivedStateFromProps(nextProps,prevState){
        console.log(nextProps);
        return prevState;
    }
    

    render(){
        const renderTypeOptions = () => {
            var opts = [
                {
                    key:"dev", value:"dev", text:"Dev" 
                },
                {
                    key:"test", value:"test", text:"Test"
                },
                {
                    key:"poc", value:"poc", text:"PoC"
                }
            ]       
            return (
                <Form.Field>
                        <label>Type</label>
                        <Dropdown
                            name="type" 
                            placeholder="Project type"
                            value={this.state.type}
                            fluid
                            search
                            selection
                            options={opts}
                            onChange={this.handleChange}/>
                    </Form.Field>
            )
        }

        return(
            <Modal 
                trigger={<Button color="blue">Create New Project</Button>} 
                centered={"false"} 
                size={"small"}
                closeOnDimmerClick={false}
                closeIcon
                >
                <Modal.Header as="h3">Add Project details</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required >
                            <label>Project Name</label>
                            <input 
                            placeholder='Project Name' 
                            name="title"
                            onChange={this.handleChange}/>
                        </Form.Field>

                        <Form.Field>
                            <label>Abbreviation</label>
                            <input 
                                placeholder='Abbreviation' 
                                name="abbreviation"
                                onChange={this.handleChange}/>
                        </Form.Field>
                        {renderTypeOptions()}
                        <Form.TextArea 
                            label='Description' 
                            placeholder='Tell us more about your project...' 
                            name="description"
                            onChange={this.handleChange}/>
                        <Form.Button fluid basic color="green" className="outline" >Create project</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

CreateProject = connect(null,projectActions)(CreateProject)
export default CreateProject