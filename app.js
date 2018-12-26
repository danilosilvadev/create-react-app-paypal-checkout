const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
const app = express();

// config folder
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AZ1yeX94XfiVko9t5mwMtOxl7xZDqph81t4-ZeUsIyCu6KwdU0WawBwifmRWJCkczJwjomV5BNdgSzmf',
  'client_secret': 'EE2E_7kYXST4a8Fj8K8NJh447cBA_QT3xibEUKZgYKNGZWvXGGNsZ2t5zPEwHP961RVYm8KfMuu_6CSo'
});

app.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Hat for the best team ever"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
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
