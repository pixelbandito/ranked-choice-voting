import React, { useState } from 'react';

import ActivePollIdContext from '../model/ActivePollIdContext';

const ActivePollIdProvider = ({ children, ...passedProps}) => {
  const { polls } = passedProps;
  const [activePollId, setActivePollId] = useState();

  if (!activePollId) {
    const sortedPolls = Object.values(polls);
    sortedPolls.sort((a, b) => (a.dateUpdated > b.dateUpdated && -1) || (a.dateUpdated > b.dateUpdated && 1) || 0);
    const newestPollId = sortedPolls.length > 0 ? sortedPolls[0].id : null;
    setActivePollId(newestPollId);
  }

  console.log(React.Children.map(children, child => console.log(child)));

  return (
    <ActivePollIdContext.Provider value={activePollId}>
      {React.Children.map(children, child => !React.isValidElement(child)
        ? child
        : React.cloneElement(child, {
          ...passedProps,
          setActivePollId,
        })
      )}
    </ActivePollIdContext.Provider>
  );
};

export default ActivePollIdProvider;
