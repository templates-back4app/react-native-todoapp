import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import { Parse } from "parse/react-native";

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

  submitAndClear = () => {
    this.setState({
      username: '',
      password: '',
      nameError: null
    })
  }

  navigateToPage = (page) => {
    this.props.navigation.navigate(page);
  }

  alertAnError = (title,message) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => {this.navigateToPage('LogInStack')}},
      ]
    )
  }

  onSignUp = async() => {

    let    
      username = this.state.username,
      email = this.state.email,
      password = this.state.password;

    if (username.trim() === "" || username === undefined || email.trim() === "" || email === undefined  || password.trim() === "" || password === undefined ) {
      this.setState(() => ({ nameError: `Fill the fields correctly.`}));   
    } else {
      try {
        Parse.User.logOut();
        let user = new Parse.User();
        user.set("username", username);
        user.set("email", email);
        user.set("password", password);
        const result = await user.signUp();
        
        AsyncStorage.setItem('sessionToken', result.getSessionToken());
        AsyncStorage.setItem('username', result.getUsername());

        this.submitAndClear();

        this.navigateToPage('HomeStack');            
      } catch (error) {
        console.log(error)
          this.setState(() => ({ nameError: error.message }));
      }
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.titlePage}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            keyboardType="default"
            placeholder="Username"
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            keyboardType="email-address"
            placeholder="Email"
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}/>
        </View>
                
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Password"
            value={this.state.password}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}/>
        </View>

        {!!this.state.nameError && (
          <View styles={styles.divError}>
            <Text style={styles.divErrorFont}>{this.state.nameError}</Text>
          </View>
        )}

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onSignUp}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableHighlight>

        <View style={styles.containerLinksRow}>
          <TouchableHighlight style={styles.txtLink} onPress={this.onSignUp}>
            <Text style={{fontWeight:'bold'}}>Already have an account?  
              <Text style={{color: 'blue', paddingLeft: 5}}
                onPress={() => this.props.navigation.navigate('LogInStack')}>
                  Log In now
              </Text>
            </Text>
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