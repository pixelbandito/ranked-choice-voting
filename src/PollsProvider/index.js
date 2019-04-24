import React, { Component } from 'react';
import shortid from 'shortid';

export class PollsProvider extends Component {
  static defaultPoll = {
    candidates: [],
    enabled: false,
    id: shortid.generate(),
    name: '',
    createdDate: null,
    updatedDate: null,
    enabledDate: null,
  };

  static updatePollsFromLocalStorage = () => {
    const savedPolls = window.localStorage.getItem('polls');

    let polls = {};

    try {
      polls = JSON.parse(savedPolls) || polls;
    } catch(e) {
      console.warn('Couldn\'t load polls, they\'ll be overwritten');
    }

    return polls;
  }

  state = {
    polls: {},
  }

  componentDidMount() {
    this.setState({ polls: PollsProvider.updatePollsFromLocalStorage()});
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
      },
    });
  }

  getActivePoll = () => {
    const { polls } = this.state;
    const firstPollKey = Object.keys(polls).length ? Object.keys(polls)[0] : null;

    if (firstPollKey) {
      return polls[firstPollKey];
    }

    return { ...PollsProvider.defaultPoll };
  }

  render() {
    const {
      children,
      ...passedProps
    } = this.props;

    const { polls } = this.state;

    return React.cloneElement(children, {
      ...passedProps,
      activePoll: this.getActivePoll(),
      addPoll: this.addPoll,
      polls,
      setPolls: this.setPolls,
      setPoll: this.setPoll,
    });
  }
}

export default PollsProvider;
