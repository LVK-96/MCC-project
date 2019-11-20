import {
    createStackNavigator,
} from 'react-navigation-stack';
import TaskList from '../views/TaskList';

/* Navigator for task related screens (new task form, tasks list,
    single task view) */
export default createStackNavigator({
    TaskList: TaskList,
}, {
    headerMode: 'none',
});
