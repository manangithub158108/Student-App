import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import { Badge, Header, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ScrollView } from 'react-native-gesture-handler';

export default class Notifications extends Component{

  state = {
    all_notifications_of_class : [],
    all_notifications_of_assignments : [],
    all_notifications_of_notes : [],
    notification_count : '',
    notes_docID : [],
    class_docID : [],
    assignment_docID : []
  }

  componentDidMount = () => {

    const uid = firebase.auth().currentUser.email;

    firestore.collection('notifications')
    .where('Status', '==', 'unread')
    .where('type', '==', 'class').onSnapshot((snapshot) => {
      var all_notifications_of_class = snapshot.docs.map((doc) => doc.data());
      this.setState({
        all_notifications_of_class : all_notifications_of_class
      })
    })

    firestore.collection('notifications')
    .where('Status', '==', 'unread')
    .where('type', '==', 'notes').onSnapshot((snapshot) => {
      var all_notifications_of_notes = snapshot.docs.map((doc) => doc.data());
      this.setState({
        all_notifications_of_notes : all_notifications_of_notes
      })
    })

    firestore.collection('notifications')
    .where('Status', '==', 'unread')
    .where('type', '==', 'assignments').onSnapshot((snapshot) => {
      var all_notifications_of_assignments = snapshot.docs.map((doc) => doc.data());
      this.setState({
        all_notifications_of_assignments : all_notifications_of_assignments
      })
    })

    firestore.collection('notifications').where('Status', '==', 'unread').onSnapshot((snapshot) => {
      var notification_count = snapshot.docs.length;
      this.setState({
          notification_count : notification_count
      })
    })
  }

  renderItem_notes = ({item}) => (
    <ListItem 
    title = {item.note_title}
    subtitle = {item.Status}
    rightElement = {
      <Text> {item.type} </Text>
    }
    onPress = { async () => {
    const uid = firebase.auth().currentUser.email

    await firestore.collection('notifications')
    .where('Status', '==', 'unread')
    .where('email', '==', uid).where('note_title', '==', item.note_title).get().then((snapshot) => {
      snapshot.docs.map((doc) => {
        const id = doc.id;
        this.setState({
          notes_docID : id
        })
      })
    })

     firestore.collection('notifications').doc(this.state.notes_docID).update({
      'Status' : 'read'
    })
    }}></ListItem>
  )

  renderItem_class = ({item}) => (
    <ListItem 
    title = {item.class_title}
    subtitle = {item.Status}
    rightElement = {
      <Text> {item.type} </Text>
    }
    onPress = { async () => {
      const uid = firebase.auth().currentUser.email;

      await firestore.collection('notifications')
      .where('Status', '==', 'unread')
      .where('email', '==', uid).where('class_title', '==', item.class_title).get().then((snapshot) => {
        snapshot.docs.map((doc) => {
          const id = doc.id;
          this.setState({
            class_docID : id
          })
        })
      })
  
       firestore.collection('notifications').doc(this.state.class_docID).update({
        'Status' : 'read'
      })
    }}></ListItem>
  )

  renderItem_assignments = ({item}) => (
    <ListItem 
    title = {item.assignment_title}
    subtitle = {item.Status}
    rightElement = {
      <Text> {item.type} </Text>
    }
    onPress = { async () => {
      const uid = firebase.auth().currentUser.email;

      await firestore.collection('notifications')
      .where('Status', '==', 'unread')
      .where('email', '==', uid).where('assignment_title', '==', item.assignment_title).get().then((snapshot) => {
        snapshot.docs.map((doc) => {
          const id = doc.id;
          this.setState({
            assignment_docID : id
          })
        })
      })
  
       firestore.collection('notifications').doc(this.state.assignment_docID).update({
        'Status' : 'read'
      })
    }}></ListItem>
  )

  render(){
    return(
      <View>

        <Header centerComponent = {<Text style = {{
                  fontSize : 20,
              }}>  Notifications </Text>}
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

          <ScrollView>

          <SwipeListView 
          data = {this.state.all_notifications_of_notes}
          renderItem = {this.renderItem_notes}
          renderHiddenItem = {this.renderHiddenItem} />

          <FlatList
          data = {this.state.all_notifications_of_class}
          renderItem = {this.renderItem_class}></FlatList>

          <FlatList
          data = {this.state.all_notifications_of_assignments}
          renderItem = {this.renderItem_assignments}></FlatList>
          </ScrollView>

      </View>
    )
  }
}