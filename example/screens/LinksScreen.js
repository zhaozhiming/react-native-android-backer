import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from '@ant-design/react-native/lib/modal';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    props.navigation.setParams({
      backPage: 'Settings',
      backPageParams: { gotoPage: 'Home' },
      isModalShow: () => this.state.isVisible,
      closeModal: () => this.setState({ isVisible: false }),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
          <Text>Open Modal</Text>
        </TouchableOpacity>
        <Modal visible={this.state.isVisible} popup transparent>
          <View >
            <Text>I am the modal content!</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
