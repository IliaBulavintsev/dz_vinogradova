const express = require('express');
const app = express();
var router = express.Router();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var workers = require('./workers');
var rangs = require('./rangs');
var worker_rangs = require('./worker_rangs');


['/'].forEach((path) => { app.use(path, express.static('public')); });
app.use(express.static('public'));


app.use('/workers', workers);
app.use('/rangs', rangs);
app.use('/worker_rangs', worker_rangs);
// app.get('/workers', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(process.env.PORT || 3000, () => {
    console.log(`App started on port ${process.env.PORT || 3000}`);
});
