var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();

var requestURL = 'https://www.cbr-xml-daily.ru/daily_json.js';
request.open('GET', requestURL,false);
//request.responseType = 'json';
request.send();
const currencydata = JSON.parse(request.responseText);

let currencystatusUSD = currencydata.Valute.USD.Value > currencydata.Valute.USD.Previous ? '⬆' : '⬇';
let currencystatusEUR =  currencydata.Valute.EUR.Value >  currencydata.Valute.EUR.Previous  ? '⬆' : '⬇';
let currencyoutput = '💰Данные Центробанка: \n' + '💲USD/RUB - ' + currencydata.Valute.USD.Value + currencystatusUSD + '\n' + '💶EUR/RUB - ' + currencydata.Valute.EUR.Value + currencystatusEUR;

module.exports.currencyoutput = currencyoutput;