import React from 'react';
import {
  Alert,
  StyleSheet,
  View,
} from 'react-native';

import Parse from "parse/react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'List',
      headerRight: (
        <View 
          style={{marginRight: 15}}>
         <Icon name="sign-out" size={30} color="#00b5ec" 
          onPress=
            {() => {
              Alert.alert(
                'Sign out',
                'Are you sure do you want to exit?',
                [                  
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Yes', onPress: () => {
                      navigation.getParam('clearAll')
                      Parse.User.logOut();
                      navigation.navigate('LogInStack')
                  }},
                ],
                {cancelable: false},
              );
              }
            } />
        </View>
      )
    };
  };

  constructor(props){
    super(props);
    this.state = {
      dialogVisible: false,
      nameError: false,
      item: ''
    }
  }  

  render() {
    return (
      <View style={styles.container}>
            
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});