import React, { Component } from 'react';
import shortid from 'shortid';

export class BallotsProvider extends Component {
  static defaultBallot = {
    candidateRanks: [],
    dateSubmitted: null,
    submitted: false,
    id: shortid.generate(),
    pollId: '',
    voterName: '',
  };

  static getBallotsFromLocalStorage = () => {
    const savedBallots = window.localStorage.getItem('ballots');

    let ballots = {};

    try {
      ballots = JSON.parse(savedBallots) || ballots;
    } catch(e) {
      console.warn('Couldn\'t load ballots, they\'ll be overwritten');
    }

    return ballots;
  }

  state = {
   ballots: {},
 }

  componentDidMount() {
    this.setState({ ballots: BallotsProvider.getBallotsFromLocalStorage()});
  }

  setBallots = (ballots) => {
    this.setState({ ballots });
    const ballotsString = JSON.stringify(ballots);
    window.localStorage.setItem('ballots', ballotsString);
  }

  addBallot = (ballot) => {
    const { ballots: prevBallots } = this.state;

    this.setBallots({
      ...prevBallots,
      [ballot.id]: {
        ...BallotsProvider.defaultBallot,
        ...prevBallots[ballot.id],
        ...ballot,
      },
    });
  }

  render() {
    const {
      children,
      ...passedProps
    } = this.props;

    const { ballots } = this.state;

    return React.cloneElement(children, {
      ...passedProps,
      ballots,
      addBallot: this.addBallot,
    });
  }
}

export default BallotsProvider;
