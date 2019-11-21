import React, { useState, useEffect } from 'react';
import TasksContext from '../contexts/TasksContext';
import taskService from '../services/taskService';

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
    // Initialize to null to indicate that the tasks haven't been
    // fetched yet.
    const [tasks, setTasks] = useState(null);
    // The task that is currently selected to be viewed.
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const getTasks = async () => {
            const fetched = await taskService.getTasksByProjectId(projectId);
            // Set to mock tasks if fetch fails.
            setTasks(fetched ? fetched : mockTasks);
            // Whenever the tasks are reloaded, the currently
            // selected task should be set to null.
            setSelectedTask(null);
        };
        getTasks();
    // We want to run the effect every time the context's
    // projectId changes.
    }, [projectId]);

    // Updates the task with id 'id' to the value 'task.
    const updateTask = async (id, task) => {
        const response = await taskService.updateTask(id, task);
        if (response) {
            const updated = tasks.map(t => t.id === id ? task : t);
            setTasks(updated);
        // TODO: Handle actual failure, now update always fails
        // because it doesn't use a real back-end endpoint.
        } else {
            const updated = tasks.map(t => t.id === id ? task : t);
            setTasks(updated);
        }
    };

    // Sets the currently selected task to the one specified
    // by taskId, if it exists in local state. Returns a boolean
    // indicating whether the selection was successful.
    const selectTask = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        if (task !== undefined) {
            setSelectedTask(task);
            return true;
        } else {
            return false;
        }
    };

    const contextValue = {
        tasks,
        updateTask,
        selectTask,
        selectedTask,
    };

    return (
        <TasksContext.Provider value={contextValue}>
            {children}
        </TasksContext.Provider>
    );
}

export default TasksProvider;
