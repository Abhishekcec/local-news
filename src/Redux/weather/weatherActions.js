import axios from 'axios'
import {
    FETCH_WEATHER_REQUEST,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE
} from './weatherTypes'
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
export const fetchWeather = (latitude, longitude) => {
  return (dispatch) => {
    dispatch(fetchWeatherRequest())
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
      .then(response => {
        // response.data is the users
        const weather = response.data
        dispatch(fetchWeatherSuccess(weather))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchWeatherFailure(error.message))
      })
  }
}

export const fetchWeatherRequest = () => {
  return {
    type: FETCH_WEATHER_REQUEST
  }
}

export const fetchWeatherSuccess = weather => {
  return {
    type: FETCH_WEATHER_SUCCESS,
    payload: weather
  }
}

export const fetchWeatherFailure = error => {
  return {
    type: FETCH_WEATHER_FAILURE,
    payload: error
  }
}
