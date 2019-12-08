import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    TextInput,
    Picker,
    TouchableOpacity,
    DatePickerAndroid,
    Alert,
} from 'react-native';
import ProjectContext from '../../contexts/ProjectContext';
import TasksContext from '../../contexts/TasksContext';
import { withNavigation } from 'react-navigation';
import styles from './styles';
import UserPicker from '../UserPicker/UserPicker';
import UserList from '../UserList/UserList';
import AuthenticationContext from '../../contexts/AuthenticationContext';
import taskService from '../../services/taskService';

function TaskView() {
    const { selectedProject } = useContext(ProjectContext);
    const { user } = useContext(AuthenticationContext);
    const {
        selectedTask: task,
        setSelectedTaskField: setField ,
        updateTask,
        updateStatus,
    } = useContext(TasksContext);
    // TODO: This logic could alternatively be handled in
    // TasksProvider
    const [assignees, setAssignees] = useState(null);

    // Re-fetch the assignees whenever the selected task/project changes.
    useEffect(() => {

        async function fetchAssignees(projectId, taskId) {
            const fetched = await taskService.getAssigneesByProjectAndTaskId(projectId, taskId);
            setAssignees(fetched);
        }

        if (task && selectedProject) {
            fetchAssignees(selectedProject.id, task.id);
        }

    }, [task, selectedProject]);

    const handleDateSelection = async () => {
        try {
            // Get user inputted date from Android datepicke    r.
            const { action, year, month, day } = await DatePickerAndroid.open();
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = new Date();
                date.setFullYear(year);
                date.setMonth(month);
                date.setDate(day);
                // Send update request.
                updateTask(task.id, { ...task, deadline: date.toString() });
            }
        } catch (error) {
            console.log('Error selecting deadline date', error);
        }
    };

    const addAssignee = async (userId) => {
        // Only project administrator can assign tasks
        if (selectedProject.owner === user.uid) {
            // Cannot add the same user twice
            if (task.assignees.indexOf(userId) === -1) {
                const assigned = await taskService.addAssigneesToTask(selectedProject.id,
                    task.id, [userId]);

                // Update internal state if successful.
                if (assigned !== null) {
                    setAssignees(prev => [...prev, ...assigned]);
                } else {
                    Alert.alert('Failed to add assignee to task');
                }
            }
        }
    };

    if (task === null) {
        return (
            <ActivityIndicator />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View>
                    <Text style={styles.label}>Task description</Text>
                    <TextInput value={task.description}
                        onChangeText={text => setField('description', text)}
                        // Send an update request only once the user has
                        // finished editing.
                        onEndEditing={() => updateTask(task.id, task)}/>
                </View>
                <View>
                    <Text style={styles.label}>Task status</Text>
                    <Picker selectedValue={task.status}
                        onValueChange={value =>
                        {
                            // This induces a necessary re-render.
                            setField('status', value);
                            updateStatus(task, value);
                        }}>
                        <Picker.Item label="Pending" value="PENDING" />
                        <Picker.Item label="On-going" value="ONGOING" />
                        <Picker.Item label="Completed" value="COMPLETED" />
                    </Picker>
                </View>
                <View>
                    <Text style={styles.label}>Task deadline</Text>
                     <TouchableOpacity onPress={handleDateSelection}>
                        <View pointerEvents={'none'}>
                            <TextInput
                                editable={false}
                                value={task.deadline} />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* We only render the assignees selection if the project
                this task is associated with is a group project. */
                selectedProject.type === 'GROUP' &&
                <View>
                    <Text style={styles.label}>Task assignees</Text>
                    <UserPicker defaultLabel={selectedProject.owner === user.uid
                    ? 'Add assignee' : 'View assignees'}
                        onSelectCallback={addAssignee}
                        projectId={selectedProject.id}/>
                    {assignees === null ?
                    <Text>Failed to fetch task assignees</Text> :
                    assignees.length > 0
                    ? <UserList displayUsers={assignees}/>
                    : <Text>This task is not assigned to any user</Text>}
                </View>}
            </View>
        </View>
    );
}

export default withNavigation(TaskView);
