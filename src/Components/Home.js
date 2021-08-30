import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchWeather } from "../Redux";
import './home.css'

class Home extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
        };
    }
    componentDidMount() {
        //to get location details from localstorage and fetch the weather data
        const lon = localStorage.getItem('lon');
        const lat = localStorage.getItem('lat');
        this.props.fetchWeather(lat, lon)
    }
    
    render(){
        //redirect to the news dashboard
        const getNews = () => {
            this.props.history.push("/news")
        }
        return(
            <div className="home">
                <h1 className="heading">Welcome to NewsApp</h1>
                <button className="btn" onClick = {getNews}>Get News</button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        weatherData: state.weather
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchWeather: (latitude, longitude) => dispatch(fetchWeather(latitude, longitude))
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));