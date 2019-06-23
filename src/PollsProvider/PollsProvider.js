import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const getPollsFromLocalStorage = () => {
  const savedPolls = window.localStorage.getItem('polls');

  let polls = {};

  try {
    polls = JSON.parse(savedPolls) || polls;
  } catch(e) {
    console.warn('Couldn\'t load polls, they\'ll be overwritten');
  }

  return polls;
};

class PollsProvider extends Component {
  state = {
    polls: getPollsFromLocalStorage(),
  }

  setPolls = (polls) => {
    this.setState({ polls });
    const pollsString = JSON.stringify(polls);
    window.localStorage.setItem('polls', pollsString);
  }

  setPoll = (poll) => {
    const { polls: prevPolls } = this.state;

    this.setPolls({
      ...prevPolls,
      [poll.id]: {
        ...PollsProvider.defaultBallot,
        ...prevPolls[poll.id],
        ...poll,
        dateUpdated: new Date().valueOf(),
      },
    });
  }

  render() {
    const {
      children,
      ...passedProps
    } = this.props;

    const { polls } = this.state;

    if (!polls) {
      return (
        <div className="PollsProvider__loader" />
      );
    }

    return React.Children.map(children, child => !React.isValidElement(child)
      ? child
      : React.cloneElement(child, {
        ...passedProps,
        polls,
        setPoll: this.setPoll,
      })
    )
  }
}

PollsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PollsProvider;
