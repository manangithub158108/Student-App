import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import {Header} from 'react-native-elements';

class MyHeader extends Component{
    render(){
        return(
            <View>
                <Header centerComponent = {<Text style = {{
                    fontSize : 30,
                }}> Login </Text>} style = {{}} />
            </View>
        )
    }
}

export default class LoginScreen extends Component{

    state = {
        email : '',
        password : ''
    }

    userLogin = () => {
        const Signup = firebase.auth().signInWithEmailAndPassword(
            this.state.email, this.state.password
        );
        if(Signup){
            this.props.navigation.navigate('HomeScreen');
            alert('User Logged in successfully');
        }
    }

  render(){
    return(
      <View style = {{
          backgroundColor :'#222831',
          height : '100%'
      }}>
          <MyHeader></MyHeader>
          <TextInput onChangeText = {(text) => {
            this.setState({
                email : text
            })
        }} placeholder = {'Enter your email'} style = {style.email}></TextInput>
        <TextInput onChangeText = {(text) => {
            this.setState({
                password : text
            })
        }} placeholder = {'Enter your password'} secureTextEntry = {true} style = {style.password}></TextInput>
        <TouchableOpacity onPress = {() => {
            this.userLogin();
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
        height : 40,
        width : '80%',
        alignSelf : 'center',
        textAlign : 'center',
        borderRadius : 30,
        marginTop : 300,
        marginBottom : 20
    },

    password : {
        display : 'flex',
        justifyContent : 'center',
        backgroundColor : '#393e46',
        color : '#eeeeee',
        fontSize : 20,
        height : 40,
        width : '80%',
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