import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LogInScreen from '../screens/LogInScreen';
import RestorePasswordScreen from '../screens/RestorePasswordScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const SignUpStack = createStackNavigator({
  SignUp: SignUpScreen,
});

const LogInStack = createStackNavigator({
  LogIn: LogInScreen,
});

const RestorePasswordStack = createStackNavigator({
  RestorePassword: RestorePasswordScreen,
});


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarVisible: false,
  tabBarOptions: { showLabel: false } 
};

SignUpStack.navigationOptions = {
  tabBarLabel: 'Sign Up',
  tabBarVisible: false,
  tabBarOptions: { showLabel: false }
  
};

LogInStack.navigationOptions = {
  tabBarLabel: 'Log In',
  tabBarVisible: false,
  tabBarOptions: { showLabel: false }
  
};

RestorePasswordStack.navigationOptions = {
  tabBarLabel: 'Reset Password',
  tabBarVisible: false,
  tabBarOptions: { showLabel: false }
  
};

export default createBottomTabNavigator({
  LogInStack,
  HomeStack,
  SignUpStack,
  RestorePasswordStack
});