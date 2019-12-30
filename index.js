const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    
    Digital = req.body.Digital;
    Real = req.body.Real;
    amount = req.body.amount;

    var base_url = "https://apiv2.bitcoinaverage.com/convert/global?from=";
    var finalURL = base_url + Digital + "&to=" + Real +"&amount" + amount;
    
    request(finalURL,function(error,response,body){
        var data = JSON.parse(body);
        var price = data.price;

        var currenttime = data.time;
        res.write("<p>The current date is " + currenttime + "</p>");
        res.write("The Current Price for " + Digital + " to " + Real + " is : " + price);
        res.send();
    })
})

app.listen(3000,function(){
    console.log("Server is listen");
})

