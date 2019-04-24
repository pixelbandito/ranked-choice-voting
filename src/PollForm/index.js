import React, { Component } from 'react';
import shortid from 'shortid';

export class Form extends Component {
   state = {
    polls: {},
    newCandidateName: '',
  }

  componentDidMount() {
    const { polls: nextPolls } = this.props;
    const { polls: prevPolls } = this.state;

    this.updatePolls({
      nextPolls,
      prevPolls,
    });
  }

  componentDidUpdate(prevProps) {
    const { polls: nextPolls } = this.props;
    const { polls: prevPolls } = prevProps;

    this.updatePolls({
      nextPolls,
      prevPolls,
    });
  }

  updatePolls = ({
    nextPolls,
    prevPolls,
  }) => {
    if (nextPolls && JSON.stringify(prevPolls) !== JSON.stringify(nextPolls)) {
      this.setState({ polls: nextPolls });
    }
  }

  getCandidateById = ({ candidateId, candidates }) => candidates.find(candidate => candidate.id === candidateId)
  getCandidateByName = ({ candidateName, candidates }) => candidates.find(candidate => candidate.name === candidateName)

  getAddCandidateDisabled = () => {
    const { candidates } = this.props.activePoll;
    const { newCandidateName } = this.state;

    return !newCandidateName || this.getCandidateByName({
      candidateName: newCandidateName,
      candidates,
    });

  }

  submitAddCandidateForm = (event) => {
    event.stopPropagation();
    event.preventDefault();
    return this.addCandidate();
  }

  addCandidate = () => {
    const {
      activePoll,
      setPoll,
    } = this.props;

    const { newCandidateName } = this.state;

    if (this.getAddCandidateDisabled()) {
      return;
    }

    this.setState({
      newCandidateName: '',
    })

    setPoll({
      ...activePoll,
      candidates: [
        ...activePoll.candidates,
        {
          name: newCandidateName,
          id: shortid.generate(),
        },
      ]
    });
  }

  changeNewCandidateNameInput = (event) => {
    const newCandidateName = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      newCandidateName,
    }));
  };

  submitForm = (event) => {
    const { setPolls } = this.props;
    const { polls } = this.state;
    setPolls(polls);
    event.preventDefault();
  }

  renderNewCandidateForm = () => {
    const { newCandidateName } = this.state;

    return (
      <li key="newCandidate">
        <form
          disabled={this.getAddCandidateDisabled()}
          onSubmit={this.submitAddCandidateForm}
        >
          <label htmlFor="newCandidate">
            New candidate
          </label>
          <input
            id="newCandidate"
            placeholder="Candidate name"
            type="text"
            value={newCandidateName}
            onChange={this.changeNewCandidateNameInput}
          />
          <button disabled={this.getAddCandidateDisabled()}>
            Add candidate
          </button>
        </form>
      </li>
    );
  }

  handleChangeCandidateNameInput = (prevCandidate) => (event) => {
    const { activePoll: { candidates } } = this.props;
    const nextCandidateName = event.target.value;

    if (!nextCandidateName || this.getCandidateByName({
      candidates,
      candidateName: nextCandidateName,
    })) {
      return;
    }

    this.setState((prevState) => {
      const { activePoll } = this.props;
      const { polls: prevPolls } = prevState;
      const { candidates: prevCandidates } = activePoll;

      const nextCandidates = [...prevCandidates];

      nextCandidates.splice(prevCandidates.indexOf(prevCandidate), 1, {
        ...prevCandidate,
        name: nextCandidateName,
      });

      return ({
        polls: {
          ...prevPolls,
          [activePoll.id]: {
            ...activePoll,
            candidates: nextCandidates,
          },
        },
      });
    });

    event.stopPropagation();
  }

  renderCandidates = () => {
    debugger;
    const { activePoll } = this.props;
    const { candidates } = activePoll;

    const currentCandidates = candidates.map(candidate => (
      <li key={candidate.id}>
        <label htmlFor={candidate.id}>
          Candidate
        </label>
        <input
          id={candidate.id}
          onChange={this.handleChangeCandidateNameInput(candidate)}
          placeholder="Candidate name"
          type="text"
          value={candidate.name}
        />
      </li>
    ));

    return [
      ...currentCandidates,
      this.renderNewCandidateForm()
    ];
  }

  handleChangePollNameInput = (event) => {
    const { activePoll } = this.props;
    const { polls } = this.state;
    const nextName = event.target.value || activePoll.name;

    this.setState(prevState => ({
      polls: {
        ...polls,
        [activePoll.id]: {
          ...activePoll,
          name: nextName,
        },
      },
    }));
  }

  handleChangeEnabledCheckbox = (event) => {
    const { activePoll } = this.props;
    const enabled = event.target.checked;

    this.setState(prevState => ({
      polls: {
        ...prevState.polls,
        [activePoll.id]: {
          ...activePoll,
          enabled,
        },
      },
    }));
  }

  render() {
    const { activePoll } = this.props;

    const {
      enabled,
      name,
    } = activePoll;

    return (
      <div>
        <label htmlFor="pollSelect">
          Select poll
        </label>
        <select
          id="pollSelect"
          onChange={this.handleChangePollSelect}
          defaultValue="placeholder"
        >
          <option
            disabled
            value="placeholder"
          >
            Select a poll
          </option>
          <option
            value="create"
          >
            Create a new poll
          </option>
        </select>
        <form onSubmit={this.submitForm}>
          <h1>
            Poll
          </h1>
          <section>
            <label htmlFor="name">
              Poll name
            </label>
            <input
              type="text"
              onChange={this.handleChangePollNameInput}
              value={name}
            />
          </section>
          <section>
            <ul>
              {this.renderCandidates()}
            </ul>
          </section>
          <section>
            <label htmlFor="toggleEnabled">
              <input
                id="toggleEnabled"
                onChange={this.handleChangeEnabledCheckbox}
                type="checkbox"
                checked={enabled}
              />
                Enable
            </label>
          </section>
          <button type="button">
            Cancel
          </button>
          <button type="submit">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
