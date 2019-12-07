import React, { useState, useEffect } from 'react';
import TasksContext from '../contexts/TasksContext';
import taskService from '../services/taskService';

export const mockTasks = [
    {
        id: 0,
        description: 'Task 1 description',
        status: 'PENDING',
        deadline: '2014-01-01T23:28:56.782Z',
        assignees: [],
        project: 100,
        created: '2014-01-01T23:28:56.782Z',
    },
    {
        id: 1,
        description: 'Task 2 description',
        status: 'ON_GOING',
        deadline: '2014-01-01T23:28:56.782Z',
        assignees: [],
        project: 100,
        created: '2014-01-01T23:28:56.782Z',
    },
    {
        id: 2,
        description: 'Task 3 description',
        status: 'PENDING',
        deadline: '2014-01-01T23:28:56.782Z',
        assignees: [],
        project: 101,
        created: '2014-01-01T23:28:56.782Z',
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
        const response = await taskService.updateTask(projectId, id, task);
        if (response) {
            const updated = tasks.map(t => t.id === id ? response : t);
            setTasks(updated);

            // Update the selected task if this was it.
            if (id === selectedTask.id) {
                // TODO: Use actual response object
                setSelectedTask(response);
            }

            return true;

        // TODO: Handle actual failure, now update always fails
        // because it doesn't use a real back-end endpoint.
        } else {
            // Update the selected task if this was it.
            if (selectedTask && id === selectedTask.id) {
                // TODO: Use actual response object
                setSelectedTask(task);
            }

            const updated = tasks.map(t => t.id === id ? task : t);
            setTasks(updated);

            return true;
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

    // Updates a field in the selected task. This is
    // necessary in the task view.
    const setSelectedTaskField = (field, value) => {
        if (selectedTask != null) {
            setSelectedTask(prevState => ({
                ...prevState,
                [field]: value,
            }));
        }
    };

    // Creates a task for the selected project.
    // Returns whether creation was successful.
    const createTask = async (task) => {
        try {
            const created = await taskService.createTask(projectId, task);
            setTasks(prev => [...prev, created]);
            return true;
        } catch (error) {
            return false;
        }
    };

    const updateStatus = async (task, status) => {
        try {
            const updated = await taskService.updateTaskStatus(projectId, task.id, status);
            // TODO: Remove this.
            if (updated === null) {
                task.status = status;
            }
            // Update tasks
            const updatedTasks = tasks.map(t => t.id === task.id ? updated : t);
            setTasks(updatedTasks);

            // Update selected task
            if (selectedTask && task.id === selectedTask.id) {
                setSelectedTask(updated);
            }

            return true;
        } catch (error) {
            return false;
        }
    }

    const contextValue = {
        tasks,
        updateTask,
        updateStatus,
        createTask,
        selectTask,
        selectedTask,
        setSelectedTaskField,
    };

    return (
        <TasksContext.Provider value={contextValue}>
            {children}
        </TasksContext.Provider>
    );
}

export default TasksProvider;
