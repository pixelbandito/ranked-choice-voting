import PropTypes from 'prop-types';
import shortid from 'shortid';

export const defaultProps = {
  id: '',
  name: '',
};

export const generateCandidate = (candidate) => ({
  ...defaultProps,
  id: shortid.generate(),
  ...candidate,
});

export const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default {
  defaultProps,
  generateCandidate,
  propTypes,
};
