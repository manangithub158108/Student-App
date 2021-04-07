import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default class Settings extends Component{

  state = {
    user_docID : [],
    name : '',
    phone_no : '',
    address : '',
    DOB : '',
    class : '',
    updatedName : '',
    updatedPhone_no : '',
    updatedAddress : '',
    updatedDOB : '',
    updatedClass : '',
    notification_count : 0,
  }

  componentDidMount = () => {

    const uid = firebase.auth().currentUser.email;

     firestore.collection('users').where('email', '==', uid).get().then((snapshot) => {
      snapshot.docs.map((doc) => {
        const id = doc.id;
        this.setState({
          user_docID : id
        })
        const user_data = doc.data();
        this.setState({
          name : user_data.name,
          class : user_data.class,
          DOB : user_data.DOB,
          phone_no : user_data.phone_no,
          address : user_data.address
        })
      })
    })

    firestore.collection('notifications').add({
      'email' : uid,
      'assignment_title' : this.state.assignment_title,
      'type' : 'assignments',
      'Status' : 'unread'
    })

  }

  updateFunction = async() => {

    const uid = firebase.auth().currentUser.email;

    await firestore.collection('users').doc(this.state.user_docID).update({
      'name' : this.state.updatedName,
      'phone_no' : this.state.updatedPhone_no,
      'address' : this.state.updatedAddress,
      'DOB' : this.state.updatedDOB,
      'class' : this.state.updatedClass,
    })

    firebase.auth().updateCurrentUser()
  }

  render(){
    return(
      <View style = {{
        backgroundColor : '#222831',
        height : '100%'
      }}> 
         <ScrollView>

         <Header centerComponent = {<Text style = {{
                  fontSize : 17,
              }}>  Settings </Text>}
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

           <TextInput defaultValue = {this.state.name} onChangeText = {(text) => {
             this.setState({
              updatedName : text
             })
           }} placeholder = {'Enter your name'} style = {style.email}></TextInput>
           <TextInput defaultValue = {this.state.class} onChangeText = {(text) => {
             this.setState({
              updatedClass : text
             })
           }} placeholder = {'Enter your class'} style = {style.password}></TextInput>
           <TextInput defaultValue = {this.state.phone_no} onChangeText = {(text) => {
             this.setState({
              updatedPhone_no : text
             })
           }} placeholder = {'Enter your phone no.'} style = {style.password}></TextInput>
           <TextInput defaultValue = {this.state.address} onChangeText = {(text) => {
             this.setState({
              updatedAddress : text
             })
           }} placeholder = {'Enter your address'} style = {style.address}></TextInput>
           <TextInput defaultValue = {this.state.DOB} onChangeText = {(text) => {
             this.setState({
              updatedDOB : text
             })
           }} placeholder = {'Enter your DOB'} style = {style.password}></TextInput>

           <TouchableOpacity onPress = {() => {
             this.updateFunction();
           }}>
             <Text style = {style.button}> Update </Text>
           </TouchableOpacity>
         </ScrollView>
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
      width : '92%',
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
      width : '93%',
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
  