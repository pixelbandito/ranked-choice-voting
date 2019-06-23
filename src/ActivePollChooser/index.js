import React from 'react';

import ActivePollIdContext from '../model/ActivePollIdContext';

const ActivePollChooser = ({ polls, setActivePollId }) => {
  const handleChange = ({ target: { value }}) => {
    setActivePollId(value);
  }

  const sortedPolls = Object.values(polls);
  sortedPolls.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ActivePollIdContext.Consumer>
      {activePollId =>
        <select
          onChange={handleChange}
          value={activePollId || '_placeholder'}
        >
          <option value="placeholder" disabled>
            Choose an active poll
          </option>
          {sortedPolls.map(poll => (
            <option
              key={poll.id}
              value={poll.id}
            >
              {poll.name}
            </option>
          ))}
          <option key="create" value="_create">
            Create a new poll
          </option>
        </select>
      }
    </ActivePollIdContext.Consumer>
  );
};

export default ActivePollChooser;
