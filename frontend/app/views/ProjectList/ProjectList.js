import React, { useContext } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  withNavigation,
} from 'react-navigation';
import ProjectContext from '../../contexts/ProjectContext';
import {
  compareDates,
  dateIsWithinAWeek,
} from '../../util';
import ProjectPreview from '../ProjectPreview';
import colors from '../../values/colors';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../Button';
import Icon from 'react-native-vector-icons/AntDesign';

/*A component that shows a list of previews of projects.
  The filter prop selects whether to filter the projects by date,
  favorite-status, or by upcoming deadlines.*/
function ProjectList({
  filter,
  navigation,
}) {
  const {
    projects,
    selectProject
  } = useContext(ProjectContext);
  const headerText = (filter === 'favorite') ? 'Favorite projects'
                   : (filter === 'date') ? 'All projects'
                   : (filter === 'upcomingDeadline') ? 'Projects with upcoming deadlines'
                   : '';
  const favorites = projects && projects
    .filter(({ favorite }) => favorite)
    .sort((a, b) => a.name.localeCompare(b.name));
  const byDate = projects && [...projects]
    .sort((a,b) => compareDates(a.modified, b.modified));
  const byUpcomingDeadline = projects && projects
    .filter(({ deadline }) => dateIsWithinAWeek(deadline))
    .sort((a, b) => compareDates(a.deadline, b.deadline));
  const selectedProjects = (filter === 'favorite') ? favorites
                         : (filter === 'date') ? byDate
                         : (filter === 'upcomingDeadline') ? byUpcomingDeadline
                         : undefined;
  const viewProject = async (projectId) => {
    const selected = await selectProject(projectId);
    if (selected && navigation) {
      navigation.navigate("Project");
    }
  };

  const contentArea = selectedProjects ? (
    <ScrollView style={styles.projectsContainer}>
      {selectedProjects.map(project =>
        <ProjectPreview
          key={project.id}
          onPress={() => viewProject(project.id)}
          {...project}
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
        {headerText}
      </Text>
      {contentArea}
      <TouchableOpacity onPress={() => navigation.navigate('ProjectForm')}>
        <Icon name="pluscircle"
          size={50}
          color="blue"/>
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(ProjectList);
