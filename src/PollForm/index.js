import React from 'react';

import PollForm from './Form';
import PollFormProvider from './Provider';

const ConnectedPollForm = (props) => <PollFormProvider {...props} ><PollForm /></PollFormProvider>;

export default ConnectedPollForm;
