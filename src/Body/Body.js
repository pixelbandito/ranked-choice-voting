import React, { Component } from 'react';

import ActivePollChooser from '../ActivePollChooser';
import ActivePollIdProvider from '../ActivePollIdProvider';
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
          <ActivePollIdProvider>
            <ActivePollChooser/>
            <PollForm/>
          </ActivePollIdProvider>
        </PollsProvider>
      }
      {tab === 'ballot' &&
        <PollsProvider>
          <ActivePollIdProvider>
            <ActivePollChooser/>
            <BallotsProvider>
              <Ballot/>
            </BallotsProvider>
          </ActivePollIdProvider>
        </PollsProvider>
      }
      {tab === 'results' &&
        <PollsProvider>
          <BallotsProvider>
            <Results/>
          </BallotsProvider>
        </PollsProvider>
      }
    </div>
  );
  }
}

export default Body;
