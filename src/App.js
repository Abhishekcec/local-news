import logo from './logo.svg';
import './App.css';
import React, {Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import Home from "./Components/Home";
import NewsDashboard from './Components/NewsDashboard';
import store from './Redux/store'

class App extends Component {
      constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    localStorage.setItem('lat', position.coords.latitude);
    localStorage.setItem('lon', position.coords.longitude);
});
  }
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path = "/">
              <Home />
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/news">
              <NewsDashboard/>
            </Route>
          </Switch>
        </BrowserRouter>
        {/* <h4>Using geolocation JavaScript API in React</h4> */}
      </div>
      </Provider>
    );
  }
  //   </div>
  // );
}

export default App;
