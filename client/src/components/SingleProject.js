import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Header, List, Card, Modal,Button} from 'semantic-ui-react';
import { throws } from 'assert';
import CreateTickets from './CreateTickets';

import * as newUserActions from '../actions/users';
import * as projectActions from '../actions/projects';
import * as issuesActions from '../actions/issues';

import SidebarMenu from './Menu'


class SingleProject extends Component{

    constructor(props){
        super(props);
        this.state = {
            projectTitle:'',
            allUsers:[],
            issue:'',
            isModalOpen:false
        }
    }
    componentWillMount(){
        if(this.props.match.params){
            this.props.projectActions.fetchProjects(); 
            this.props.newUserActions.fetchAllUsers();
            this.props.issueActions.fetchIssues(this.props.match.params.projectId);
        }
    }

    attachDropDownBoxOptions(){
        if(this.props.allUsers){
          var options =   _.map(this.props.allUsers,(user,index)=>({
                key: user._id,
                text: user.username,
                value: user._id
            }))

        this.setState({
            allUsers:options
        })
 
        }
    }

    componentWillReceiveProps(){
        // if(this.state.projectTitle == '')
        //     this.setState({projectTitle:project.title})

    }

    fetchAllUsers(){
        this.props.newUserActions.fetchAllUsers();
        console.log(this.props)
        this.attachDropDownBoxOptions()
    }

    renderSingleProject(){
        if(this.props.projects && this.props.projects.length){
            var project = this.props.projects.filter(project => project._id == this.props.match.params.projectId)
            // console.log(project,this.props.projects)
            project = project.length >= 1 ? project[0] : project
            const date = new Date(project.created);
            return(
                <Card key={project._id} fluid>
                <Card.Content header={project.title}/>
                <Card.Content description={project.description}/>
                <Card.Content extra>
                Created on {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
                </Card.Content>
            </Card> 
            )
        }
    }

    renderProjectIssues(){
        if(this.props.projectIssues){
            var issues = this.props.projectIssues
                return issues.map(issue => {
                    return (
                        <Card
                        key={issue._id} 
                            header={issue.summary}
                            description={issue.description}
                            meta={issue.issueType+" | "+issue.priority}
                            onClick={()=>{
                                    this.setState({
                                        issue:issue,
                                        isModalOpen:true
                                    });
                                    
                                }
                                
                            }
                        />
                    )
                })
            } 
            
        }

    renderIssueModal(issue){
        return(
            <Modal 
            size="tiny" 
            open={this.state.isModalOpen} 
            onClose={()=>this.setState({isModalOpen:false})}
            centered={"false"}
            closeIcon >
            <Modal.Header>{this.state.issue.summary}</Modal.Header>
            <Modal.Content>
                {this.state.issue.description}
            </Modal.Content>
        </Modal> 
        );
        
    }

    render(){
        const projectId = this.props.match.params.projectId
        return(
            <div style={{height:'100vh'}}>
                <SidebarMenu {...this.props}/>
                <div style={{marginLeft:'10em',marginTop:'2em'}}>
                <Header as="h2">{this.state.projectTitle}</Header>
                {this.renderSingleProject()}
                <CreateTickets onOpen={()=>this.fetchAllUsers()} users={this.state.allUsers}/>
                <Card.Group style={{marginTop: "5em",}}>
                    {this.renderProjectIssues()}
                </Card.Group>
                    {this.renderIssueModal()}
                </div>
            </div>
        );
    }
} 

function mapStateToProps(state){
    console.log(state,"ASDAD")
    return{
        projects: state.projects.projects,
        allUsers: state.projectUsers.allUsers,
        projectIssues: state.issues.projectIssues
    }
}

function mapDisptachToProps(dispatch){
    return {
        projectActions: bindActionCreators(projectActions,dispatch),
        newUserActions: bindActionCreators(newUserActions, dispatch),
        issueActions: bindActionCreators(issuesActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(SingleProject)