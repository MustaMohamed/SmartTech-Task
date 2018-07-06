import React, { Component } from 'react';

// style
import '../css/style.css';

//semantic
import { Container, Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeRoute : 'home'
    };
    this.handleRoutes = this.handleRoutes.bind(this);
  }

  handleRoutes (e, { name }) {
    this.setState({ activeRoute : name });
  }

  render () {
    const { activeRoute } = this.state;
    return (
      <div className={'nav-bar'}>
        <Menu secondary pointing>
          <Container>
            <Menu.Item
              className={ 'navbar-item' }
              name='home'
              link
              active={ activeRoute === 'home' }
              onClick={ this.handleRoutes }>
              <Link to={ '/' }><h3>Home</h3></Link>
            </Menu.Item>
            <Menu.Item
              className={ 'navbar-item' }
              name='admin'
              active={ activeRoute === 'admin' }
              onClick={ this.handleRoutes }>
              <Link to={ '/admin' }><h3>Admin</h3></Link>
            </Menu.Item>
          </Container>
        </Menu>

      </div>
    );
  }
}

export default App;
