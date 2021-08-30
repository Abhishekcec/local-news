import React from "react";

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import './newscomponent.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

function NewsComponent(props){

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Container fixed>
                <Typography component="div" >
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>    
                                <p className="published">
                                    <b>Published {props.publishedAt.split("T")[0]}</b>
                                </p>
                                <h3 ><b>{props.title}</b></h3>
                                <table>
                                    <tbody>
                                        <tr >
                                            <td >
                                                <img src={props.image} /> 
                                            </td>
                                            <td >
                                                <p>{props.description}</p>
                                                <p>{props.content}</p>
                                                <p>{props.sourceName} <a href={props.sourceURL}>{props.sourceURL}</a></p>
                                                <p><a href={props.source}>Please Visit</a></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Paper>
                        </Grid>
                    </Grid >
                </Typography>
            </Container>
        </div>
        )
    }
    
export default NewsComponent;