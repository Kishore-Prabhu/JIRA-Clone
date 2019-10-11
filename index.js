const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cors = require('cors');
const middlewares = require('./middleware');
const webpush = require('web-push')

require('./models/User');
require('./models/Project');
require('./models/Issue');

mongoose.connect(keys.mongoURI, (err) => {
	if(err) throw err
	else console.log("Successfully connected to MongoDB");
});

//Routes
const common = require('./routes/common');
const auth = require('./routes/authRoute');
const admin = require('./routes/adminRoute');
const issue = require('./routes/issueRoute');

const app = express();
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

middlewares(app);

app.use('/api', common);
app.use('/api/auth', auth);
app.use('/api/admin', admin);
app.use('/api/issue', issue);
const publicVapidKey =
  "BNxoyKbT9Czi5Ck0r8P5YkbD9skcPwMl8Q2r8330aj8P6PK154p87_0iUlRHtYQPrVQ1uuMBL6zjMksabwZm1s4";
const privateVapidKey = "_VsPjo3SWdICyjnpNIrxAjZv7Y1sRlczNdTs-dheTeY";

webpush.setVapidDetails(
  "mailto:kishoreprabhu@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// Endpoint to store serviceworker subscripton 
app.post("/subscribe",(req,res) => {
	// Get pushSubscription object
	const subscription = req.body;
  
	// Send 201 - resource created
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ data: { success: true } }));
  
	// Create payload
	const payload = JSON.stringify({ title: "JIRA-Clone" });
  
	// Pass object into sendNotification
	webpush
	  .sendNotification(subscription, payload).then(res => console.log(res))
	  .catch(err => console.error(err));
})

const PORT = process.env.PORT || 8080;
app.listen(PORT);

module.exports = app;
