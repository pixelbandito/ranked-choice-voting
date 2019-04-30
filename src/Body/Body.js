import React, { Component } from 'react';
import Login from '../Login';
import PollForm from '../PollForm';
import Ballot from '../Ballot';
import PollsProvider from '../PollsProvider';
import BallotsProvider from '../BallotsProvider';
import Results from '../Results';

class Body extends Component {
  state = {
    tab: 'pollForm',
  }

  handleClickSetTab = (nextTab) => (event) => this.setState({ tab: nextTab });

  render() {
    const { auth, ...passedProps } = this.props;
    const { tab } = this.state;

    return (
    <div {...passedProps}>
      <div className="tabs">
        <button
          className="tab"
          onClick={this.handleClickSetTab('pollForm')}
        >
          Poll editor
        </button>
        <button
          className="tab"
          onClick={this.handleClickSetTab('ballot')}
        >
          Ballot
        </button>
        <button
          className="tab"
          onClick={this.handleClickSetTab('results')}
        >
          Results
        </button>
      </div>
      {tab === 'pollForm' &&
        <PollsProvider>
          <PollForm/>
        </PollsProvider>
      }
      {tab === 'ballot' &&
        <PollsProvider>
          <BallotsProvider>
            <Ballot/>
          </BallotsProvider>
        </PollsProvider>
      }
      {tab === 'results' &&
        <PollsProvider>
          <BallotsProvider>
            <Results/>
          </BallotsProvider>
        </PollsProvider>
      }
      {false && <Login />}
    </div>
  );;
  }
}

export default Body;
