import React, { Component } from 'react';
import shortid from 'shortid';

class Form extends Component {
  getCandidateById = ({ candidateId, candidates }) => candidates.find(candidate => candidate.id === candidateId)
  getCandidateByName = ({ candidateName, candidates }) => candidates.find(candidate => candidate.name === candidateName)

  getAddCandidateDisabled = () => {
    const {
      activePoll: { candidates },
      newCandidateName,
    } = this.props;

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
      newCandidateName,
      onChangeNewCandidateName,
      onChangePoll,
    } = this.props;

    if (this.getAddCandidateDisabled()) {
      return;
    }

    onChangeNewCandidateName('');

    onChangePoll({
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

  handleChangeNewCandidateNameInput = (event) => {
    const { onChangeNewCandidateName } = this.props;
    const newCandidateName = event.target.value;

    onChangeNewCandidateName(newCandidateName);
  };

  handleCancelForm = (event) => {
    const {
      revertPoll,
    } = this.props;

    revertPoll();
    event.preventDefault();
  }

  handleSubmitForm = (event) => {
    const {
      activePoll,
      onSubmitPoll,
    } = this.props;

    onSubmitPoll(activePoll);
    event.preventDefault();
  }

  renderNewCandidateForm = () => {
    const { newCandidateName } = this.props;

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
            onChange={this.handleChangeNewCandidateNameInput}
          />
          <button disabled={this.getAddCandidateDisabled()}>
            Add candidate
          </button>
        </form>
      </li>
    );
  }

  handleChangeCandidateNameInput = (prevCandidate) => (event) => {
    const {
      activePoll,
      onChangePoll,
    } = this.props;

    const { candidates } = activePoll;
    const nextCandidateName = event.target.value;

    if (!nextCandidateName || this.getCandidateByName({
      candidates,
      candidateName: nextCandidateName,
    })) {
      return;
    }

    const nextCandidates = [...candidates];

    nextCandidates.splice(candidates.indexOf(prevCandidate), 1, {
      ...prevCandidate,
      name: nextCandidateName,
    });

    onChangePoll({
      ...activePoll,
      candidates: nextCandidates,
    });

    event.stopPropagation();
  }

  renderCandidates = () => {
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
    const {
      activePoll,
      onChangePoll,
    } = this.props;

    const nextName = event.target.value || activePoll.name;

    onChangePoll({
      ...activePoll,
      name: nextName,
    });
  }

  handleChangeEnabledCheckbox = (event) => {
    const {
      activePoll,
      onChangePoll,
    } = this.props;

    const enabled = event.target.checked;

    onChangePoll({
      ...activePoll,
      enabled,
    });
  }

  render() {
    const { activePoll } = this.props;

    const {
      enabled,
      name,
    } = activePoll;

    return (
      <div>
        <form id="pollForm" onSubmit={this.handleSubmitForm}>
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
        </form>
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
        <button
          onClick={this.handleCancelForm}
          type="button"
        >
          Cancel
        </button>
        <button
          onClick={this.handleSubmitForm}
          type="button"
        >
          Save
        </button>
      </div>
    );
  }
}



export default Form;
