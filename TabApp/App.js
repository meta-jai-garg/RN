/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TabBarIOS, TabBarIOSItem, ToolbarAndroid} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      // <View style={styles.container}>
      //   <TabBarIOS itemPositioning={"fill"}>
      //     <TabBarIOSItem></TabBarIOSItem>
      //     <TabBarIOSItem></TabBarIOSItem>
      //   </TabBarIOS>
      // </View>ssss
      <View style={styles.container}>
        <ToolbarAndroid title='Awesome' titleColor='white' style={{color:'white', backgroundColor:'black', height:56}}/>
      </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
