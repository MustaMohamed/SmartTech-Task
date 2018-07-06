import React from 'react';
import '../../css/style.css';
import { Image, Container, Input, Button, TextArea, Form, Message } from 'semantic-ui-react';

import PropsTypes from 'prop-types';

import axios from "axios/index";

import validations from '../../utils/validation.services';
import URLs from '../../utils/consts';

class CardItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      buttonLoad : false,
      error : false,
      buttonAble : true,
      errorMessages : {},
      user : {}
    };
    this.upFile = React.createRef();
    this.img = React.createRef();
    this.fileUpLoad = this.fileUpLoad.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._validate = this._validate.bind(this);
  }

  static get propTypes () {
    return {};
  }

  componentWillReceiveProps (next) {
  }

  componentDidUpdate () {
  }

  handleFileUpload (e) {
    let user = Object.assign({}, { ...this.state.user, userImage : e.target.files[0] });
    this.setState({ user, buttonAble : true });

  }

  handleTextChange (e, data) {
    let inputName = data.name, inputValue = data.value;
    let user = Object.assign({}, { ...this.state.user, [inputName] : inputValue });
    this.setState({ user, buttonAble : true });
  }

  fileUpLoad () {

    const { user } = this.state;
    let myFile = this.state.user.userImage;

    axios.get(URLs.GET_USERS_COUNT)
      .then(res => res.data)
      .then(data => {return data.usersCount;})
      .then((newUserId) => {
        console.log(newUserId);
        let reader = new FileReader();
        reader.onloadend = () => {
          axios.post(URLs.POST_NEW_USER, {
            userId : newUserId,
            image : reader.result,
            imageType : myFile.type.replace('image/', ''),
            userName : user.userName,
            userAge : user.userAge,
            userBio : user.userBio
          })
            .then(res => res.data)
            .then(data => {
              console.log(data);
            })
            .catch(err => console.log(err));
        };
        reader.readAsDataURL(myFile);
      })
      .catch(err => console.log(err));


  }

  handleSubmit () {
    this.setState({ buttonLoad : true, buttonAble : false });
    if (this._validate()) {
      this.fileUpLoad();
    }
    this.setState({ buttonLoad : false });
  }

  _validate () {
    const error = validations.UserValidation(this.state.user);
    if (error.error === undefined) {
      this.setState({ error : false, errorMessages : {} });
      return true;
    }
    this.setState({ error : true, errorMessages : error });
    return false;
  }


  render () {
    const { error, errorMessages, buttonLoad, buttonAble } = this.state;
    return (
      <Container>
        <Form>
          <Form.Group>
            <Form.Field width={ 10 } required>
              <label>Full Name</label>
              <Input
                placeholder={ 'Enter your name...' }
                name={ 'userName' }
                disabled={ buttonLoad }
                error={ error && errorMessages.userNameMessage }
                onChange={ this.handleTextChange }
              />
              <Message
                negative
                header={ errorMessages.userNameMessage || 'This field is required!' }
                hidden={ !( error && errorMessages.userNameMessage ) }
              />
            </Form.Field>
            <Form.Field width={ 6 } required>
              <label>Age</label>
              <Input
                placeholder={ 'Enter your age...' }
                name={ 'userAge' }
                disabled={ buttonLoad }
                error={ error && errorMessages.userAgeMessage }
                onChange={ this.handleTextChange }/>
              <Message
                negative
                header={ errorMessages.userAgeMessage || 'This field is required!' }
                hidden={ !( error && errorMessages.userAgeMessage ) }
              />
            </Form.Field>
          </Form.Group>
          <Form.Field width={ 16 } required>
            <label>Bio</label>
            <TextArea
              name={ 'userBio' }
              placeholder='Tell us more'
              disabled={ buttonLoad }
              onChange={ this.handleTextChange }/>
          </Form.Field>
          <Form.Field width={ 6 } required>
            <label>Profile Image</label>
            <Input
              disabled={ buttonLoad }
              error={ error && errorMessages.userImageMessage }
              type={ 'file' }
              ref={ this.upFile }
              onChange={ this.handleFileUpload }/>
            <Message
              negative
              header={ errorMessages.userImageMessage || 'This field is required!' }
              hidden={ !( error && errorMessages.userImageMessage ) }
            />
          </Form.Field>
          <Button
            size={ 'big' }
            disabled={ !buttonAble && error && buttonLoad } loading={ buttonLoad } primary
            onClick={ this.handleSubmit }>Upload</Button>
        </Form>
      </Container>
    );
  }
}

export default CardItem;