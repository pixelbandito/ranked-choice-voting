import React from 'react';
import { shallow } from 'enzyme';
// import ReactDOM from 'react-dom';
import Results from './Results';
// import renderer from 'react-test-renderer';

import { generateBallot } from '../model/ballot';
import { generateCandidate } from '../model/candidate';
import { generatePoll } from '../model/poll';

const defaultCandidate1 = generateCandidate({
  name: 'Default candidate 1',
});

const defaultCandidate2 = generateCandidate({
  name: 'Default candidate 2',
});

const defaultPoll = generatePoll({
  name: 'Default poll',
  enabled: true,
  candidates: [defaultCandidate1, defaultCandidate2],
});

const defaultBallot1 = generateBallot({
  voterName: 'Default voter',
  enabled: true,
  candidateRanks: [defaultCandidate1.id, defaultCandidate2.id],
});

const defaultBallot2 = generateBallot({
  voterName: 'Default voter 2',
  enabled: true,
  candidateRanks: [defaultCandidate1.id, defaultCandidate2.id],
});

const defaultBallot3 = generateBallot({
  voterName: 'Default voter 3',
  enabled: true,
  candidateRanks: [defaultCandidate2.id, defaultCandidate1.id],
});

const defaultProps = {
  activePoll: {
    [defaultPoll.id]: defaultPoll,
  },
  ballots: {
    [defaultBallot1.id]: defaultBallot1,
    [defaultBallot2.id]: defaultBallot2,
  },
};

describe('<Results/>', () => {
  it('renders', () => {
    shallow(<Results {...defaultProps} />);
  });

  describe('Single round votes', () => {
    const singleRoundBallot1 = {
      ...defaultBallot1,
      candidateRanks: [defaultCandidate1.id],
    };

    const singleRoundBallot2 = {
      ...defaultBallot2,
      candidateRanks: [defaultCandidate1.id],
    };

    const singleRoundBallot3 = {
      ...defaultBallot3,
      candidateRanks: [defaultCandidate2.id],
    };

    const singleRoundProps = {
      ...defaultProps,
      ballots: {
        [defaultBallot1.id]: singleRoundBallot1,
        [defaultBallot2.id]: singleRoundBallot2,
        [defaultBallot3.id]: singleRoundBallot3,
      },
    };

    it('Plurality wins', () => {
      const ballotsArray = Results.getActivePollSortedBallotsArray({
        defaultPoll,
        ballots: singleRoundProps.ballots,
      });

      const results = Results.calculateResults({
        ballotsArray,
        candidates: defaultPoll.candidates,
        winningThreshold: defaultPoll.candidates.length / 2,
      });

      expect(results).toEqual({});
    });

    it('Tie votes result in multiple winners', () => {
    });
  });
});
