import React, {Component} from 'react';
import { TextInput } from 'react-native';
import {Text, View, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import {Header, Badge} from 'react-native-elements'
import { Image } from 'react-native';

export default class AddClass extends Component{

  state = {
    class_title : '', 
    class_description : '',
    timings : '',
    notification_count : 0,
  }

  add_class = () => {

    const uid = firebase.auth().currentUser.email;

    firestore.collection('class').add({
      'email' : uid,
      'class_title' : this.state.class_title,
      'class_description' : this.state.class_description,
      'timings' : this.state.timings,
      'time' : firebase.firestore.FieldValue.serverTimestamp(),
    })

    firestore.collection('notifications').add({
      'email' : uid,
      'class_title' : this.state.class_title,
      'type' : 'class',
      'Status' : 'unread'
    })

    alert('Class added successfully');
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
              }}>  Add Classes </Text>}
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
            class_title : text
          })
        }} placeholder = {'Enter the title of your class'} style = {style.email} multiline = {true}></TextInput>
        <TextInput onChangeText = {(text) => {
          this.setState({
            class_description : text
          })
        }} placeholder = {'Enter the description of your class'} style = {style.address} multiline = {true}></TextInput>
        <TextInput onChangeText = {(text) => {
          this.setState({
            timings : text
          })
        }} placeholder = {'Enter the class timing and the date'} style = {style.password} multiline = {true}></TextInput>
        <TouchableOpacity onPress = {() => {
          this.add_class();
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
      height : 50,
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
      height : 50,
      width : '80%',
      alignSelf : 'center',
      textAlign : 'center',
      borderRadius : 30,
      marginBottom : 30,
      marginTop : 20
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
      marginBottom : 10
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