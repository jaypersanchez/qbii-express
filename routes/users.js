var express = require('express');
var router = express.Router();
require('dotenv').config();
var Web3 = require('web3')
var Tx = require('@ethereumjs/tx').Transaction;
const web3 = new Web3(process.env.PROVIDER);


const Private_Key  =  process.env.PRIVATE_KEY;
const from_address  =  process.env.FROM_ADDRESS;
const to_address  =  process.env.TO_ADDRESS;
const ethAmount = process.env.ETH_AMOUNT;
const gas = process.env.GAS


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/on', function(req, res) {
  payForWattage()
  .then(receipt => {
    res.send(JSON.stringify(receipt))
  })
  
})

const payForWattage = async() => {
  const nonce = await web3.eth.getTransactionCount(from_address, 'latest');
  const transaction = {
    'to': to_address, // faucet address to return eth
    'value': ethAmount,
    'gas': gas,
    'nonce': nonce,
    'data': ""
   };
   const signedTx = await web3.eth.accounts.signTransaction(transaction, Private_Key);
   web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log(`Transaction Hash ${JSON.stringify(hash)}`);
    } else {
      console.log(`Send Failed ${error}`)
    }
   });

}

module.exports = router;
