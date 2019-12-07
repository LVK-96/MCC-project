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
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import UUIDGenerator from 'react-native-uuid-generator';
import storage from '@react-native-firebase/storage';
import axios from 'axios';

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
                    // Upload the image to firebase storage
                    // and get the URL
                    // const stats = await RNFetchBlob.fs.stat(uri);
                    // const storageRef = storage().ref();
                    // const format = stats.path.split('.').reverse()[0];
                    // const iconRef = storageRef.child(`taskImages/${await UUIDGenerator.getRandomUUID()}.${format}`);
                    // await iconRef.putFile(stats.path);
                    // const path = iconRef.toString();
                    const stats = await RNFetchBlob.fs.stat(uri);
                    const base64 = await RNFetchBlob.fs.readFile(stats.path, 'base64');

                    // Make the Google Vision API request.
                    const body = {
                        "requests": [
                          {
                            "features": [
                              {
                                "type": "TEXT_DETECTION"
                              }
                            ],
                            "image": {
                              "content": base64.toString()
                            }
                          }
                        ]
                      }
                    const key = "AIzaSyCrywTxXbwLS6kl1rciQHLCJ8cIeVr-DE4"
                    let response = await axios.post(
                        'https://vision.googleapis.com/v1/images:annotate?key=' +
                            key,
                            body,
                        {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                        }
                    );
                    if (response.status === 200) {
                        const text = response.data.responses[0].textAnnotations[0].description;
                        setDescription(text);
                    }
                } catch (error) {
                    console.log("Error", error)
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
                <Button title="Convert from image"
                    onPress={handleImageConversion}/>
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
                        <UserPicker defaultLabel={'Add assignee'}
                            onSelectCallback={addAssignee}/>
                        <UserList displayUsers={assignees}/>
                </View>}
                <View style={styles.saveButton}>
                    <Button title="Save"
                        onPress={handleSavePress}/>
                </View>
            </View>
        </View>
    );
}

export default withNavigation(ProjectFormView);
