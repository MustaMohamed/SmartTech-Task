const validations = {
  UserValidation : (user) => {
    let errorObj = {};
    // user name
    if (user.userName === '' || user.userName === null || user.userName === undefined)
      errorObj = { ...errorObj, error : true, userNameMessage : 'This field is required..!' };
    else if (!( /^[0-9a-zA-Z\\_]+$/g.test(user.userName) ))
      errorObj = { ...errorObj, error : true, userNameMessage : 'This field can\'t contains special characters..!' };
    else if (user.userName.length > 20)
      errorObj = { ...errorObj, error : true, userNameMessage : 'This field can\'t be more than 20 ..!' };

    // user age
    if (user.userAge === '' || user.userAge === null || user.userAge === undefined)
      errorObj = { ...errorObj, error : true, userAgeMessage : 'This field is required..!' };
    else if (!( /^[0-9]/.test(user.userAge) ))
      errorObj = { ...errorObj, error : true, userAgeMessage : 'This field can\'t contains characters..!' };
    else if (user.userAge > 120)
      errorObj = { ...errorObj, error : true, userAgeMessage : 'Enter a valid age ..!' };


    // user image
    if (user.userImage === '' || user.userImage === null || user.userImage === undefined)
      errorObj = { ...errorObj, error : true, userImageMessage : 'This field is required..!' };
    else if (user.userImage.type.match('image.*') == null)
      errorObj = { ...errorObj, error : true, userImageMessage : 'Enter a valid image ..!' };

    return errorObj;
  },
};
export default validations;