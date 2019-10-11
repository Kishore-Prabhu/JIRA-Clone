import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Segment,
} from 'semantic-ui-react'



export default class Home extends Component {
  

  render() {
    
    return (
      <div>
        
          <Segment
            inverted
            textAlign='center'
            style={{ height: '100vh', padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Link to="/">
                <Menu.Item active>Home</Menu.Item>
                </Link>
                <Menu.Item position='right'>
                  <Link to="/signIn"><Button inverted>Sign In</Button></Link>
                  <Link to="/signIn"><Button inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button></Link>
                </Menu.Item>
              </Menu>
            </Container>

            <Container text>
              <Header
                as='h1'
                content='Jira-Clone'
                inverted
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '4em' }}
              />
              <Header
                as='h4'
                content='Issue tracking System '
                inverted
                style={{ fontSize: '1.3em', fontWeight: 'normal', marginTop: 0, marginBottom: 20 }}
              />
            </Container>
          </Segment>
       
      </div>
    )
  }
}