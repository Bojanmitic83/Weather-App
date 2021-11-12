let mainBtn = document.querySelector("#main-btn");
let mainInput = document.querySelector("#main-input");
let mainDisplay = document.querySelector("#main-display");
let mainHeading = document.querySelector("#main-heading");
let mainBody = document.querySelector("body");
let tr = document.querySelector(".tr")

mainBtn.addEventListener("click",searchCity);

function searchCity(e){
  e.preventDefault();
  let city = mainInput.value;
  let xml = new XMLHttpRequest();
  xml.open("GET",`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=959f515c84613c37aa88af9e41258ea4&units=metric`);
  xml.onreadystatechange = function(){
    if(xml.readyState === 4 && xml.status === 200){
      displayResult(JSON.parse(xml.responseText));
    }
  }
  localStorage.city = `${city}`;
  
  xml.send();
  setCity();
}
//xml.open("GET",`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=959f515c84613c37aa88af9e41258ea4&units=metric`);


// function forecast(e){
//   e.preventDefault();
//   let city = mainInput.value;
//   let xml = new XMLHttpRequest();
//   xml.open("GET",`api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt={cnt}&appid=959f515c84613c37aa88af9e41258ea4&units=metric`);
//   xml.onreadystatechange = function(){
//     if(xml.readyState === 4 && xml.status === 200){
//       displayResult(JSON.parse(xml.responseText));
//     }
//   }
//   localStorage.city = `${city}`;
  
//   xml.send();
//   setCity();
//}
function displayResult(data){
  
  console.log(data);
  mainDisplay.innerHTML = "<h4>Trenutna temperatura: "+data.list[0].main.temp+" C°</h4>"+
                          "<h4>Maksimalna dnevna :"+data.list[0].main.temp_max+" C°</h4>"+
                          "<h4>Minimalna dnevna :"+data.list[0].main.temp_min+" C°</h4>"+
                          "<h4>Subjektivni osećaj :"+data.list[0].main.feels_like+" C°</h4>"+
                          "<h4>Pritisak :"+data.list[0].main.pressure+" Mbar</h2>"
                          ;
  changeImg(data);

  
  
}

function changeImg(data){
  if(data.list[0].main.temp > 20 && data.list[0].main.temp < 35){
    
    mainHeading.innerHTML = mainInput.value+`<img src="sun.gif" />`;
    mainBody.className = "warm";
    }else if(data.list[0].main.temp > 0 && data.list[0].main.temp < 20){
      mainHeading.innerHTML = mainInput.value+`<img src="sun.gif" />`;
      mainBody.className = "spring";
  }else if(data.list[0].main.temp < -1){
    mainHeading.innerHTML = mainInput.value+`<img src="cold.gif" />`;
    mainBody.className = "winter";
  }
}

function setCity(){
  if(localStorage.city){
    if(localStorage.city === mainInput.value){
      mainHeading.value =this;
    }
  }
}