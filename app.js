const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
const app = express();
const create_payment_json = require('./model/paymentSchema');
const keys = require('./config/keys');

// config folder
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': `${keys.CLIENT_ID}`,
  'client_secret': `${keys.CLIENT_SECRET}`
});

app.post('/pay', (req, res) => {
paypal.payment.create(create_payment_json.payment, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

app.get('/success', (req, res) => {
  console.log('charles')
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "25.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
  });
});

app.get('/cancel', (req, res) => res.send('Cancelled'));

app.set('views', __dirname + '/view/src');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/', (req, res) => res.render('index'));
app.listen(5000, () => console.log('Server Started'));
