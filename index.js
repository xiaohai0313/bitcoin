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
    

    var base_url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var finalURL = base_url + Digital + Real;

    request(finalURL,function(error,response,body){
        var data = JSON.parse(body);
        var price = data.last;

        

        res.write("The Current Price for " + Digital + " to " + Real + " is : " + price);
        res.send();
    })
})

app.listen(3000,function(){
    console.log("Server is listen");
})

