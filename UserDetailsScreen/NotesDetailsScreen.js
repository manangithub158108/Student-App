import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native';
import {Header, Badge} from 'react-native-elements';
import firebase from 'firebase';
import firestore from '../config';

export default class NotesDetailsScreen extends Component{

    state = {
        note_title : this.props.navigation.getParam('details')['note_title'],
        note_description : this.props.navigation.getParam('details')['note_description'],
        notification_count : 0,
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
                backgroundColor : '#222831',
                height : '100%'
            }}>
            
            <Header centerComponent = {<Text style = {{
                  fontSize : 20,
              }}> Notes Details Screen </Text>}
              leftComponent = {
                <TouchableOpacity onPress = {() => {
                  this.props.navigation.openDrawer();
                }}>
                  <Image source = {require('../Screens/Images/hamburger.png')} style = {{ width : 30,
                  height : 30}}></Image>
                </TouchableOpacity>
              }
              rightComponent = {
                <TouchableOpacity onPress = {() => {
                  this.props.navigation.navigate('Notifications')
                }}>
                  <Badge 
                  value = {this.state.notification_count}
                  containerStyle = {{position : 'absolute', top : -4, right : -4}}></Badge>
                  <Image source = {require('../Screens/Images/bellIcon.png')} style = {{ width : 30,
                  height : 30}}></Image>
                </TouchableOpacity>
              }/>

              <TextInput defaultValue = {this.state.note_title} editable = {false} style = {style.email}></TextInput>
              <TextInput defaultValue = {this.state.note_description} editable = {false} multiline = {true}
              style = {style.address}></TextInput>
              
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
        height : 80,
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
    