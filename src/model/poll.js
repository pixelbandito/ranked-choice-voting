import PropTypes from 'prop-types';
import shortid from 'shortid';

import { propTypes as candidatePropTypes } from './candidate';

export const defaultProps = {
  candidates: [],
  dateCreated: new Date(0).valueOf(),
  dateUpdated: new Date(0).valueOf(),
  enabled: false,
  id: '',
  name: '',
};

export const generatePoll = (poll) => ({
  ...defaultProps,
  dateCreated: new Date().valueOf(),
  dateUpdated: new Date().valueOf(),
  id: shortid.generate(),
  ...poll,
});

export const propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.shape(candidatePropTypes)).isRequired,
  dateCreated: PropTypes.number.isRequired,
  dateUpdated: PropTypes.number.isRequired,
  enabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default {
  defaultProps,
  generatePoll,
  propTypes,
};
