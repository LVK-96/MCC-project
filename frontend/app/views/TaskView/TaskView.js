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

function TaskView() {
    const { selectedProject } = useContext(ProjectContext);
    const { selectedTask: task } = useContext(TasksContext);

    if (task === null) {
        return (
            <ActivityIndicator />
        );
    }

    return (
        <View>
            <View>
                <Text>Task description</Text>
                <TextInput value={task.description}/>
            </View>
            <View>
                <Text>Task status</Text>
                <TextInput value={task.status}/>
            </View>
            <View>
                <Text>Task deadline</Text>
                <TextInput value={task.deadline}/>
            </View>
            {/* We only render the assignees selection if the project
            this task is associated with is a group project. */
            selectedProject.type === 'GROUP' &&
            <View>
                <Text>Task assignees</Text>
            </View>}
        </View>
    );
}

export default withNavigation(TaskView);
