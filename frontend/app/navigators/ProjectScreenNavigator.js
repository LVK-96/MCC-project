import {
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import ProjectTasks from '../views/ProjectTasks';
import ProjectPictures from '../views/ProjectPictures';
import ProjectFiles from '../views/ProjectFiles';

/*Navigator for all the screens that are related to an individual project.*/
export default createMaterialTopTabNavigator({
  Tasks: ProjectTasks,
  Pictures: ProjectPictures,
  Files: ProjectFiles,
});
