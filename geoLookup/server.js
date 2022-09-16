const express = require('express');
const app = express();
const openGeocoder = require('node-open-geocoder');
const helmet = require('helmet');
const whois = require("whoiser");
const geoip = require('geoip-lite');

app.use(helmet());
app.use(express.json());

app.get('/favicon.ico', (req,res) => res.sendStatus(200));
app.use(async (req,res) => {
  var iploc;
  try {
    iploc = await whois(req.path.slice(1))
  }catch(e){}
  try {
    var data = geoip.lookup(req.path.slice(1) || '1.1.1.1');
    if(data) {
    return  openGeocoder().reverse(data?.ll[1], data?.ll[0])
    .end((err, r) => {
    return res.send({ ...data, whois: iploc, location: r })
    }) 
    }
    res.send({ ...data, whois: iploc })
  }catch(e) {}
})

app.listen(3000)
