import React, { Component } from 'react';
import {Header,Card} from 'semantic-ui-react'
import CreateUser from './CreateUser';
import * as newUserActions from '../actions/users';
import * as dashboardActions from '../actions/dashboard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SidebarMenu from './Menu';

class Users extends Component{

    componentWillMount(){
        this.props.newUserActions.fetchAllUsers();
        console.log(this.props)
    }
 
    conditionallyRender(element) {
        console.log(this.props.user)
        if (this.props.user) {
            return (
                <div style={{ display: this.props.user.isAdmin ? 'block' : 'none' }}>
                    {element}
                </div>
            )
        }
    }

    renderAllUsers() {
        if (this.props.allUsers) {
            return this.props.allUsers.map(user =>{
                return(
                    <Card key={user._id}>
                    <Card.Content>
                        <Card.Header>{user.name}</Card.Header>
                        {/* <Card.Meta>Co-Worker</Card.Meta> */}
                        <Card.Description>
                            {user.isAdmin ? "Manager" : "Developer"}
                        </Card.Description>
                    </Card.Content>
                </Card>
                )
            })
        }
    }

    conditionallyRender(element) {
        console.log(this.props)
        if (this.props.user) {
            return (
                <div style={{ display: this.props.user.isAdmin ? 'block' : 'none' }}>
                    {element}
                </div>
            )
        }
    }

    render(){
        return(
            <div style={{height:'100vh'}}>
                <SidebarMenu {...this.props}/>
                <div style={{marginLeft:'10em',marginTop:'2em'}}>
                    <Header as="h2">Users</Header>
                     {this.conditionallyRender(<CreateUser/>)}
                    <Header as="h4">Users Affiliated to current Project</Header>
                    <Card.Group>
                        {this.renderAllUsers()}
                    </Card.Group>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        allUsers: state.projectUsers.allUsers,
        user: state.dashboard.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        newUserActions: bindActionCreators(newUserActions, dispatch),
        dashboardActions: bindActionCreators(dashboardActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
