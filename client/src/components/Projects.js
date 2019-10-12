import React, { Component } from 'react';
import {Header, Card} from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as projectActions from '../actions/projects';
import * as dashboardActions from '../actions/dashboard';
import { bindActionCreators } from 'redux';
import CreateProject from './CreateProject';
import SidebarMenu from './Menu';

class Projects extends Component{
    constructor(props){
        super(props);
       
    }

    componentWillMount(){
        // console.log("PROPS",this.props)
        this.props.projectActions.fetchProjects();
        // this.props.projectActions.createNewProject();
    }
    conditionallyRender(element) {
        if (this.props.user) {
            return (
                <div style={{ display: this.props.user.isAdmin ? 'block' : 'none' }}>
                    {element}
                </div>
            )
        }
    }

    renderAllProjects() {
        if (this.props.projects && this.props.projects.length) {
            return this.props.projects.map((project, index) => {
                const date = new Date(project.created);
                return (
                    <Card key={project._id}>
                        {/* <Link to={`/project/${project._id}`}> */}
                            <Card.Content header={project.title} as="a" href={`/project/${project._id}`}/>
                        {/* </Link> */}
                            <Card.Content description={project.description}/>
                            <Card.Content extra>
                            Created on {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
                            </Card.Content>
                        </Card> 
                )
            })
        }
    }

    render(){
        return(
            <div style={{height:'100vh'}}>
                <SidebarMenu />
                <div style={{marginLeft:'10em',marginTop:'2em'}}>
                    <Header as="h2">Projects</Header>
                    {this.conditionallyRender(<CreateProject/>)}
                    
                    <Card.Group style={{marginTop:'2em'}}>
                        {this.renderAllProjects()}
                    </Card.Group>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        projects: state.projects.projects,
        user: state.dashboard.user,
    }
}

function mapDisptachToProps(dispatch){
    return {
        projectActions: bindActionCreators(projectActions,dispatch),
        dashboardActions: bindActionCreators(dashboardActions, dispatch),
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(Projects)