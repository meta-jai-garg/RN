const rootURL = 'http://api.openweathermap.org/data/2.5/weather?APPID=37a48452e709699e3c1e56370bd13724';

export const fetchWeather = (lat, long) => {
  const url = rootURL+'&lat='+lat+'&lon='+long+"&units=metric";
  console.log(url);

  return fetch(url)
    .then(res=>res.json())
    .then(json=>(
      {
        temp:json.main.temp, 
        weather:json.weather[0].main
      }
    ))
    .catch(error=>console.log(error));
}