import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    DatePickerAndroid,
    TouchableOpacity,
    Alert,
    Button,
} from 'react-native';
import {
    Header,
} from 'react-native-elements';
import {
    withNavigation,
} from 'react-navigation';
import styles from './styles';
import TasksContext from '../../contexts/TasksContext';
import ProjectContext from '../../contexts/ProjectContext'
import formValidators from '../../util/formValidators';
import UserPicker from '../UserPicker/UserPicker';
import UserList from '../UserList/UserList';

// Component that renders the task form to create a new task.
// TODO: This could be combined with TaskView.js
function ProjectFormView({ navigation }) {
    // State.
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('Press to select deadline date.');
    // List of user IDs
    const [assignees, setAssignees] = useState([]);

    // We create the task through the project provider.
    const context = useContext(TasksContext);
    const { selectedProject: project } = useContext(ProjectContext);

    const handleDateSelection = async () => {
        try {
            // Get user inputted date from Android datepicker.
            const { action, year, month, day } = await DatePickerAndroid.open();
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = new Date();
                date.setFullYear(year);
                date.setMonth(month);
                date.setDate(day);
                setDeadline(date.toString());
            }
        } catch (error) {
            console.log('Error selecting deadline date', error);
        }
    };

    const handleSavePress = async () => {
        const task = {
            description,
            deadline,
            assignees,
        };

        // Project information is valid.
        if (formValidators.taskIsValid(task)) {
            const creationSuccessful = await context.createTask(task);
            // If project was created succesfully, go back to projects view.
            if (creationSuccessful) {
                navigation.navigate('TaskList');
            } else {
                Alert.alert(
                    'Task creation failed', ''
                );
            }
        }
    };

    // TODO: Disable assignee adding if the
    // logged user isn't the project administrator.
    const addAssignee = (userId) => {
        // Cannot add the same user twice
        if (assignees.indexOf(userId) === -1) {
            setAssignees(prevState => [...prevState, userId]);
        }
    };

    return (
        <View style={styles.outerContainer}>
            <Header
                leftComponent={{ text: '-', style: { color: '#fff' } }}
                centerComponent={{
                    text: project.name,
                    style: { color: '#fff', left: 0 }
                }}
            />
            <View style={styles.container}>
                <View>
                    <Text>New task</Text>
                    <TextInput
                        value={description}
                        placeholder="Description"
                        onChangeText={text => setDescription(text)} />
                </View>
                <View>
                    <Text>Deadline</Text>
                    <TouchableOpacity onPress={handleDateSelection}>
                        <View pointerEvents={'none'}>
                            <TextInput
                                editable={false}
                                value={deadline} />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* We only render the assignees selection if the project
                this task is associated with is a group project. */
                project.type === 'GROUP' &&
                <View>
                    <Text>Assigned to</Text>
                        <UserPicker defaultLabel={'Add assignee'}
                            onSelectCallback={addAssignee}/>
                        <UserList displayUsers={assignees}/>
                </View>}
                <View>
                    <Button title="Save"
                        onPress={handleSavePress}/>
                </View>
            </View>
        </View>
    );
}

export default withNavigation(ProjectFormView);
