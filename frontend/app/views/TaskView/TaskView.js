import React, { useContext } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import ProjectContext from '../../contexts/ProjectContext';
import TasksContext from '../../contexts/TasksContext';
import { withNavigation } from 'react-navigation';
import styles from './styles';

function TaskView() {
    const { selectedProject } = useContext(ProjectContext);
    const { selectedTask: task } = useContext(TasksContext);

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
                    <TextInput value={task.description}/>
                </View>
                <View>
                    <Text style={styles.label}>Task status</Text>
                    <TextInput value={task.status}/>
                </View>
                <View>
                    <Text style={styles.label}>Task deadline</Text>
                    <TextInput value={task.deadline}/>
                </View>
                {/* We only render the assignees selection if the project
                this task is associated with is a group project. */
                selectedProject.type === 'GROUP' &&
                <View>
                    <Text style={styles.label}>Task assignees</Text>
                </View>}
            </View>
        </View>
    );
}

export default withNavigation(TaskView);
