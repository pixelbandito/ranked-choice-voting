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
  candidates: [defaultCandidate1, defaultCandidate2],
  enabled: true,
  name: 'Default poll',
});

const defaultBallot1 = generateBallot({
  candidateRanks: [defaultCandidate1.id, defaultCandidate2.id],
  enabled: true,
  pollId: defaultPoll.id,
  voterName: 'Default voter',
});

const defaultBallot2 = generateBallot({
  candidateRanks: [defaultCandidate1.id, defaultCandidate2.id],
  enabled: true,
  pollId: defaultPoll.id,
  voterName: 'Default voter 2',
});

const defaultBallot3 = generateBallot({
  candidateRanks: [defaultCandidate2.id, defaultCandidate1.id],
  enabled: true,
  pollId: defaultPoll.id,
  voterName: 'Default voter 3',
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

    describe('Results.getPollSortedBallotsArray', () => {
      it('gets ballots array', () => {
        const ballotsArray = Results.getPollSortedBallotsArray({
          poll: defaultPoll,
          ballots: singleRoundProps.ballots,
        });

        expect(ballotsArray).toHaveLength(3);
        expect(ballotsArray).toEqual(expect.arrayContaining());
      });

      it('should sort array', () => {});

      it('should only return ballots for the given poll', () => {});
    });

    describe('Results.calculateResults', () => {});
    it('Plurality wins', () => {
      const ballotsArray = Results.getPollSortedBallotsArray({
        poll: defaultPoll,
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
