var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"


getCoins()
//Funcion base al cargar la pagina
async function getCoins() {
  var response = await fetch(url)
  var data = await response.json()
  myLoop(data)
}

  
//Cambia el orden en base al Rank, dependiendo del checkbox
async function getOrder() {

  var checkBox = document.getElementById("mycheckBox");
  //Fetching API
  var response = await fetch(url)
  var data = await response.json()

  //Si el checkbox no esta checked se revierte el array
  if (checkBox.checked == false) {
    //checkbox pasa a checked true
    checkBox.checked = true;
    data.reverse()
  } else {
    //Si no, se pasa el checkbox a false y se trabaja con la misma data
    checkBox.checked = false;
  }
  myLoop(data)
}

//Cambia el orden en base al Precio, dependiendo del checkbox
async function getPrice() {

  var checkBox = document.getElementById("myprice");
  //Fetching API
  var response = await fetch(url)
  var data = await response.json()

  //Si el checkbox es false, se ordena por negativos primero
  if (checkBox.checked == false) {
    checkBox.checked = true;
    data.sort(function (a, b) {
      return b.current_price - a.current_price;
    });

  } else {
    //Si el checkbox es true, se ordena por positivos primero
    checkBox.checked = false;
    data.sort(function (a, b) {
      return a.current_price - b.current_price;
    });
  }
  myLoop(data)
}


//Cambia la data de la API dependiente de 24h %
async function getChange() {

  var checkBox = document.getElementById("mychange");

  var response = await fetch(url)
  var data = await response.json()

  //Si el checkbox es false, se ordena por negativos primero
  if (checkBox.checked == false) {
    checkBox.checked = true;
    data.sort(function (a, b) {
      return b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency;
    });

  } else {
    //Si el checkbox es true, se ordena por positivos primero
    checkBox.checked = false;
    data.sort(function (a, b) {
      return a.price_change_percentage_24h_in_currency - b.price_change_percentage_24h_in_currency;
    });
  }
  myLoop(data)
}


function myLoop(data) {

  document.getElementById('mitabla').innerHTML = '';
  //Checkbox de Rank
  var checkBox = document.getElementById("mycheckBox");
  //Checkbox de 24h %
  var checkBoxChange = document.getElementById("mychange");
  // Checkbox precio
  var checkBoxPrice = document.getElementById("myprice");
  //Icon de Rank
  var myIconRank = (checkBox.checked == true) ? '<span class="myblue"><i class="fas fa-angle-up"></i></span>' : '<span class="myblue"><i class="fas fa-angle-down"></i></span>'
  //Icon de precio
  var myIconPrice = (checkBoxPrice.checked == true) ? '<span class="myblue"><i class="fas fa-angle-up"></i></span>' : '<span class="myblue"><i class="fas fa-angle-down"></i></span>'
  //Icon de 24h
  var myIcon24 = (checkBoxChange.checked == true) ? '<span class="myblue"><i class="fas fa-angle-up"></i></span>' : '<span class="myblue"><i class="fas fa-angle-down"></i></span>'
  var headers = `
   <tr>
  <td style="cursor: pointer;" onclick="getOrder()"><b>Rank  `+ myIconRank + `</b></td>
  <td><b>Symbol</b></td>
  <td><b>Name</b></td>
  <td style="cursor: pointer;" onclick="getOrder()"><b>Market Cap `+ myIconRank + `</b></td>
  <td style="cursor: pointer;" onclick="getPrice()"><b>Price  `+ myIconPrice + `</b></td>
  <td onclick="getChange()" style="cursor: pointer;"><b>Change 24h % `+ myIcon24 + `</b></td>
</tr>`

  document.getElementById('mitabla').innerHTML += headers;

  for (var i = 0; i < data.length; i++) {
    var change24 = data[i].price_change_percentage_24h_in_currency.toFixed(2)
    var color = "green"
    if (change24 < 0) {
      var color = "red"
    }


    var contenido = `<tr>
      <td style="padding-left:25px;">`+ data[i].market_cap_rank + `</td>
      <td style="padding-left:25px;"><img style='width:24px' src='`+ data[i].image + `'></td>
      <td>`+ data[i].name + `</td>
      <td>` + new Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(data[i].market_cap) + `</td>      
      <td>` + new Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(data[i].current_price) + `</td>
      <td><p style="color:`+ color + `">` + change24 + ` %</td></p></td>
      </tr>`

    document.getElementById('mitabla').innerHTML += contenido
  }
}