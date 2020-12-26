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
import style from '../../../globalstyles';
import Materiedukasi from './materiedukasi';
const Tab = createMaterialTopTabNavigator();

function Tabmateri() {
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <Text style={[style.poppinsbold, { fontSize: 20, marginTop: 20, textAlign: "center" }]}>Kategori Materi Edukasi</Text>
      <View style={[style.line, { height: 3, backgroundColor: '#ECECEC' }]}></View>
      <View style={{
        flex: 1,
      }}>
        <Tab.Navigator
          initialRouteName="Daftarmateri"
          tabBarOptions={{
            activeTintColor: colors.button,
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Daftarmateri"
            component={Materiedukasi}
            options={{
              tabBarLabel: "Daftar materi",
            }}
          />
          <Tab.Screen
            name="Rekomendasi"
            component={Materiedukasi}
            options={{
              tabBarLabel: "Rekomendasi materi",
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Tabmateri;
