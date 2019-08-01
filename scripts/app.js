const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUI = (data) => {

  // const cityDets = data.cityDets;
  // const weather = data.weather;


  // destructured properties
  const {cityDets, weather} = data;

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>
  `;
  
  // update the night/day icon
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  // if(weather.IsDayTime){
  //   timeSrc = 'img/day.svg';
  // } else {
  //   timeSrc = 'img/night.svg';
  // }
  time.setAttribute('src', timeSrc)
  icon.setAttribute('src', iconSrc);


  // remove the d-none class if present
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }

};

const updateCity = async (city) => {

  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {cityDets,weather};
  
}

form.addEventListener('submit', (e)=>{
  // prevent default event
  e.preventDefault();

  // get city value
  const city =form.city.value.trim();
  form.reset();

  // update the ui with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));


});