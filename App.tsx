import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import HomeScreen from './src/screens/HomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import ProductScreen from './src/screens/ProductScreen';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {OneSignal} from 'react-native-onesignal';
import {createNotification} from './src/api/onesignal';

type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  ProductScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      // console.log(user, 'user info');
      setUser(user);
      getId();
    });
    return unsubscribe;
  }, []);

  const getId = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    const id = await OneSignal.User.pushSubscription.getIdAsync();

    if (id) {
      console.log(id);
      const body = {
        app_id: 'd76f46ed-3a60-46a6-82b4-623e7b8d90c1', //onesignal app id
        include_subscription_ids: [id],
        contents: {
          en: 'Welcome To ARV Multimedia',
        },
        name: 'Testing',
        headings: {en: 'Product Assignments'},
        buttons: [
          {id: 'first', text: 'first', icon: 'ic_menu_share'},
          {id: 'second', text: 'Second', icon: 'ic_menu_map'},
        ],
        //  big_picture: item?.Image,
      };
      createNotification(body);
    }
  };

  // useEffect(() => {
  //   const requestUserPermission = async () => {
  //     // const authStatus = await messaging().requestPermission();
  //     // const enabled =
  //     //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     const enabled = PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //     );
  //     if (enabled) {
  //       console.log('Permission granted for push notifications');
  //       getFCMToken();
  //     }
  //   };

  //   // Get the FCM token
  //   const getFCMToken = async () => {
  //     const token = await messaging().getToken();
  //     console.log('FCM Token:', token);
  //   };

  //   // Listen for incoming messages
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   requestUserPermission();

  //   return unsubscribe;
  // }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProductScreen"
            component={ProductScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
