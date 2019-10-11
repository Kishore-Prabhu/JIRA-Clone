import React from 'react';
import { Grid, Header, Tab } from 'semantic-ui-react'

import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';

const panes = [
    { menuItem: 'Sign In', render: () => <Tab.Pane><SignIn /></Tab.Pane> },
    { menuItem: 'Sign Up', render: () => <Tab.Pane><SignUp /></Tab.Pane> }
]

const Login = () => {
    return (
    <div className='login-form' style={{marginTop:150}}>

        <Grid centered
              verticalAlign='middle' 
              columns={2} 
              style={{ height: '90%' }}
        >
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h1' color='black' textAlign='center'>
                        {' '}Jira-Clone
                    </Header>
                        <Tab panes={panes}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
    )
}

export default Login;