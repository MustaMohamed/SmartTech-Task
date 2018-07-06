import React, { Component } from 'react';

// style
import './css/style.css';

//semantic
import { Container, Menu } from 'semantic-ui-react';

// routes
import router from './utils/routes';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// components
import Layout from "./components/Layout";


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeRoute : ''
    };
    this.handleRoutes = this.handleRoutes.bind(this);
  }

  handleRoutes (e, { name }) {
    this.setState({ activeRoute : name });
  }

  render () {
    const { activeRoute } = this.state;
    console.log(activeRoute);
    return (
      <Container fluid>
        <Router>
          <div>
            <Layout />
              { router }
          </div>
        </Router>
      </Container>
    );
  }
}

export default App;
