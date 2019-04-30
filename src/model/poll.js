import shortid from 'shortid';

export const defaultPoll = {
  candidates: [],
  dateCreated: new Date(0).valueOf(),
  dateEnabled: new Date(0).valueOf(),
  dateUpdated: new Date(0).valueOf(),
  enabled: false,
  id: '',
  name: '',
};

export const generatePoll = ({ poll }) => ({
  ...defaultPoll,
  dateCreated: new Date().valueOf(),
  dateEnabled: new Date().valueOf(),
  dateUpdated: new Date().valueOf(),
  id: shortid.generate(),
  ...poll,
});

export default {
  defaultPoll,
  generatePoll,
};
