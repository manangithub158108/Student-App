import React, {Component} from 'react';
import { TextInput } from 'react-native';
import {Text, View, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import {Header, Badge} from 'react-native-elements';

export default class AddNotes extends Component{

  state = {
    note_title : '', 
    note_description : '',
    notification_count : 0,
  }

  add_notes = () => {

    const uid = firebase.auth().currentUser.email;

    firestore.collection('notes').add({
      'email' : uid,
      'note_title' : this.state.note_title,
      'note_description' : this.state.note_description,
      'time' : firebase.firestore.FieldValue.serverTimestamp(),
    })

    firestore.collection('notifications').add({
      'email' : uid,
      'note_title' : this.state.note_title,
      'type' : 'notes',
      'Status' : 'unread',
    })

    alert('Notes added successfully');
  }


  componentDidMount = () => {
    firestore.collection('notifications').where('Status', '==', 'unread').onSnapshot((snapshot) => {
      var notification_count = snapshot.docs.length;
      this.setState({
          notification_count : notification_count
      })
    })
  }

  render(){
    return(
      <View style = {{
        backgroundColor :'#222831',
        height : '100%'
    }}>
      <Header centerComponent = {<Text style = {{
                  fontSize : 20,
              }}>  Add Your Notes </Text>}
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
        <TextInput onChangeText = {(text) => {
          this.setState({
            note_title : text
          })
        }} placeholder = {'Enter the title of your note'} style = {style.email}></TextInput>
        <TextInput onChangeText = {(text) => {
          this.setState({
            note_description : text
          })
        }} placeholder = {'Enter the description of your note'} style = {style.address} multiline = {true}></TextInput>
        <TouchableOpacity onPress = {() => {
          this.add_notes();
        }}>
          <Text style = {style.button}> Submit </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const style = StyleSheet.create({
  email : {
      display : 'flex',
      justifyContent : 'center',
      backgroundColor : '#393e46',
      color : '#eeeeee',
      fontSize : 20,
      height :50,
      width : '80%',
      alignSelf : 'center',
      textAlign : 'center',
      borderRadius : 30,
      marginTop : 50,
      marginBottom : 20
  },

  password : {
      display : 'flex',
      justifyContent : 'center',
      backgroundColor : '#393e46',
      color : '#eeeeee',
      fontSize : 20,
      height : 40,
      width : '90%',
      alignSelf : 'center',
      textAlign : 'center',
      borderRadius : 30,
      marginBottom : 30
  },

  address : {
      display : 'flex',
      justifyContent : 'center',
      backgroundColor : '#393e46',
      color : '#eeeeee',
      fontSize : 20,
      height : 200,
      width : '90%',
      alignSelf : 'center',
      textAlign : 'center',
      borderRadius : 30,
      marginBottom : 30
  },

  button : {
      display : 'flex',
      justifyContent : 'center',
      backgroundColor : '#00adb5',
      color : '#eeeeee',
      fontSize : 20,
      height : 40,
      width : '50%',
      alignSelf : 'center',
      textAlign : 'center',
      borderRadius : 30,
      marginTop : 30,
      marginBottom : 10
  },

})