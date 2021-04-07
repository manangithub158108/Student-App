import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import {Text, View} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import firestore from '../config';

export default class customSideBar extends Component{

    signOut = () => {
        firebase.auth().signOut();
    }

    render(){
        return(
            <View>
                <DrawerItems {...this.props}>

                </DrawerItems>
            </View>
        )
    }
}