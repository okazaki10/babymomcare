import 'react-native-gesture-handler';
import React, {  useEffect } from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faHome, faBookOpen, faComments, faCog, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { View, ToastAndroid } from 'react-native';
import { Text } from 'react-native-elements';

import Beranda from '../nurse/beranda';
import Daftarperawat from './chat/daftarperawat';
import Tabreminder from './tabreminder';
import Pengaturan from '../nurse/pengaturan/pengaturan';
import Tabmateri from '../nurse/materi/tabmateri';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

function Menubarpasien() {
  const [unread, setunread] = React.useState("")
  const getunread = (key) => {

    fetch(global.url + '/chat/getunread', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key,
      }
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setunread(json.data)
      })
      .catch((error) => {
        console.error(error)
        ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
     
      });
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('key')
      if (value !== null) {
        getunread(value)
      }
    } catch (e) {
 
    }
  }

  const isFocused = useIsFocused()

 useEffect(() => {
    if (isFocused) {
      getData()
    }
  }, [isFocused])
  return (
    <Tab.Navigator
      initialRouteName="Beranda"
      tabBarOptions={{
        activeTintColor: "#f1a6ce",
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Beranda"
        component={Beranda}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faHome} size={28} color={color}></FontAwesomeIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Materi"
        component={Tabmateri}
        options={{
          tabBarLabel: 'Materi',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faBookOpen} size={28} color={color}></FontAwesomeIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Daftarperawat"
        component={Daftarperawat}
        options={{
          tabBarLabel: 'Kontak',
          tabBarIcon: ({color, size}) => (
            <View>
            {unread && unread != "0" ? (
                <View style={{ position: "absolute", top: -5, right: -3, zIndex: 100, backgroundColor: "red", width: 18, height: 18, justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
                  <Text style={{ fontSize: 12, color: "white" }}>{unread <= 99 ? unread : "99+"}</Text>
                </View>
              ) : (null)}
            <FontAwesomeIcon icon={faComments} size={28} color={color}></FontAwesomeIcon>
          </View>
          ),
        }}
      />
       <Tab.Screen
        name="Reminder"
        component={Tabreminder}
        options={{
          tabBarLabel: 'Anjuran',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faClipboardList} size={28} color={color}></FontAwesomeIcon>
          ),
        }}
      />
       <Tab.Screen
        name="Settings"
        component={Pengaturan}
        options={{
          tabBarLabel: 'Pengaturan',
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faCog} size={28} color={color}></FontAwesomeIcon>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Menubarpasien;
