/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState } from 'react';
import { StatusBar, View, Dimensions, Image, ImageBackground, ToastAndroid } from 'react-native';
import Navigation from './src/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Require cycle:',
  'Encountered two children with the same key',
  'VirtualizedLists',
  'Each child in a list should',
  'VirtualizedList',
  'Looks like'
]);
global.url = "http://192.168.1.5:10/api";
//global.url = "https://mobile.temanbunda.com/api";
global.initialroute = "Login"
global.status = 0
global.key = "";
global.user_id = "";
global.guide = "1";
global.add = 1;
global.mode = "";
global.kuis = 1;
function App() {
  const { width: DEVICE_WIDTH } = Dimensions.get('window');
  const [sudah, setsudah] = useState(false);
  const authorize = (key) => {
    fetch(global.url + "/user", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + key,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        if (json.data) {
          global.username = json.data.username
          if (json.data.role == "patient") {
            global.status = 1
            global.initialroute = "Menubarpasien"
          } else if (json.data.role == "nurse") {
            global.status = 2
            global.initialroute = "Menubar"
          } else if (json.data.role == "admin") {
            global.status = 3
            global.initialroute = "Menubaradmin"
          } else if (json.data.role == "super_admin") {
            global.status = 4
            global.initialroute = "Menubaradmin"
          } else {
            global.initialroute = "Login";
          }
        } else {
          global.initialroute = "Login";
        }
        setTimeout(() => {
          setsudah(true)
        }, 500);
      })
      .catch((error) => {
        console.error(error)
        ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
      });
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('key')
      if (value !== null) {
        authorize(value)
        global.key = value
      } else {
        authorize("asdafasaasd")
      }

    } catch (e) {
      // error reading value
    }
  }
  useState(() => {
    getData()
  })
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {sudah ? (<Navigation />) : (
        <View>
       
            <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
              <Image
                source={require("./src/assets/image/splash.png")}
                style={{ width: 300, height: 300 }}
                resizeMode="contain"
              ></Image>
            </View>
      

        </View>)}
    </>
  );
};

export default App;
