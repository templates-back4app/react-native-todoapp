import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

export default class LogInScreen extends React.Component{
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      nameError: null
    }
  }

  render(){
    return (
      <View style={styles.container}>
                   
      </View>
    );
  }
}


const styles = StyleSheet.create({

});