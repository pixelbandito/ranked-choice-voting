import React, { Component } from 'react';

export class Results extends Component {
  render() {
    const {
      activePoll: poll,
      ballots,
    } = this.props;

    const sortedBallotsArray = Object.entries(ballots)
      .filter(([id, ballot]) => ballot.pollId === poll.id)
      .sort(([id, ballot], [id2, ballot2]) => ballot.submittedDate > ballot2.submittedDate ? -1 : 1)
      .map(([id, ballot]) => {
        return ballot;
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
              <em>{new Date(ballot.submittedDate).toLocaleString()}</em>
              <br />
              <pre>{JSON.stringify(ballot)}</pre>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Results;
