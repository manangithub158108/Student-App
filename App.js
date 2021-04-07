import React, {Component} from 'react';
import { Image } from 'react-native';
import {Text, View} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AddAssignments from './Screens/AddAssignments';
import AddClass from './Screens/AddClass';
import AddNotes from './Screens/AddNotes';
import customSideBar from './Screens/customSideBar';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import Notifications from './Screens/Notifications';
import Settings from './Screens/Settings';
import SignupScreen from './Screens/SignupScreen';
import AssignmentDetailsScreen from './UserDetailsScreen/AssignmentDetailsScreen';
import ClassDetailsScreen from './UserDetailsScreen/ClassDetailsScreen';
import NotesDetailsScreen from './UserDetailsScreen/NotesDetailsScreen';

export default class App extends Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const UserAuth = createBottomTabNavigator({
  LoginScreen : {
    screen : LoginScreen,
    navigationOptions : {
      tabBarLabel : 'Login Screen',
      tabBarIcon : <Image source = {require('./Screens/Images/loginIcon.png')} style = {{
        width : 30,
        height : 30
      }}></Image>
    }
  },

  SignupScreen : {
    screen : SignupScreen,
    navigationOptions : {
      tabBarLabel : 'Signup Screen',
      tabBarIcon : <Image source = {require('./Screens/Images/SignupIcon.png')} style = {{
        width : 30,
        height : 30
      }}></Image>
    }
  }
})

const DrawerNavigator = createDrawerNavigator({
  HomeScreen : {
    screen : HomeScreen,
    navigationOptions : {
      drawerLabel : 'Home'
    }
  },
  AddNotes : {
    screen : AddNotes,
    navigationOptions : {
      drawerLabel : 'Add notes'
    }
  },
  AddClass : {
    screen : AddClass,
    navigationOptions : {
      drawerLabel : 'Add classes'
    }
  },
  AddAssignments : {
    screen : AddAssignments,
    navigationOptions : {
      drawerLabel : 'Add assignments'
    }
  },
  Notifications : {
    screen : Notifications,
    navigationOptions : {
      drawerLabel : 'Notifications'
    }
  },
  Settings : {
    screen : Settings,
    navigationOptions : {
      drawerLabel : 'Settings'
    }
  }

},
{
  initialRouteName : 'HomeScreen',
},
{
  contentComponent : customSideBar
})

const SwitchNavigator = createSwitchNavigator({
  UserAuth : {
    screen : UserAuth
  },
  DrawerNavigator : {
    screen : DrawerNavigator
  },
  ClassDetailsScreen : {
    screen : ClassDetailsScreen
  },
  NotesDetailsScreen : {
    screen : NotesDetailsScreen
  },
  AssignmentDetailsScreen : {
    screen : AssignmentDetailsScreen
  }
});

const AppContainer = createAppContainer(SwitchNavigator);