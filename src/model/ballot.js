import shortid from 'shortid';

export const defaultBallot = {
  candidateRanks: [],
  dateSubmitted: new Date(0).valueOf(),
  id: '',
  pollId: '',
  submitted: false,
  voterName: ''
};

export const generateBallot = ({ ballot }) => ({
  ...defaultBallot,
  dateSubmitted: new Date().valueOf(),
  id: shortid.generate(),
  pollId: shortid.generate(),
  ...ballot,
});

export default {
  defaultBallot,
  generateBallot,
};
