var express = require('express');
var router = express.Router();
var Web3 = require('web3')
var Tx = require('@ethereumjs/tx').Transaction;
const web3 = new Web3('http://localhost:8545');


const Private_Key  =  'e2770ed49b7859a0391b25b57750e264f31d05e09d68a40250d17d4e765b1ea7';
const from_address  =  '0x7323970fe8d4c0F2DD897FF0CA8dAbF5122c26E5';
const to_address  =  '0x95953992c361e1B2Fe3fCAAeb97Bb600365b9b15';
const ethAmount = '1000000000000000';


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
    'value': 1000000000000000000, // 1 ETH
    'gas': 30000,
    'nonce': nonce,
    //'data': {wattage: 10, volts: 110} // optional data field to send message or execute smart contract
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
