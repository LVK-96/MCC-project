import React, { useContext } from 'react';
import {
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import TasksContext from '../../contexts/TasksContext';
import styles from './styles';
import TaskPreview from '../TaskPreview';
import colors from '../../values/colors';
import PlusIcon from '../PlusIcon';

function TaskList({ navigation }) {
    const { tasks } = useContext(TasksContext);

    const viewTask = (taskId) => {

    };

    const contentArea = tasks ? (
        <ScrollView style={styles.tasksContainer}>
          {tasks.map(task =>
            <TaskPreview
              key={task.id}
              onPress={() => viewTask(task.id)}
              task={task}
            />
          )}
        </ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.corporateBlue}/>
        </View>
      );
    
      return (
        <View style={styles.container}>
          <Text>
            Project tasks
          </Text>
          {contentArea}
          <TouchableOpacity onPress={() => navigation.navigate('ProjectForm')}
            style={styles.createProjectButtonContainer}>
            <PlusIcon />
          </TouchableOpacity>
        </View>
      );
}

export default TaskList;
