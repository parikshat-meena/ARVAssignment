/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {LogLevel, OneSignal} from 'react-native-onesignal';
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });
OneSignal.initialize('d76f46ed-3a60-46a6-82b4-623e7b8d90c1');
OneSignal.Notifications.requestPermission(true);
OneSignal.Notifications.addEventListener('click', event => {
  console.log('OneSignal: notification clicked:', event);
});

AppRegistry.registerComponent(appName, () => App);
