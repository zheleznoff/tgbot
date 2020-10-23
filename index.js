require('dotenv/config');
var weather = require('weather-js');
const TelegramBot = require('node-telegram-bot-api');
const valute = require('./features/valutes');
const token = process.env.TG_TOKEN;
const day = require('./features/day');
const debug = require('./features/debug');

const bot = new TelegramBot(token, {polling: true});

const http = require('http');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {});

var reqTimer = setTimeout(function wakeUp() {
  request("https://tgmailingbot.heroku.com/", function() {
     console.log("WAKE UP DYNO");
  });
  return reqTimer = setTimeout(wakeUp, 1200000);
}, 1200000);

//KEYBOARD 
var options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Погода', callback_data: '1'}],
      [{ text: 'Курс валют', callback_data: '2'}],      
    ]
  })
};

bot.onText(/\/keyboard/, function (msg, match) {
  bot.sendMessage(msg.chat.id, 'Выберите опцию:', options);
});
// Matches "/echo [whatever]"
//bot.onText(/\/погода/, (msg, match) => {
//    // 'msg' is the received Message from Telegram
//    // 'match' is the result of executing the regexp above on the text content
//    // of the message
//    var userId = msg.from.id;
//    weather.find({search: 'Perm, Russia', degreeType: 'C'}, function(err, result) {
//      if(err) console.log(err);      
//      for (i = 0; i < result[0].forecast.length; i++) {
//        if (result[0].forecast[i].day === day.currentday()) {
//          let output = 'Дата: ' + result[0].forecast[i].date + '\n' + 
//          'Текущая погода: ' + result[0].current.temperature + '\n' + 
//          'Диапазон сегодня: ' + 'от ' + result[0].forecast[i].low + ' до ' + result[0].forecast[i].high + ' градусов' + '\n' + 
//          'Статус: ' + result[0].forecast[i].skytextday;
//          bot.sendMessage(userId, output);
//        };
//      }            
//    });      
//});

//bot.onText(/\/валюта/, (msg, match) => {
//  // 'msg' is the received Message from Telegram
//  // 'match' is the result of executing the regexp above on the text content
//  // of the message
//  var userId = msg.from.id;
//  let currencyoutput = '💰Данные Центробанка: \n' + '💲USD/RUB - ' + valute.currencydata.Valute.USD.Value + '\n' + '💶EUR/RUB - ' + valute.currencydata.Valute.EUR.Value;
//  bot.sendMessage(userId, currencyoutput);
//});

bot.on('callback_query', query => {  
  switch (query.data) {
    case "1":
      weather.find({search: 'Perm, Russia', degreeType: 'C'}, function(err, result) {
        if(err) console.log(err);      
        for (i = 0; i < result[0].forecast.length; i++) {
          if (result[0].forecast[i].day === day.currentday()) {
            let output = 'Дата: ' + result[0].forecast[i].date + '\n' + 
            'Текущая погода: ' + result[0].current.temperature + '\n' + 
            'Диапазон сегодня: ' + 'от ' + result[0].forecast[i].low + ' до ' + result[0].forecast[i].high + ' градусов' + '\n' + 
            'Статус: ' + result[0].forecast[i].skytextday;
            bot.sendMessage(query.message.chat.id, output);                    
          };
        }            
      }); 
      
      break;
    case "2":      
      bot.sendMessage(query.message.chat.id, valute.currencyoutput);      
      break;
    
  }
})
  // Listen for any kind of message. There are different kinds of messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;  
    bot.sendMessage(chatId, 'Выберите опцию:', options);    
  });



