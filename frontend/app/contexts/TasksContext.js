import React from 'react';

/* Context for providing task related functionality. Note that the state
in this context is always associated with exactly one project. */
const TasksContext = React.createContext(null);

export default TasksContext;
