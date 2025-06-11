const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port =8080;
const { start } = require("repl");
const { stringify } = require('querystring');
const MongoClient = require('mongodb').MongoClient;

const bodyparser = require('body-parser');
const app = express();
app.use(express.static(path.join(__dirname , 'public')));
app.use(express.urlencoded());
app.use(bodyparser.urlencoded({extended:false}));



const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<body><div id="myElement">Hello</div></body>`);
const document = dom.window.document;

console.log(document.getElementById("myElement").textContent); // Hello
// -----------------------------------------------------------------------------------------------------

app.use(express.static('public'));
app.set('view engine', 'ejs');


// app.get('/', (req, res) => {
//   res.render('index', { message: 'Hello from Express!' });
// });
// mongo suff---------------------------------------------------------------------------------------------------------

con =async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/carbtrade');
    console.log("mongo connecetd");
}
con()

const Schema= mongoose.Schema;
const dataschema= new Schema({
   
    phone : Number,
    phone2 : Number,
  
});
const Data = mongoose.model('Data', dataschema);
// const db= mongoose.connection;
// const Contactschema = new mongoose.Schema({
//     name: String,
//     phone: Number,
//     email: String,
//     // address: String,
//     text: String,
// });
// const Contact = mongoose.model('Contact', Contactschema);

// --------------------------------------------------------------------------------------------------------------------------
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/buy.html'));
})

app.post('/', (req , res)=>{
    const {PRICE, DISTANCE}= req.body;
    const newdata = new Data({
      
        PRICE , 
        DISTANCE , 
       
    });
    newdata.save();
    var price_order =req.body.PRICE;
    var dist =req.body.DISTANCE;
    var  Carbon_OffsetPrice_Plane = 1800;//rupees
    var Carbon_Offsetprice_Truck = 1800;//rupees
    var carbon_plane = 31.1; //emission KG/KM
    var carbon_truck = 0.76;//emission KG/KM
    var totaltime_hours;
    var Plane_fuel = 11463.96; //rupees
    var Plane_speed =915;
    var Truck_fuel =30.4;//rupees
    var Truck_speed = 65.0; //KM/h
    var revenue_customer;
    var revenue_Carbtrade;
    totaltime_hours =Math.round(dist/Truck_speed);
    total_days = Math.round(totaltime_hours *60.0)/1440 ;
    carbon_truck=carbon_truck*dist;
    carbon_plane =carbon_plane*dist;
    Carbon_OffsetPrice_Plane =(carbon_plane*Carbon_OffsetPrice_Plane)/1000;
    Carbon_Offsetprice_Truck =(carbon_truck*Carbon_Offsetprice_Truck)/1000;
    var revenue  = Carbon_OffsetPrice_Plane -Carbon_Offsetprice_Truck;
    if (price_order<1000){
        revenue_customer =price_order*0.15;
       }
       else if(price_order>1000&&price_order<2500){
        revenue_customer =price_order*0.08;
       }
       else{
        revenue_customer =price_order*0.03;
       }
       var discount=(revenue_customer/price_order)*100;
       revenue_Carbtrade=(revenue-revenue_customer)*0.05;
       var final_revenue = revenue -(revenue_customer+revenue_Carbtrade);

    
    // document.getElementById("demo").innerHTML=Item_price;
    res.render('index', { price :PRICE, dist:DISTANCE,
        timeHR:totaltime_hours,CARB_TRUCK:carbon_truck,CARB_PLANE:carbon_plane,
        CARB_Pprice:Carbon_OffsetPrice_Plane,CARB_Tprice:Carbon_Offsetprice_Truck,
        Days:total_days,
        Customer:revenue_customer,Carb:revenue_Carbtrade,
        Comp:final_revenue,
        discount :discount,



    });

    // res.sendFile(path.join(__dirname, '/public/main.html'));
})


app.listen(port, ()=>{
    console.log("server is started");
})
