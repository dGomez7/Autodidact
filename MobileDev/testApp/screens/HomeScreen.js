import React from 'react';
import {WebView} from 'react-native';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <WebView
          source={{uri: 'http://www.google.com'}}
          style={{marginTop: 5}}
        />
    );
  }
}
