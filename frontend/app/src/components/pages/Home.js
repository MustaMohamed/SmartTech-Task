import React, { Component } from 'react';

// style
import '../../css/style.css';

//semantic
import { Container, Image, Card, Confirm, Dimmer, Segment, Loader } from 'semantic-ui-react';

// Slider
import KeshanCarousel from 'react-keshan-carousel';
import "react-keshan-carousel/lib/keshan-carousel.css";

// request factory
import axios from 'axios';

// components
import CardItem from "../CardItem";
import URLs from "../../utils/consts";


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      personsList : [],
      serverError : false,
      serverErrorMessage : 'Try again letter!',
      loading : true
    };
    this.getPersonsList = this.getPersonsList.bind(this);
    this.closePortal = this.closePortal.bind(this);
  }

  componentDidMount () {


    axios.get(URLs.GET_ALL_USERS)
      .then((res) => res.data)
      .then((personsList) => {
        setTimeout(() => this.setState({ personsList, loading : false }), 1000);
      })
      .catch((err) => this.setState({ serverError : true, serverErrorMessage : err }));
  }

  getPersonsList () {
    const { personsList } = this.state;
    let returnedList = [];
    personsList.map((item, idx) =>
      returnedList.push(
        <div key={ idx }>
          <CardItem { ...item } />
        </div>)
    );
    return returnedList;
  }

  closePortal () {
    this.setState({ serverError : false });
  }


  render () {
    const personsList = this.getPersonsList();
    const responsive = {
      758 : { items : 1 },
      1180 : { items : 3 },
    };

    return (
      <Container>

        <Confirm
          header={ 'Error in server side!' }
          content={ this.state.serverErrorMessage }
          open={ this.state.serverError }
          onCancel={ this.closePortal }
          onConfirm={ this.closePortal }/>


        <Dimmer.Dimmable dimmed={ this.state.loading }>
          <Dimmer active={ this.state.loading } inverted>
            <Loader>Loading</Loader>
          </Dimmer>

          <KeshanCarousel
            items={ personsList }
            duration={ 800 }
            responsive={ responsive }/>

        </Dimmer.Dimmable>
      </Container>
    );
  }
}

export default App;
