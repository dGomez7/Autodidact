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

export default class GamesScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View>
       <Text style={styles.red}>just red</Text>
       <Text style={styles.bigBlue}>just bigBlue</Text>
       <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
       <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
   </View>
    );
  }
}

const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
