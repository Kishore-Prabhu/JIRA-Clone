import React, { Component } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';

class SidebarMenu extends Component {
    render() {
        return (
            <Sidebar as={Menu} inverted animation='overlay' visible={true} icon='labeled' vertical>
                <Link to="/" onClick={()=>console.log("HOME")}>
                    <Menu.Item name='home'>
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                </Link>
               {this.props.user && this.props.user.isAdmin && <Link to="/project" onClick={console.log("Tasks")}>
                    <Menu.Item name='tasks'>
                        <Icon name='tasks' />
                        Projects
                    </Menu.Item>
                </Link>}
               {this.props.user && this.props.user.isAdmin && <Link to="/users" onClick={console.log("Users")}>
                    <Menu.Item name='user'>
                        <Icon name='user' />
                        Users
                    </Menu.Item>
                </Link>}
                <Link to="/" onClick={this.props.signOut}>
                    <Menu.Item name='log out'>
                        <Icon name='log out' />
                        Logout
                    </Menu.Item>
                </Link>
            </Sidebar>
        )
    }
}

export default connect(null, actions)(SidebarMenu);