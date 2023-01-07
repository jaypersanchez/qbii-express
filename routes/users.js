var express = require('express');
var router = express.Router();
var Web3 = require('web3')
const web3 = new Web3('http://localhost:8545');


const Private_Key  =  'e2770ed49b7859a0391b25b57750e264f31d05e09d68a40250d17d4e765b1ea7';
const from_address  =  '0x7323970fe8d4c0F2DD897FF0CA8dAbF5122c26E5';
const to_address  =  '0x95953992c361e1B2Fe3fCAAeb97Bb600365b9b15';

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
  console.log(`POST`)
  var SignTransaction = await web3.eth.accounts.signTransaction({
    to:  to_address,
    value: web3.utils.toWei('1'),
    gas: 2000000
  },  Private_Key  );
  web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then((receipt) => {
    console.log(receipt)
    return receipt;
  });
}

module.exports = router;
