'use strict';

const Readline = require('readline');
const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

//use matcher, weather,parser modules
const matcher  = require('./matcher');
const weather = require('./weather');
const {currentWeather,forecastWeather}=require('./parser');



rl.setPrompt('> ');
rl.prompt();
rl.on('line',reply =>  {
  matcher(reply, data => {
    switch(data.intent) {
      case 'Hello':
        console.log(`${data.entities.greeting} to you too`);
        rl.prompt();
        break;
      case 'Exit':
        console.log("have a nice day");
        process.exit(0);
        break;
      case 'CurrentWeather':
        console.log("let me check");
        weather(data.entities.city,'current')
          .then(response=>{
            let parseResult= currentWeather(response);
            console.log(parseResult);
            rl.prompt();
          })
          .catch(error=>{
            console.log("there seems to be a problem to the weather");
            rl.prompt();
          });
        break;
        case 'WeatherForecast':
          console.log("let me check");
          weather(data.entities.city)
            .then(response=>{
              let parseResult= forecastWeather(response,data.entities);
              console.log(parseResult);
              rl.prompt();
            })
            .catch(error=>{
              console.log("cannot forecast  the weather");
              rl.prompt();
            });
          break;

      default:{
        console.log("i do not know what you mean :(");
          rl.prompt();
        }
    }
  });
});
