const express = require('express');
const app = express();
const fs = require('fs');
const QPromise = require('q');

// const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
// app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send({ express : 'Hello From Express' });
});




// Done
/**
 * Get all Users
 */
app.get('/api/users', (req, res) => {
  let data = JSON.parse(fs.readFileSync(__dirname + '/data/json/person.json', 'utf8'));
  let users = [];
  data.map((item, idx) => {
    let imageData = fs.readFileSync(__dirname + '/data/images/' + item.image, 'utf8');
    users.push({ ...item, image : imageData });
    if(idx === data.length - 1) {
      res.send(users);
    }
  });

});
/******************************/

// Done
/**
 *  get users count
 */
app.get('/api/users/count', (req, res) => {
  let usersCount = 0;
  fs.readFile(__dirname + '/data/json/person.json', (err, data) => {
    let json = JSON.parse(data);
    usersCount = json.length;
    res.send({ usersCount });
  });

});
/*************/

// Done
/**
 *  Add new User
 */
app.post('/api/users/add', (req, res) => {
  const { image, userId, imageType, userName, userAge, userBio } = req.body;
  // save image file
  fs.appendFile(__dirname + '/data/images/' + userId + '.' + imageType, image, (err) => console.log(err));

  // save in json file
  fs.readFile(__dirname + '/data/json/person.json', (err, data) => {
    let json = JSON.parse(data);
    json.push({
      image : userId + '.' + imageType,
      userId,
      userName,
      userAge,
      userBio
    });
    fs.writeFile(__dirname + '/data/json/person.json', JSON.stringify(json));
    res.send('User has been added successfully');
  });
});
/******************/


app.listen(8080);