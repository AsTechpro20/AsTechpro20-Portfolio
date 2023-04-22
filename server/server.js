const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
  res.redirect('https://www.astechpro20.tk/');
});

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define a POST route for form submission
app.post('/submit-form', (req, res) => {
  const { name, email, subject, body } = req.body;

  // Create a nodemailer transporter object
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 465, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });
  

  // Define the email message
  const mailOptions = {
    from: email,
    to: 'contact@astechpro20.tk',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\n${body}`
  };

  // Send the email message
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});