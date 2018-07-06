import React from 'react';
import '../css/style.css';
import { Card, Image } from 'semantic-ui-react';
import PropsTypes from 'prop-types';


class CardItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  static get propTypes () {
    return {
      image : PropsTypes.string,
      userName : PropsTypes.string,
      userBio : PropsTypes.string,
      userAge : PropsTypes.string
    };
  }

  componentWillReceiveProps (next) {
  }

  componentDidUpdate () {
  }

  render () {
    return (
        <Card className={ 'slideElement' }>
          <Image src={ this.props.image}/>
          <Card.Content extra>
            <Card.Header>{ this.props.userName}</Card.Header>
            <Card.Description>{ this.props.userBio}</Card.Description>
            <Card.Description>{ this.props.userAge}</Card.Description>
          </Card.Content>
        </Card>
   );
  }
}

export default CardItem;