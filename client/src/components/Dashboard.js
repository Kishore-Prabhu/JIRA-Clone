import React, { Component } from 'react';
import { Header, Card, Grid, List, Transition , Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as dashboardActions from '../actions/dashboard';
import * as authActions from '../actions/auth';
import { bindActionCreators } from 'redux';
import SidebarMenu from './Menu';
import CreateProject from './CreateProject'
import CreateTickets from './CreateTickets';
import CreateUser from './CreateUser';

const cardStyle = {
    height: '300px',
    margin: '10px'
}

class Dashboard extends Component {
    state = { visible: false };

    componentWillMount() {
        this.props.dashboardActions.fetchUser();
        this.props.dashboardActions.fetchProjects();
        this.props.dashboardActions.fetchAllUsers();
        this.props.dashboardActions.fetchIssues();
    }

    componentDidMount() {
        setTimeout(() => this.setState({ visible: true }), 300);
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

    renderProjects() {
        if (this.props.projects && this.props.projects.length) {
            return this.props.projects.map((project, index) => {
                const date = new Date(project.created);
                if (index === 6) return;
                return (
                    <List.Item key={project._id}>
                        <List.Icon name='check' size='large' verticalAlign='middle' />
                        <List.Content>
                            {/* <Link to={`singleProject/${project._id}`}> */}
                            <Link to={`project/${project._id}`}>
                                <List.Header>{project.title}</List.Header>
                            </Link>
                            <List.Description>Created on {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</List.Description>
                        </List.Content>
                    </List.Item>
                )
            })
        }
        // return <Button primary>Create New Project</Button>;
        return this.conditionallyRender(<CreateProject/>);
    }

    renderAllUsers() {
        if (this.props.allUsers) {
            return this.props.allUsers.map(user =>
                <List.Item key={user._id}>
                    <List.Icon name='check' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header>{user.name}</List.Header>
                        <List.Description>{user._id}</List.Description>
                    </List.Content>
                </List.Item>)
        }

        // return this.conditionallyRender(<Button primary >Create New User</Button>);
        return this.conditionallyRender(<CreateUser/>);
        
    }

    renderAllIssues() {
        if (this.props.allIssues && this.props.allIssues.length) {
            return this.props.allIssues.map(issue =>
                <List.Item key={issue._id}>
                    <List.Icon name='check' size='large' verticalAlign='middle' />
                    <List.Content>
                       <List.Header>{issue.summary}</List.Header>
                        <List.Description as='a'>{issue.description}</List.Description>
                    </List.Content>
                </List.Item>
            )
        }
        return <div>
            <Header as='h3'>You currently do not have any issues assigned to you.</Header>
            {this.conditionallyRender(<CreateTickets/>)}
        </div>
    }

    render() {
        const { user } = this.props;
        if (!this.props.user) {
            return <div>Loading</div>
        }

        return (
            <div style={{ height: '100vh' }}>
                <SidebarMenu {...this.props}/>
                <Grid columns={3} style={{ marginLeft: '12em' }}>
                    <Grid.Row>
                        <Transition visible={this.state.visible} animation='scale' duration={500}>
                            <Card style={cardStyle}>
                                <Card.Content>
                                    <Card.Header><Header as='h1'>Welcome back, {user.name}</Header></Card.Header>
                                    <Card.Meta>Issues/Tasks</Card.Meta>
                                    <Card.Description>Tasks Assigned to you:</Card.Description>
                                    <List divided relaxed style={{ overflowY: 'scroll', height: '150px' }}>
                                        {this.renderAllIssues()}
                                    </List>
                                </Card.Content>
                            </Card>
                        </Transition>
                        <Transition visible={this.state.visible} animation='scale' duration={500}>
                            <Card style={cardStyle}>
                                <Card.Content>
                                    <Card.Header><Header as='h1'>Your Projects</Header></Card.Header>
                                    <Card.Meta>Projects</Card.Meta>
                                    <Card.Description>List of Projects Under Development</Card.Description>
                                    <List divided relaxed style={{ overflowY: 'scroll', height: '150px' }}>
                                        {this.renderProjects()}
                                    </List>
                                </Card.Content>
                            </Card>
                        </Transition>
                        { this.props.user && this.props.user.isAdmin && <Transition visible={this.state.visible} transitionOnMount={true} animation='scale' duration={500}>
                            <Card style={cardStyle}>
                                <Card.Content>
                                    <Card.Header><Header as='h1'>All Users</Header></Card.Header>
                                    <Card.Meta>Users that are affiliated to you and the projects you have created.</Card.Meta>
                                    <Card.Description>List of Users</Card.Description>
                                    <List divided relaxed style={{ overflowY: 'scroll', height: '150px' }}>
                                        {this.renderAllUsers()}
                                    </List>
                                </Card.Content>
                            </Card>
                        </Transition>}
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.dashboard.user,
        projects: state.dashboard.projects,
        allUsers: state.dashboard.allUsers,
        allIssues: state.dashboard.issues
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
