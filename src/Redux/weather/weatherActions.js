import axios from 'axios'
import {
    FETCH_WEATHER_REQUEST,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE
} from './weatherTypes'

export const fetchWeather = (latitude, longitude) => {
  return (dispatch) => {
    dispatch(fetchWeatherRequest())
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5793757229b715cd912a57c38b356e39`)
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
