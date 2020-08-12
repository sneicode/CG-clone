var urlEx = "https://api.coingecko.com/api/v3/exchanges?per_page=100"

var coinsTap = $('#coinsTap');
var coinsTable = $('#coinTable');

var exTable = $('#exchangesTable');
var exTap = $('#exTap');



function showCoins(){

if(coinsTable.hasClass("hidden")){
    
    coinsTable.removeClass("hidden")
    coinsTap.addClass("active")

    exTable.addClass("hidden")
    exTap.removeClass("active")      

  }

}

function showEx(){
 
  if(exTable.hasClass("hidden")){
      
      exTable.removeClass("hidden")
      exTap.addClass("active")      

      coinsTable.addClass("hidden")
      coinsTap.removeClass("active")         

  }

}

//List of exchanges

getEx();

async function getEx() {
  var response = await fetch(urlEx)
  var data = await response.json()
  myExchange(data);
}

async function getExchangeRank() {

  var checkBox = document.getElementById("exchange").checked;
  //Fetching API Exchange
  var response = await fetch(urlEx)
  var data = await response.json()

  //Si el checkbox no esta checked se revierte el array
  if (checkBox == false) {
    //checkbox pasa a checked true
    document.getElementById("exchange").checked = true;
    data.reverse()
  } else {
    //Si no, se pasa el checkbox a false y se trabaja con la misma data
    document.getElementById("exchange").checked = false;
  }
  myExchange(data)
}

//Cambia el orden en base al Precio, dependiendo del checkbox
async function getExVol() {

  var checkBox = document.getElementById("volume").checked;
  //Fetching API
  var response = await fetch(urlEx)
  var data = await response.json()

  //Si el checkbox es false, se ordena por negativos primero
  if (checkBox == false) {
    document.getElementById("volume").checked = true;
    data.sort(function (a, b) {
      return b.trade_volume_24h_btc - a.trade_volume_24h_btc;
    });

  } else {
    //Si el checkbox es true, se ordena por positivos primero
    document.getElementById("volume").checked = false;
    data.sort(function (a, b) {
      return a.trade_volume_24h_btc - b.trade_volume_24h_btc;
    });
  }
  myExchange(data)
}

function myExchange(data){
/* parameters to be shown: 
{"id":"binance",
"name":"Binance",
"year_established":2017,
"country":"Cayman Islands",
"description":"",
"url":"https://www.binance.com/",
"image":"https://assets.coingecko.com/markets/images/52/small/binance.jpg?1519353250",
"has_trading_incentive":false,
"trust_score":10,
"trust_score_rank":1,
"trade_volume_24h_btc":369232.7557897228,
"trade_volume_24h_btc_normalized":261092.56088084955}, */

  document.getElementById('myXtable').innerHTML = '';
  //Checkbox de Exchange Rank (not available in API!!! ¿how to get this?)
  var eTrustRank = document.getElementById('exchange');
  // Checkbox de trust_score
  var eTrust = document.getElementById('trust');
  // Checkbox de trade_volume_24h_btc
  var eVolume = document.getElementById('volume');
  //Icon de Exchange Rank
  var exchangeTrustRank = (eTrustRank.checked == true) ? '<span class="myblue"><i class="fas fa-angle-up"></i></span>' : '<span class="myblue"><i class="fas fa-angle-down"></i></span>'
  //Icon de Exchange Trust
  var exchangeTrust = (eTrust.checked == true) ? '<span class="myblue"><i class="fas fa-angle-up"></i></span>' : '<span class="myblue"><i class="fas fa-angle-down"></i></span>'
  //Icon de Exchange Volume
  var exchangeVolume = (eVolume.checked == true) ? '<span class="myblue"><i class="fas fa-angle-up"></i></span>' : '<span class="myblue"><i class="fas fa-angle-down"></i></span>'
  
  var eHeaders =`
  <tr>
    <td style="cursor: pointer;" onclick="getExchangeRank()"><b>Rank  `+ exchangeTrustRank + `</b></td>
    <td><b>Symbol</b></td>
    <td><b>Name</b></td>
    <td style="cursor: pointer;" onclick="getExchangeRank()"><b>Trust Score `+ exchangeTrust + `</b></td>
    <td style="cursor: pointer;" onclick="getExVol()"><b>Volume `+ exchangeVolume + `</b></td>
  </tr>`

  document.getElementById('myXtable').innerHTML += eHeaders;
  
  for (var i = 0; i < data.length; i++) {

    var contenido = `<tr>
      <td style="padding-left:25px;">`+ data[i].trust_score_rank + `</td>
      <td style="padding-left:25px;"><img style='width:24px' src='`+ data[i].image + `'></td>
      <td>`+ data[i].name + `</td>
      <td>` + data[i].trust_score + `</td>      
      <td>` + new Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(data[i].trade_volume_24h_btc) + `</td>
      </tr>`

    document.getElementById('myXtable').innerHTML += contenido
  }

}



