import React, { Component } from 'react';
import shortid from 'shortid';

export class Ballot extends Component {
  state = {
    ballots: [],
    candidateRanks: [],
    voterName: '',
  }

  componentDidMount() {
    this.updateShuffledCandidatesFromProps({ nextProps: this.props });
  }

  componentDidUpdate(prevProps) {
    this.updateShuffledCandidatesFromProps({ nextProps: this.props, prevProps: prevProps });
  }

  updateShuffledCandidatesFromProps = ({ prevProps = {}, nextProps = {}, forceUpdate = false }) => {
    const { activePoll: nextActivePoll } = nextProps;
    const { activePoll: prevActivePoll } = prevProps;
    const { candidates: nextCandidates = [] } = nextActivePoll || {};
    const { candidates: prevCandidates = [] } = prevActivePoll || {};

    if (JSON.stringify(nextCandidates) !== JSON.stringify(prevCandidates) || forceUpdate) {
      const shuffledCandidates = [...nextCandidates];
      shuffledCandidates.sort(() => Math.random() > 0.5 ? 1 : -1);
      const candidateRanks = shuffledCandidates.map(candidate => candidate.id);

      this.setState({ candidateRanks });
    }
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
      activePoll: { id: pollId = null } = {},
      addBallot,
    } = this.props;

    const {
      candidateRanks,
      voterName,
    } = this.state;

    event.preventDefault();

    addBallot({
      candidateRanks,
      submittedDate: new Date().valueOf(),
      submitted: true,
      id: shortid.generate(),
      pollId,
      voterName,
    });

    this.setState({ voterName: '' });
    this.updateShuffledCandidatesFromProps({ nextProps: this.props, forceUpdate: true });
  }

  render() {
    const { activePoll } = this.props;
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

export default Ballot;
