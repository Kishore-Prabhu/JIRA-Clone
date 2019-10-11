import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import requireAuth from './Auth/requireAuth';
import { connect } from 'react-redux';


import 'semantic-ui-css/semantic.min.css';

import Dashboard from './Dashboard';
import Login from './Login';
import Home from './Home';
import Projects from './Projects';
import SingleProject from './SingleProject';
import Users from './Users';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" render={() => (
                        this.props.authenticated ? (<Dashboard/>) : (<Home/>)
                    )} />
                    <Route exact path="/signIn" component={Login} />
                    <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
                    <Route path="/project" component={requireAuth(projects)} />
                    <Route exact path="/users" component={requireAuth(Users)} />
                </div>
            </BrowserRouter>
        )
    }
}

function projects(){
    // let match = useRouteMatch("/projects/:projectId");
    return(
        <Switch>
            <Route path={"/project/:projectId"} render={({match}) => (
                <SingleProject match={match} props={match}/>
            )}/>
            <Route path={"/project"} component={Projects}/>
        </Switch>
    );
}
function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(App);