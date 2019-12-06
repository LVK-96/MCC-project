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
    const { tasks, selectTask } = useContext(TasksContext);

    // Sets the selected task and changes to task view.
    const viewTask = (taskId) => {
      if (selectTask(taskId)) {
        navigation.navigate('TaskView');
      }
    };

    const contentArea = tasks ? (
        <ScrollView style={styles.tasksContainer}>
          {/* Sort tasks by creation date */}
          {tasks.sort((t1, t2) =>
            new Date(t2.created).getTime() - new Date(t1.created).getTime())
            .map(task =>
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
          <TouchableOpacity onPress={() => navigation.navigate('TaskForm')}
            style={styles.createTaskButtonContainer}>
            <PlusIcon />
          </TouchableOpacity>
        </View>
      );
}

export default TaskList;
