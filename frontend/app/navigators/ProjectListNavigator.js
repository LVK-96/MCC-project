import React from 'react';
import {
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import ProjectList from '../views/ProjectList';
import ProjectSearch from '../views/ProjectSearch';
import SearchIcon from '../views/SearchIcon';

function DateList() {
  return <ProjectList filter="date"/>;
}

function FavoriteList() {
  return <ProjectList filter="favorite"/>;
}

function UpcomingDeadlineList() {
  return <ProjectList filter="upcomingDeadline"/>;
}

/*This is a tab-controlled navigator that allows the user to choose
  between the different filters of project lists.*/
export default createMaterialTopTabNavigator({
  Favorite: FavoriteList,
  Date: DateList,
  UpcomingDeadline: UpcomingDeadlineList,
  Search: {
    screen: ProjectSearch,
    navigationOptions: {
      tabBarLabel: <SearchIcon />,
    },
  },
});
