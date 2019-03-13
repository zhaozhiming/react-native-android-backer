import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { navigationServer } from 'react-native-android-backer';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  constructor(props) {
    super(props);
    props.navigation.setParams({
      disableBack: true,
    });
  }

  handleGoto = () => {
    navigationServer.navigate('Home');
  };

  handleGoBack = () => {
    navigationServer.goBack();
  };

  getCurrentPage = () => {
    const currentPage = navigationServer.getCurrentRoute();
    console.log({ currentPage });
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.handleGoto}>
          <Text>Goto Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleGoBack}>
          <Text>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getCurrentPage}>
          <Text>Current Page</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
