import {
    FETCH_WEATHER_REQUEST,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE
  } from './weatherTypes'
  
  const initialState = {
    loading: false,
    weather: {
        coord: {
            lon: 76.4496,
            lat: 9.2419
        },
        weather: [
            {
                id: 804,
                main: "Clouds",
                description: "overcast clouds",
                icon: "04d"
            }
        ],
        base: "stations",
        main: {
            temp: 298.86,
            feels_like: 299.71,
            temp_min: 298.86,
            temp_max: 298.86,
            pressure: 1006,
            humidity: 85,
            sea_level: 1006,
            grnd_level: 1006
        },
        visibility: 9108,
        wind: {
            speed: 3.62,
            deg: 291,
            gust: 6.39
        },
        clouds: {
            all: 100
        },
        dt: 1630152474,
        sys: {
            country: "IN",
            sunrise: 1630111554,
            sunset: 1630155930
        },
        timezone: 19800,
        id: 1267360,
        name: "",
        cod: 200
    },
    error: ''
  }
  
  const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_WEATHER_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_WEATHER_SUCCESS:
        return {
          loading: false,
          weather: action.payload,
          error: ''
        }
      case FETCH_WEATHER_FAILURE:
        return {
          loading: false,
          weather: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default weatherReducer
  