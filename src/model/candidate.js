import shortid from 'shortid';

export const defaultCandidate = {
  id: '',
  name: '',
};

export const generateCandidate = ({ candidate }) => ({
  ...defaultCandidate,
  id: shortid.generate(),
  ...candidate,
});

export default {
  defaultCandidate,
  generateCandidate,
};
