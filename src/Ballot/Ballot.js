import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import ActivePollIdContext from '../model/ActivePollIdContext';

export class Ballot extends Component {
  state = {
    ballots: [],
    candidateRanks: [],
    voterName: '',
    prevContext: this.context,
  }

  componentDidMount() {
    this.updateShuffledCandidatesFromProps({
      activePollId: this.context,
      props: this.props,
      prevActivePollId: null,
      prevProps: {},
    });
  }

  componentDidUpdate(prevProps) {
    const { prevContext } = this.state;

    this.updateShuffledCandidatesFromProps({
      activePollId: this.context,
      props: this.props,
      prevActivePollId: prevContext,
      prevProps: prevProps,
    });
  }

  updateShuffledCandidatesFromProps = ({
    activePollId,
    prevActivePollId,
    props,
    prevProps,
    forceUpdate = false,
  }) => {
    console.log({ prevProps });
    const nextActivePoll = (activePollId && props.polls && props.polls[activePollId]) || {};
    const prevActivePoll = (prevActivePollId && prevProps.polls && prevProps.polls[prevActivePollId]) || {};
    const { candidates: nextCandidates = [] } = nextActivePoll;
    const { candidates: prevCandidates = [] } = prevActivePoll;
    let stateUpdates = {};

    if (activePollId !== prevActivePollId) {
      console.log({ activePollId, prevActivePollId });

      stateUpdates = {
        ...stateUpdates,
        prevContext: activePollId,
      };
    }

    if (JSON.stringify(nextCandidates) !== JSON.stringify(prevCandidates) || forceUpdate) {
      console.log({ nextCandidates, prevCandidates });
      const shuffledCandidates = [...nextCandidates];
      shuffledCandidates.sort(() => Math.random() > 0.5 ? 1 : -1);
      const candidateRanks = shuffledCandidates.map(candidate => candidate.id);

      console.log({ candidateRanks });

      stateUpdates = {
        ...stateUpdates,
        candidateRanks,
      };
    }

    console.log({ stateUpdates });
    this.setState({ stateUpdates });
  }

  onChangeCandidateRankInput = candidateId => event => {
    const { candidateRanks: prevCandidateRanks } = this.state;
    const nextRank = event.target.value;

    if (nextRank) {
      const nextCandidateRanks = [...prevCandidateRanks];
      nextCandidateRanks.splice(prevCandidateRanks.indexOf(candidateId), 1);
      nextCandidateRanks.splice(nextRank, 0, candidateId);
      this.setState({ candidateRanks: nextCandidateRanks });
    }
  }

  handleChangeVotertNameInput = event => this.setState({ voterName: event.target.value });

  handleSubmitBallotForm = (event) => {
    const {
      polls,
      addBallot,
    } = this.props;

    const {
      candidateRanks,
      voterName,
    } = this.state;

    const activePoll = this.context && (polls[this.context] || {});
    const { id: pollId = null } = activePoll;

    event.preventDefault();

    addBallot({
      candidateRanks,
      dateSubmitted: new Date().valueOf(),
      submitted: true,
      id: shortid.generate(),
      pollId,
      voterName,
    });

    this.setState({ voterName: '' });
    this.updateShuffledCandidatesFromProps({ nextProps: this.props, forceUpdate: true });
  }

  render() {
    const { polls } = this.props;
    const activePoll = this.context && (polls[this.context] || {});

    const {
      candidateRanks,
      voterName,
    } = this.state;

    const { candidates = [] } = activePoll || {};

    return (
      <div>
        <h1>
          Ballot
        </h1>
        <form onSubmit={this.handleSubmitBallotForm}>
          <section>
            <label htmlFor="voterName">
              Your name
            </label>
            <input
              id="voterName"
              type="text"
              onChange={this.handleChangeVotertNameInput}
              value={voterName}
            />
          </section>
          <section>
            <ul>
              {candidateRanks.map((candidateId, i) => {
                const candidate = candidates.find(candidate => candidate.id ===candidateId);

                console.log({candidate, candidates});

                return (
                  <li key={candidate.id}>
                    <label htmlFor={`candidateRankInput--${candidate.id}`}>
                      Candidate rank
                      <br/>
                      <strong>
                        {candidate.name}
                      </strong>
                    </label>
                    <input
                      id={`candidateRankInput--${candidate.id}`}
                      min="0"
                      max={candidates.length - 1}
                      step="1"
                      type="number"
                      value={i}
                      onChange={this.onChangeCandidateRankInput(candidate.id)}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
          <section>
            <button
              type="submit"
              disabled={!voterName}
            >
              Submit
            </button>
          </section>
        </form>
      </div>
    );
  }
}

Ballot.contextType = ActivePollIdContext;

Ballot.propTypes = {
  addBallot: PropTypes.func,
  polls: PropTypes.shape(),
};

Ballot.defaultProps = {
  addBallot: null,
  polls: {},
};

export default Ballot;
