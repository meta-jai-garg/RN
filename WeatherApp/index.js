/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';

MessageQueue.spy(true);
AppRegistry.registerComponent(appName, () => App);
