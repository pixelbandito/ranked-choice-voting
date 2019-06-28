import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActivePollIdContext from '../model/ActivePollIdContext';

const candidatesEliminatedErrorMessage = 'All candidates have been eliminated.';
const candidatesMissingErrorMessage = 'Coulnd\'t find any candidates.';

class Results extends Component {
  static getPollSortedBallotsArray = ({ poll, ballots }) => {
    console.log({ poll, ballots: Object.values(ballots) });
    const sortedBallotsArray = Object.entries(ballots)
      .filter(([id, ballot]) => ballot && ballot.pollId === poll.id)
      .sort(([id, ballot], [id2, ballot2]) => ballot.dateSubmitted > ballot2.dateSubmitted ? -1 : 1)
      .map(([id, ballot]) => {
        return ballot;
      });

    return sortedBallotsArray;
  }

  static getRoundVotes = ({ ballotsArray, round = 0 }) => {
    return ballotsArray.reduce((result, ballot) => {
      const { candidateRanks } = ballot;

      if (candidateRanks.length > round) {
        const chosenCandidateId = candidateRanks[round];
        result[chosenCandidateId] = (result[chosenCandidateId] || 0) + 1;
      }

      return result;
    }, {});
  }

  static calculateResults = ({
    ballotsArray,
    candidates,
    roundIndex = 1,
    winningThreshold,
  }) => {
    // TODO: Second round should be transferrable votes. not second round of voting
    const votes = Results.getRoundVotes({ ballotsArray });

    // console.log('calculateResults', { candidates, ballotsArray, winningThreshold, roundIndex, votes });
    const candidateIds = candidates.map(c => c.id);

    if (!candidateIds.length && roundIndex === 1) {
      throw new Error(candidatesMissingErrorMessage);
    } else if (!candidateIds.length) {
      throw new Error(candidatesEliminatedErrorMessage);
    }

    const winnerIds = candidateIds.filter(cId => votes[cId] && votes[cId] > winningThreshold);

    if (winnerIds.length) {
      // console.log('We have some winners!', { winnerIds });
      return { winnerIds };
    } else {
      // console.log('No winner yet...');

      let leastVotesReceived = candidateIds.reduce((result, cId) => {
        const candidateVotes = votes[cId] || 0;
        result = typeof result === 'number' ? result : candidateVotes;
        result = result <= candidateVotes ? result : candidateVotes;
        return result;
      }, null);

      // TODO: It would be nice to know which candidates actually got votes in the previous round.
      let loserIds = candidates.map(c => c.id).filter(cId => (votes[cId] || 0) === leastVotesReceived);

      let nextBallotsArray = [...ballotsArray];

      // TODO: Need a tie-breaking strategy
      if (loserIds.length) {
        // console.log('We have some losers!', { loserIds });

        // TODO: Remove losers and go again.

        const nextCandidates = candidates.filter(candidate => loserIds.indexOf(candidate.id) < 0);
        nextBallotsArray = nextBallotsArray.map(prevBallot => ({
          ...prevBallot,
          candidateRanks: prevBallot.candidateRanks.filter(cId => loserIds.indexOf(cId) < 0),
        }));

        // console.log({ nextCandidates, nextBallotsArray });

        try {
          return Results.calculateResults({
            ballotsArray: nextBallotsArray,
            candidates: nextCandidates,
            roundIndex: roundIndex + 1,
            winningThreshold,
          });
        } catch (e) {
          if (e.message === candidatesEliminatedErrorMessage) {
            return { winnerIds: candidateIds };
          }

          throw e;
        }

      } else {
        throw new Error('Couldn\'t determine losers to remove for next round');
      }
    }
  }

  state = {
    activePoll: {},
    errorMessage: '',
    prevActivePollId: null,
    winnerIds: [],
  }

  componentDidMount() {
    this.updateActivePollFromProps();
  }

  componentDidUpdate() {
    this.updateActivePollFromProps();
  }

  updateActivePollFromProps = () => {
    const { polls } = this.props;
    const activePollId = this.context;
    const { prevActivePollId } = this.state;

    if (activePollId !== prevActivePollId) {
      this.setState({
        prevActivePollId: activePollId,
        activePoll: (activePollId && polls && polls[activePollId]) || {}
      });
    }
  }

  calculateWinner = () => {}

  handleClickCalculateWinners = () => {
    const { ballots } = this.props;
    const { activePoll: poll } = this.state;

    const ballotsArray = Results.getPollSortedBallotsArray({
      poll,
      ballots,
    });

    const plurality = ballotsArray.length / 2;
    const candidates = [...poll.candidates];

    this.setState({
      errorMessage: '',
      winnerIds: [],
    });

    try {
      const { winnerIds } = Results.calculateResults({
        ballotsArray,
        candidates,
        winningThreshold: plurality,
      });

      this.setState({
        winnerIds,
      });
    } catch (e) {
      this.setState({
        errorMessage: e.message,
      });
    }
  }

  render() {
    const { ballots } = this.props;

    const {
      activePoll: poll,
      errorMessage,
      winnerIds,
    } = this.state;

    const sortedBallotsArray = Results.getPollSortedBallotsArray({
      poll,
      ballots,
    });

    return (
      <div>
        <h1>
          &lt;Results /&gt;
        </h1>
        <h2>{sortedBallotsArray.length} ballot{sortedBallotsArray.length === 1 ? '' : 's'}</h2>
        <ul>
          {sortedBallotsArray.map(ballot => (
            <li key={ballot.id}>
              <em>{new Date(ballot.dateSubmitted).toLocaleString()}</em>
              <br />
              <pre>{JSON.stringify(ballot)}</pre>
            </li>
          ))}
        </ul>
        <button onClick={this.handleClickCalculateWinners}>
          Calculate winners
        </button>
        { !!winnerIds.length &&
          <div className="Results__winners">
            <strong>Congratulations!</strong>
              <ul>
                {winnerIds.map(winnerId => {
                  const winner = poll.candidates.find(c => c.id === winnerId);
                  if (winner) {
                    return <li key={winner.id}>
                      {winner.name}
                    </li>
                  }

                  return null;
                })}
              </ul>
          </div>
        }
        {errorMessage &&
          <div className="Results__errorMessage">
            {errorMessage}
          </div>
        }
      </div>
    );
  }
}

Results.contextType = ActivePollIdContext;

Results.propTypes = {
  polls: PropTypes.shape(),
  ballots: PropTypes.array,
};

export default Results;
