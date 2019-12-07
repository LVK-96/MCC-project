import React, { useContext } from 'react';
import {
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import TasksContext from '../../contexts/TasksContext';
import AuthenticationContext from '../../contexts/AuthenticationContext';
import ProjectContext from '../../contexts/ProjectContext';
import styles from './styles';
import TaskPreview from '../TaskPreview';
import colors from '../../values/colors';
import PlusIcon from '../PlusIcon';

/*Shows a list of previews of tasks. The user can click the tasks
  to edit their details or mark them as done.*/
function TaskList({ navigation }) {
    const { tasks, selectTask } = useContext(TasksContext);

    const authenticationContext = useContext(AuthenticationContext);
    const projectContext = useContext(ProjectContext);

    // Sets the selected task and changes to task view.
    const viewTask = (taskId) => {
      if (selectTask(taskId)) {
        navigation.navigate('TaskView');
      }
    };

    const header = (
      <Text style={styles.headerText}>
        Project tasks
      </Text>
    );

    const contentArea = tasks ? (
        <ScrollView style={styles.tasksContainer}>
          {header}
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
          {<View style={styles.tasksBottom}/>}
        </ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.corporateBlue}/>
        </View>
      );

      if (authenticationContext.user.uid === projectContext.selectedProject.owner) {
        return (
          <View style={styles.container}>
            {contentArea}
            <TouchableOpacity onPress={() => navigation.navigate('TaskForm')}
              style={styles.createTaskButtonContainer}>
              <PlusIcon />
            </TouchableOpacity>
          </View>
        );
      }

      return (
        <View style={styles.container}>
          {contentArea}
        </View>
      );
}

export default TaskList;
