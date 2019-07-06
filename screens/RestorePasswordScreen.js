import React from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

import Parse from "parse/react-native";

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

  navigateToPage = (page) => {
    this.props.navigation.navigate(page);
  }

  _alert = (title,message, namePage, linkToPage) => {
    Alert.alert(
      title,
      message,
      [                  
        {
          text: 'Ok',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: `Back to ${namePage} page`, onPress: () => {
            this.navigateToPage(linkToPage)
        }},
      ],
      {cancelable: false},
    );
  }  

  resetPassword = () => {
    Parse.User.requestPasswordReset(this.state.email)
    .then(() => {
      this._alert('Success', 'An email was sent to your address.', 'Log In', 'LogInStack');
      this.submitAndClear();
    }).catch((error) => {
      this._alert('Error', error.message, 'Log In', 'LogInStack');
    });
  } 

  submitAndClear = () => {
    this.setState({
      email: ''
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titlePage}>Reset Password</Text>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            keyboardType="email-address"
            placeholder="Email"
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}/>
        </View>

      {!!this.state.nameError && (
      <View styles={styles.divError}>
        <Text style={styles.divErrorFont}>{this.state.nameError}</Text>
      </View>
      )}

      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.resetPassword}>
        <Text style={styles.loginText}>Send email</Text>
      </TouchableHighlight>

      <View style={styles.containerLinksRow}>
        <TouchableHighlight style={styles.txtLink} onPress={this.navigateToPage('LoginStack')}>
            <Text style={{fontWeight:'bold'}}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.txtLink} onPress={this.navigateToPage('SignUpStack')}>
            <Text style={{fontWeight:'bold'}}>Register</Text>
        </TouchableHighlight>
      </View>            
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00b5ec",
    padding: 30
  },
  row: {
      flexDirection: "row"
  },
  titlePage:{
      marginBottom: 30,
      fontSize: 25,
      fontWeight: 'bold'
  },
  inputContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      height: 50,
      marginBottom: 15,
      flexDirection: 'row'
  },
  divErrorFont:{
      textAlign: 'center',
      color: '#721c24',
      backgroundColor: '#f8d7da',
      borderColor: '#f5c6cb',
      padding: 20,
      marginTop: 10,
      marginBottom: 10,
      borderWidth: 2,
  },
  inputs:{
      height: 50,
      marginLeft:16,
      flex:1,
  },
  fontAwesomeIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
      flexDirection: 'row',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width: 250,
      borderRadius: 5,
  },
  loginButton: {
      backgroundColor: 'transparent',
      borderBottomColor: '#fff',
      borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  containerLinksRow:{
      marginTop: 50,
      flexDirection: 'row',
      justifyContent: 'center',
  },
  txtLink:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15
  },  
  loginText: {
      color: '#fff',
  }
});