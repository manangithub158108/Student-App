import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Header, ListItem, Badge} from 'react-native-elements';
import firebase from 'firebase';
import firestore from '../config';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class HomeScreen extends Component{

  state = {
    name : '',
    class_info : [],
    notes_info : [],
    assignments_info : [],
    notification_count : 0,
  }

  componentDidMount = () => {

    const uid = firebase.auth().currentUser.email;

    firestore.collection('users').where('email', '==', uid).get().then((snapshot) => {
      snapshot.docs.map((doc) => {
        var user = doc.data();
        this.setState({
          name : user.name
        })
      })
    })

    firestore.collection('class').where('email', '==', uid).onSnapshot((snapshot) => {
      var class_info = snapshot.docs.map((doc) => doc.data());
      this.setState({
        class_info : class_info
      })
    })

    firestore.collection('notes').where('email', '==', uid).onSnapshot((snapshot) => {
      var notes_info = snapshot.docs.map((doc) => doc.data());
      this.setState({
        notes_info : notes_info
      })
    })

    firestore.collection('assignments').where('email', '==', uid).onSnapshot((snapshot) => {
      var assignments_info = snapshot.docs.map((doc) => doc.data());
      this.setState({
        assignments_info : assignments_info
      })
    })

    firestore.collection('notifications').where('Status', '==', 'unread').onSnapshot((snapshot) => {
      var notification_count = snapshot.docs.length;
      this.setState({
          notification_count : notification_count
      })
    })
  }

  // this is for the classes
  class_renderItem = ({item}) => (
    <ListItem
    title = {item.class_title}
    subtitle = {item.class_description}
    rightElement = {
      <TouchableOpacity onPress = {() => {
        this.props.navigation.navigate('ClassDetailsScreen', {'details' : item})
      }}>
        <Text> View </Text>
      </TouchableOpacity>
    }
    bottomDivider
    topDivider></ListItem>
  )

  notes_renderItem = ({item}) => (
    <ListItem
    title = {item.note_title}
    subtitle = {item.note_description}
    rightElement = {
      <TouchableOpacity onPress = {() => {
        this.props.navigation.navigate('NotesDetailsScreen', {'details' : item})
      }}>
        <Text> View </Text>
      </TouchableOpacity>
    }
    bottomDivider
    topDivider></ListItem>
  )

  assignments_renderItem = ({item}) => (
    <ListItem
    title = {item.assignment_title}
    subtitle = {item.assignment_description}
    rightElement = {
      <TouchableOpacity onPress = {() => {
        this.props.navigation.navigate('AssignmentDetailsScreen', {'details' : item})
      }}>
        <Text> View </Text>
      </TouchableOpacity>
    }
    bottomDivider
    topDivider></ListItem>
  )

  render(){
    return(
      <View style = {{
        backgroundColor : '#222831',
        height : '100%',
      }}>
        <ScrollView>
          <Header centerComponent = {<Text style = {{
                  fontSize : 20,
              }}> Home </Text>}
              leftComponent = {
                <TouchableOpacity onPress = {() => {
                  this.props.navigation.openDrawer();
                }}>
                  <Image source = {require('./Images/hamburger.png')} style = {{ width : 30,
                  height : 30}}></Image>
                </TouchableOpacity>
              }
              rightComponent = {
                <TouchableOpacity onPress = {() => {
                  this.props.navigation.navigate('Notifications')
                }}>
                  <Image source = {require('./Images/bellIcon.png')} style = {{ width : 30,
                  height : 30}}></Image>
                  <Badge 
                  value = {this.state.notification_count}
                  containerStyle = {{position : 'absolute', top : -4, right : -4}}></Badge>
                </TouchableOpacity>
              }/>


          <Text style = {{
            color : 'lightgrey',
            textAlign : 'left',
            paddingLeft : 20,
            marginTop : 30,
            marginBottom : 15,
            fontSize : 20
          }}> Greetings !! </Text>


          <Text style = {{
            color : 'lightgrey',
            textAlign : 'left',
            paddingLeft : 20,
            marginBottom : 35,
            fontSize : 30
          }}> {this.state.name} </Text>

        
          <Text style = {{
            color : 'lightgrey',
            textAlign : 'left',
            paddingLeft : 20,
            fontSize : 20
          }}> Here are some of your important assignments, notes as well as classes to attend</Text>
        

        <View style = {{
          backgroundColor : '#222831',
          height : '100%',
          marginTop : 40,
        }}> 
               <ScrollView>  
          <Text style = {{
            color : 'lightgrey',
            textAlign : 'center',
            paddingLeft : 20,
            marginBottom : 15,
            fontSize : 20,
          }}> My Classes </Text>

          
          <FlatList
          data = {this.state.class_info}
          renderItem = {this.class_renderItem}></FlatList>
          

          <Text style = {{
            color : 'lightgrey',
            textAlign : 'center',
            paddingLeft : 20,
            marginTop : 20,
            marginBottom : 15,
            fontSize : 20
          }}> My Assignments </Text>

          
          <FlatList
          data = {this.state.assignments_info}
          renderItem = {this.assignments_renderItem}></FlatList>
          

          <Text style = {{
            color : 'lightgrey',
            textAlign : 'center',
            paddingLeft : 20,
            marginBottom : 15,
            marginTop : 20,
            fontSize : 20
          }}> My Notes </Text>

          
          <FlatList
          data = {this.state.notes_info}
          renderItem = {this.notes_renderItem}></FlatList>
          </ScrollView>
      </View>
      </ScrollView>
          </View>
    )
  }
}

const style = StyleSheet.create({
  text : {
    color : 'lightgrey',
    textAlign : 'left',
    paddingLeft : 20,
  
  },

  Name : {
    color : 'white',
    textAlign : 'left',
    paddingLeft : 20,
    fontSize : 30,
    marginBottom : 30
  }
})