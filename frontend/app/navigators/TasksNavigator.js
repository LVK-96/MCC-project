import {
    createStackNavigator,
} from 'react-navigation-stack';
import TaskList from '../views/TaskList';
import TaskView from '../views/TaskView';

/* Navigator for task related screens (new task form, tasks list,
    single task view) */
export default createStackNavigator({
    TaskList: TaskList,
    TaskView: TaskView,
}, {
    headerMode: 'none',
});
