import React, { useContext } from 'react';
import {
    Text,
    View,
} from 'react-native';
import TasksContext from '../../contexts/TasksContext';

function TaskList({ navigation }) {
    const tasksContext = useContext(TasksContext);

    return (
        <View>
            {tasksContext.tasks.map(task =>
                <View key={task.id}>
                    <Text>{task.description}</Text>
                </View>
            )}
        </View>
    );
}

export default TaskList;
