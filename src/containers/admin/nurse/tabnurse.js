import 'react-native-gesture-handler';
import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCalendarAlt, faBell, faBook, faBookOpen, faComments, faCommentsDollar, faCommentDots, faCog, faClipboardList } from '@fortawesome/free-solid-svg-icons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../globalstyles';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import Datanurse from './datanurse';
const Tab = createMaterialTopTabNavigator();

function Tabnurse() {
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <View style={{
        flex: 1,
      }}>
        <Tab.Navigator
          initialRouteName="Datanurse"
          tabBarOptions={{
            activeTintColor: colors.button,
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Datanurse"
            component={Datanurse}
            options={{
              tabBarLabel: "Daftar materi",
            }}
          />
          <Tab.Screen
            name="Log"
            component={Datanurse}
            options={{
              tabBarLabel: "Log Perawat",
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Tabnurse;
