let mainBtn = document.querySelector("#main-btn");
let mainInput = document.querySelector("#main-input");
let mainDisplay = document.querySelector("#main-display");
let mainHeading = document.querySelector("#main-heading");
let mainBody = document.querySelector("body");

mainBtn.addEventListener("click",searchCity);

function searchCity(e){
  e.preventDefault();
  let city = mainInput.value;
  let xml = new XMLHttpRequest();
  xml.open("GET",`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=959f515c84613c37aa88af9e41258ea4&units=metric`);
  xml.onreadystatechange = function(){
    if(xml.readyState === 4 && xml.status === 200){
      displayResult(JSON.parse(xml.responseText));
    }
  }
  localStorage.city = `${city}`;
  
  xml.send();
  setCity();
}


function displayResult(data){
  console.log(data);
  mainDisplay.innerHTML = "<h4>Trenutna temperatura: "+data.main.temp+" C°</h4>"+
                          "<h4>Maksimalna temperatura :"+data.main.temp_max+" C°</h4>"+
                          "<h4>Minimalna temperatura :"+data.main.temp_min+" C°</h4>"+
                          "<h4>Subjektivni osećaj :"+data.main.feels_like+" C°</h4>"+
                          "<h4>Pritisak :"+data.main.pressure+" Mbar</h2>"
  if(data.main.temp > 20){
    mainHeading.innerHTML = mainInput.value+`<img src="sun.gif" />`;
  
  // }else if(){
    
  }else{
    mainHeading.innerHTML = mainInput.value+`<img src="cold.gif" />`
  }

}

function setCity(){
  if(localStorage.city){
    if(localStorage.city === mainInput.value){
      mainHeading.value =this;
    }
  }
}