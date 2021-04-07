import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import {Header} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class MyHeader extends Component{
    render(){
        return(
            <View>
                <Header centerComponent = {<Text style = {{
                    fontSize : 30,
                }}> Signup </Text>} style = {{}} />
            </View>
        )
    }
}

export default class LoginScreen extends Component{

    state = {
        email : '',
        password : '',
        address : '',
        class : '',
        phone_no : 0,
        DOB : '',
        name : '',
    }

    userSignup = () => {
        const Signup = firebase.auth().createUserWithEmailAndPassword(
            this.state.email, this.state.password
        );
        if(Signup){
            firestore.collection('users').add({
                'email' : this.state.email,
                'name' : this.state.name,
                'class' : this.state.class,
                'phone_no' : this.state.phone_no,
                'address' : this.state.address,
                'DOB' : this.state.DOB
            })
            this.props.navigation.navigate('LoginScreen');
            alert('User Signed up successfully');
        }
    }

  render(){
    return(
        <ScrollView>
      <View style = {{
          backgroundColor :'#222831',
          height : '100%'
      }}>
          <MyHeader></MyHeader>
          <TextInput onChangeText = {(text) => {
            this.setState({
                name : text
            })
        }} placeholder = {'Enter your name'} style = {style.email}></TextInput>
        <TextInput onChangeText = {(text) => {
            this.setState({
                class : text
            })
        }} placeholder = {'Enter your class'} secureTextEntry = {false} style = {style.password}></TextInput>
        <TextInput onChangeText = {(text) => {
            this.setState({
                address : text
            })
        }} placeholder = {'Enter your address'} secureTextEntry = {false} style = {style.address} multiline = {true}></TextInput>
        <TextInput onChangeText = {(text) => {
            this.setState({
                DOB : text
            })
        }} placeholder = {'Enter your date of birth'} secureTextEntry = {false} style = {style.password}></TextInput>
        <TextInput onChangeText = {(text) => {
            this.setState({
                phone_no : text
            })
        }} placeholder = {'Enter your phone number'} secureTextEntry = {false} style = {style.password}></TextInput>
        <TextInput onChangeText = {(text) => {
            this.setState({
                email : text
            })
        }} placeholder = {'Enter your email'} secureTextEntry = {false} style = {style.password}></TextInput>
        <TextInput onChangeText = {(text) => {
            this.setState({
                password : text
            })
        }} placeholder = {'Enter your password'} secureTextEntry = {true} style = {style.password}></TextInput>

        <TouchableOpacity onPress = {() => {
            this.userSignup();
        }}>
            <Text style = {style.button}> Submit </Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
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
        width : '80%',
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