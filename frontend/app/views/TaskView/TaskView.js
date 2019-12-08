import React, { useContext } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    TextInput,
    Picker,
    TouchableOpacity,
    DatePickerAndroid,
} from 'react-native';
import ProjectContext from '../../contexts/ProjectContext';
import TasksContext from '../../contexts/TasksContext';
import { withNavigation } from 'react-navigation';
import styles from './styles';
import UserPicker from '../UserPicker/UserPicker';
import UserList from '../UserList/UserList';
import AuthenticationContext from '../../contexts/AuthenticationContext';

function TaskView() {
    const { selectedProject } = useContext(ProjectContext);
    const { user } = useContext(AuthenticationContext);
    const {
        selectedTask: task,
        setSelectedTaskField: setField ,
        updateTask,
        updateStatus,
    } = useContext(TasksContext);

    const handleDateSelection = async () => {
        try {
            // Get user inputted date from Android datepicker.
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

    const addAssignee = (userId) => {
        // Only project administrator can assign tasks
        if (selectedProject.owner === user.uid) {
            // Cannot add the same user twice
            if (task.assignees.indexOf(userId) === -1) {
                updateTask(task.id, { ...task,
                    assignees: [...task.assignees, userId] });
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
                    <UserList displayUsers={task.assignees}/>
                </View>}
            </View>
        </View>
    );
}

export default withNavigation(TaskView);
