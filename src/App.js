/* eslint react/jsx-filename-extension:"off"
, react/prefer-stateless-function: "off"
, react/forbid-prop-types: "off" */
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import logo from './logo.svg';
import './App.css';
import MovieList from './MovieList';
// import Header from './Header';

const styles = {
  root1: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={{ width: '100%' }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              className={{ marginLeft: -12, marginRight: 20 }}
              color="contrast"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" className={classes.flex}>
              Title
            </Typography>
            <Button>Login</Button>
          </Toolbar>
        </AppBar>
        <MovieList url="discover/tv?sort_by=popularity.desc&page=1" />
        <MovieList url="discover/movie?sort_by=popularity.desc&page=1" />
      </div>
    );
  }
}

// function Hero() {
//   return (
//     <div id="hero" className="Hero" style={{ backgroundImage: 'url(https://images.alphacoders.com/633/633643.jpg)' }}>
//       <div className="content">
//         <img className="logo" src="http://www.returndates.com/backgrounds/narcos.logo.png" alt="" />
//         <h2>Season 2 now available</h2>
//         <p>Lorem ipsum dolor sit amet, magnam quis quod.</p>
//         <div className="button-wrapper">
// 
//         </div>
//       </div>
//       <div className="overlay" />
//     </div>
//   );
// }

// function HeroButton() {
//   return (
//     <a href="#" className="Button" data-primary={this.props.primary}>{this.props.text}</a>
//   );
// }

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
