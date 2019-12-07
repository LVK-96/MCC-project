import React, { useContext } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
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
import PlusIcon from '../PlusIcon';

/*A component that shows a list of previews of projects.
  The filter prop selects whether to filter the projects by date,
  favorite-status, or by upcoming deadlines.*/
function ProjectList({
  filter,
  navigation,
  searchParam, // This is passed from the ProjectSearch view
}) {
  const {
    projects,
    selectProject
  } = useContext(ProjectContext);
  const headerText = (filter === 'favorite') ? 'Favorite projects'
                   : (filter === 'date') ? 'All projects'
                   : (filter === 'upcomingDeadline') ? 'Projects with upcoming deadlines'
                   : (filter === 'name') ? 'Search by name'
                   : (filter === 'keyword') ? 'Search by keyword'
                   : '';
  const favorites = projects && projects
    .filter(({ favorite }) => favorite)
    .sort((a, b) => a.name.localeCompare(b.name));
  const byDate = projects && [...projects]
    .sort((a,b) => compareDates(a.modified, b.modified));
  const byUpcomingDeadline = projects && projects
    .filter(({ deadline }) => dateIsWithinAWeek(deadline))
    .sort((a, b) => compareDates(a.deadline, b.deadline));
  const byName = projects && (filter === 'name' && searchParam) ? projects
    .filter(p => p.name.includes(searchParam))
    : [];
  const byKeyword = projects && (filter === 'keyword' && searchParam) ? projects
    .filter(p => p.keywords.includes(searchParam))
    : [];
  const selectedProjects = (filter === 'favorite') ? favorites
                         : (filter === 'date') ? byDate
                         : (filter === 'upcomingDeadline') ? byUpcomingDeadline
                         : (filter === 'name') ? byName
                         : (filter === 'keyword') ? byKeyword
                         : undefined;
  const viewProject = async (projectId) => {
    const selected = await selectProject(projectId);
    if (selected && navigation) {
      navigation.navigate("Project");
    }
  };

  const header = (
    <Text style={styles.headerText}>
      {headerText}
    </Text>
  );

  const contentArea = selectedProjects ? (
    <ScrollView style={styles.projectsContainer}>
      {header}
      {selectedProjects.map(project =>
        <ProjectPreview
          key={project.id}
          onPress={() => viewProject(project.id)}
          {...project}
        />
      )}
      {<View style={styles.projectsBottom}/>}
    </ScrollView>
  ) : (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.corporateBlue}/>
    </View>
  );

  return (
    <View style={styles.container}>
      {contentArea}
      <TouchableOpacity onPress={() => navigation.navigate('ProjectForm')}
        style={styles.createProjectButtonContainer}>
        <PlusIcon />
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(ProjectList);
