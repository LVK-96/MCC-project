import React, { useState, useEffect } from 'react';
import projectService from '../services/projectService';
import TasksContext from '../contexts/TasksContext';

const mockTasks = [
    {
        id: 0,
        description: 'Task 1 description',
        status: 'PENDING',
        deadline: '2014-01-01T23:28:56.782Z',
    },
    {
        id: 1,
        description: 'Task 2 description',
        status: 'ON_GOING',
        deadline: '2014-01-01T23:28:56.782Z',
    },
    {
        id: 2,
        description: 'Task 3 description',
        status: 'PENDING',
        deadline: '2014-01-01T23:28:56.782Z',
    },
];

/* Context provider for the tasks. This provider handles logic
(fetching, creating, selecting) related to project tasks. */
function TasksProvider({ children, projectId }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const fetched = await projectService.getTasksByProjectId(projectId);
            // Set to mock tasks if fetch fails.
            setTasks(fetched ? fetched : mockTasks);
        };

        getTasks();
    // We want to run the effect every time the context's
    // projectId changes.
    }, [projectId]);

    const contextValue = { tasks };

    return (
        <TasksContext.Provider value={contextValue}>
            {children}
        </TasksContext.Provider>
    );
}

export default TasksProvider;
