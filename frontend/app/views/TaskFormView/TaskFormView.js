import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    DatePickerAndroid,
    TouchableOpacity,
    Alert,
    Button,
    ActivityIndicator,
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
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { googleVisionUrl } from '../../util/config';
import AuthenticationContext from '../../contexts/AuthenticationContext';

// Component that renders the task form to create a new task.
// TODO: This could be combined with TaskView.js
function ProjectFormView({ navigation }) {
    // State.
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('Press to select deadline date.');
    // List of user IDs
    const [assignees, setAssignees] = useState([]);
    // Loading indicator for image converter.
    const [loading, setLoading] = useState(false);

    // We create the task through the project provider.
    const context = useContext(TasksContext);
    const { selectedProject: project } = useContext(ProjectContext);
    const { user } = useContext(AuthenticationContext);

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
        };

        // Project information is valid.
        if (formValidators.taskIsValid(task)) {
            const creationSuccessful = await context.createTask(task, assignees);
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

    const addAssignee = (userId) => {
        // Only administrator can add
        if (project.owner === user.id) {
            // Cannot add the same user twice
            if (assignees.indexOf(userId) === -1) {
                setAssignees(prevState => [...prevState, userId]);
            }
        }
    };

    const handleImageConversion = () => {
        const options = {
            title: 'Select project icon',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        // Get the local image URI.
        ImagePicker.launchImageLibrary(options, async response => {
            if (!response.didCancel && !response.error) {
                const uri = response.uri;

                try {
                    setLoading(true);
                    // Encode the string to base-64 locally.
                    const stats = await RNFetchBlob.fs.stat(uri);
                    const base64 = await RNFetchBlob.fs.readFile(stats.path, 'base64');

                    // Construct the Google Vision API request.
                    const body = {
                        requests: [
                            {
                                features: [
                                    {
                                        type: 'TEXT_DETECTION',
                                    },
                                ],
                                image: {
                                    content: base64.toString(),
                                },
                            },
                        ],
                    };

                    // Make the Google Vision API request.
                    const res = await axios.post(
                        googleVisionUrl, body,
                        {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                        }
                    );

                    // Get the response and set the description.
                    if (res.status === 200) {
                        const text = res.data.responses[0].textAnnotations[0].description;
                        setDescription(text);
                    } else {
                        Alert.alert('Failed to convert image to task.');
                    }
                } catch (error) {
                    Alert.alert('Failed to convert image to task.');
                } finally {
                    setLoading(false);
                }
            } else {
                console.log('Image picking failed: ', response);
            }
        });
    };

    return (
        <View style={styles.outerContainer}>
            <Header
                containerStyle={styles.header}
                centerComponent={{
                    text: 'Project: ' + project.name,
                    style: { color: '#fff', top: -10 },
                }}
            />
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>New task</Text>
                    <TextInput
                        value={description}
                        placeholder="Description"
                        onChangeText={text => setDescription(text)} />
                </View>
                <View style={styles.converterContainer}>
                    <Button title="Or convert from image"
                        onPress={handleImageConversion} />
                    {loading &&
                    <ActivityIndicator />}
                </View>
                <View>
                    <Text style={styles.label}>Deadline</Text>
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
                        <Text style={styles.label}>Assigned to</Text>
                        <UserPicker defaultLabel={project.owner === user.uid
                    ? 'Add assignee' : 'View assignees'}
                            onSelectCallback={addAssignee}
                            projectId={project.id} />
                        <UserList displayUsers={assignees} />
                    </View>}
                <View style={styles.saveButton}>
                    <Button title="Save"
                        onPress={handleSavePress} />
                </View>
            </View>
        </View>
    );
}

export default withNavigation(ProjectFormView);
