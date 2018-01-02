/* eslint react/jsx-filename-extension:"off",
react/prefer-stateless-function: "off",
react/forbid-prop-types: "off",
arrow-body-style: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import { CircularProgress } from 'material-ui/Progress';
// import 'whatwg-fetch';

class MovieList extends React.Component {
  constructor(props) { // props is optional
    super(props);
    this.api_key = 'b9dd70cd3cf57777de4312ce7beee5b4';
    this.state = {
      isLoading: true,
      movies: [5],
    };
  }

  componentDidMount() {
    this.loadContent();
  }

  loadContent() {
    // const requestUrl = 'https://api.themoviedb.org/3/' + this.props.url + '&api_key=' + this.apiKey;
    const requestUrl = `https://api.themoviedb.org/3/${this.props.url}&api_key=${this.api_key}`;
    // const requestUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1&api_key=${this.api_key}`;
    // const omdb = `https://www.omdbapi.com?s=star&y=&r=json&plot=short`;
    fetch(requestUrl)
      .then(resp => resp.json())
      .then((resp) => {
        const movies = resp.results.slice(0, 5).map((movie) => {
          return {
            img: `http://image.tmdb.org/t/p/original${movie.backdrop_path}`,
            title: movie.original_title,
          };
        });
        this.setState({ movies, isLoading: false });
      })
      // .catch(err => this.setState({ tileData: err }));
      .catch(err => console.log(err));
  }

  mapTiles() {
    const { classes } = this.props;
    return (
      this.state.movies.map(tile => (
        <GridListTile key={tile.img}>
          <img src={tile.img} alt={tile.title} />
          <GridListTileBar
            title={tile.title}
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            actionIcon={
              <IconButton>
                <StarBorderIcon className={classes.title} />
              </IconButton>
            }
          />
        </GridListTile>
      ))
    );
  }

  render() {
    const { classes } = this.props;
    if (this.state.isLoading) {
      return (
        this.state.movies.map(() => <CircularProgress className={classes.progress} />)
      );
    }
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {this.mapTiles()}
        </GridList>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary[200],
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

MovieList.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default withStyles(styles)(MovieList);
