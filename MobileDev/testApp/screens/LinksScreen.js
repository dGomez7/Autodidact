import React from 'react';
import {WebView} from 'react-native';

export default class LinksScreen extends React.Component {

  render() {
    return (
      <WebView
          source={{uri: 'http://192.168.43.104:2000/users/register'}}
          style={{marginTop: 5}}
        />
    );
  }
}
