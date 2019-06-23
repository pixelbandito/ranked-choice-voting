import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { generatePoll } from '../../model/poll';
import ActivePollIdContext from '../../model/ActivePollIdContext';

class Provider extends Component {
  state = {
    activePoll: null,
    newCandidateName: '',
    prevContext: this.context,
  }

  // Take poll provided, wrap in partially controlled thingy
  componentDidMount() {
    this.updateActivePoll({
      activePollId: this.context,
      prevActivePollId: null,
      prevProps: {},
      props: this.props,
    });
  }

  componentDidUpdate(prevProps) {
    const { prevContext } = this.state;

    if (this.context !== prevContext) {
      this.updateActivePoll({
        activePollId: this.context,
        prevActivePollId: prevContext,
        prevProps,
        props: this.props,
      });
    }
  }

  updateActivePoll = ({
    activePollId,
    prevActivePollId,
    props: {
      polls: nextPolls,
    },
    prevProps: {
      polls: prevPolls,
    },
  }) => {
    // If there's a props-based active poll, make a copy of it in state for the form to use.
    // Otherwise, make a new poll.

    if (nextPolls && nextPolls[activePollId]) {
      const nextActivePoll = nextPolls[activePollId];

      // This should never happen on mount
      if (!nextActivePoll) {
        throw new Error('Couldn\'t find your poll in the list');
      }

      return this.setState({
        activePoll: { ...nextActivePoll },
        prevContext: this.context,
      });
    }

    const nextActivePoll = generatePoll();

    return this.setState({
      activePoll: nextActivePoll,
      prevContext: this.context,
    });
  }

  handleSubmitPoll = () => {
    const {
      setActivePollId,
      setPoll,
    } = this.props;

    const { activePoll } = this.state;
    setPoll(activePoll);
    setActivePollId(activePoll.id);
  }

  handleChangeNewCandidateName = (newCandidateName) => {
    return this.setState({ newCandidateName });
  }

  handleChangePoll = (poll) => this.setState({ activePoll: {
    ...poll,
    dateUpdated: new Date().valueOf(),
  }});

  render() {
    const {
      children,
      polls,
      ...passedProps
    } = this.props;

    const {
      activePoll,
      newCandidateName,
    } = this.state;

    if (!activePoll || (Object.entries(activePoll).length === 0 && activePoll.constructor === Object)) {
      return null;
    }

    return (
      <React.Fragment>
        {React.Children.map(children, child => !React.isValidElement(child)
          ? child
          : React.cloneElement(child, {
            ...passedProps,
            activePoll,
            newCandidateName,
            onRevertPoll: this.handleRevertPoll,
            onChangeNewCandidateName: this.handleChangeNewCandidateName,
            onChangePoll: this.handleChangePoll,
            onSubmitPoll: this.handleSubmitPoll,
          })
        )}
      </React.Fragment>
    );
  }
}

Provider.contextType = ActivePollIdContext;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  polls: PropTypes.object.isRequired,
  setActivePollId: PropTypes.func.isRequired,
  setPoll: PropTypes.func.isRequired,
};

export default Provider;
