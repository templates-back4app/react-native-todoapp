import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

export default class RestorePassword extends React.Component {
  static navigationOptions = {
    header: null
  };
  
  constructor(props){
    super(props);
    this.state = {
        email: '',
        nameError: ''
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