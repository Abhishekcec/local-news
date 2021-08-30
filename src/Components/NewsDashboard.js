import axios from "axios";
import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { fetchWeather } from "../Redux";
import NewsComponent from "./NewsComponent";

import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LanguageIcon from '@material-ui/icons/Language';
import SearchIcon from '@material-ui/icons/Search';
import './newsdashboard.css'

const useStyles = makeStyles((theme) => ({  
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  }));

function NewsDashboard(props){

  useEffect(() => {
      getNews()
  }, [])

  const classes = useStyles();
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  //fetch top headlines initially in local language
  const getNews = () => {
    localStorage.setItem('searchTerm', "")
    localStorage.setItem('lang',"")
    axios.get(`https://gnews.io/api/v4/top-headlines?lang=ml&token=${API_KEY}`)
    .then(response=>{
        setNewsData(response.data.articles)
    })
    .catch(err => console.log("error: ", err))
  
  }

  //fetch news based on user's language and search term
  const getSearchedNews = () => {
    const lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ml"
    const searchTerm = localStorage.getItem("searchTerm") ? localStorage.getItem("searchTerm") : ""
    axios.get(`https://gnews.io/api/v4/top-headlines?q=${searchTerm}&lang=${lang}&token=${API_KEY}`)
    .then(response=>{
        console.log("news: ", response);
        setNewsData(response.data.articles)
    })
    .catch(err => console.log("error: ", err))
  }

  const [searchText, setSearchText] = useState('')
  const [language, setLanguage] = useState('MALAYALAM')
  const [newsData, setNewsData] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = (data) => {
    localStorage.setItem("lang", data)
    
    if(data == 'ml'){
      setLanguage("MALAYALAM")
    }
    else if(data == "hi"){
      setLanguage("HINDI")
    }
    else{
      setLanguage("ENGLISH")
    }
    setAnchorEl(null);
    getSearchedNews();
  }
    
  const changeHandler = (e) => {
    setSearchText(e)
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      localStorage.setItem("searchTerm", searchText)
      setSearchText('')
      getSearchedNews();
    }
  }
  return(
    <div className={classes.root}>
      <AppBar position="static" className="appbar" style={{backgroundColor: "#2c3e50"}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} id="appName" >
            Welcome to NewsApp
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search News…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value = {searchText}
              onChange = {(e) => changeHandler(e.currentTarget.value)}
              onKeyPress={handleKeyPress}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <LanguageIcon className="searchBar" />  
              <b className="searchBar" >{language}</b>
              <ArrowDropDownIcon className="searchBar"/>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={(event) => {event.preventDefault(); handleSelectLanguage('ml')}}>Malayalam</MenuItem>
              <MenuItem onClick={(event) => {event.preventDefault(); handleSelectLanguage('hi')}}>Hindi</MenuItem>
              <MenuItem onClick={(event) => {event.preventDefault(); handleSelectLanguage('en')}}>English</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h2><b>Top Headlines</b></h2>
          </Grid>
          <Grid item xs={6}>
            <div className="weatherReport" >
                <h3 className="weatherHeading" ><b>Weather Report</b> </h3>
                <p className="weatherData" >{props.weatherData.weather.name}{Math.floor(props.weatherData.weather.main.temp - 273.15)}°C {props.weatherData.weather.weather[0].description}</p>
            </div>
          </Grid>
        </Grid>
        <Typography component="div" className="newsComponent" >
          <div>
            {newsData &&
            newsData.map(data => 
              <div>
                <NewsComponent 
                  title={data.title} 
                  image={data.image} 
                  description={data.description}
                  content={data.content}
                  publishedAt={data.publishedAt}
                  sourceName={data.source.name}
                  sourceURL={data.source.url}
                  source={data.url}
                />
                <br/>
              </div>
            )}
          </div>
        </Typography>
       </Container>
    </div>
  )
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
export default connect(
      mapStateToProps,
      mapDispatchToProps
)(NewsDashboard)
    