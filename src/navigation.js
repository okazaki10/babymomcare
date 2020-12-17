import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './globalstyles';

import Login from './containers/login';
import Materiedukasi from './containers/nurse/materiedukasi';
import Detailmateri from './containers/nurse/detailmateri';
import Daftarakun from './containers/nurse/daftarakun';
import Daftarbayi from './containers/nurse/daftarbayi';
import Daftarortu from './containers/nurse/daftarortu';
import Forum from './containers/nurse/forum';
import Forumdetail from './containers/nurse/forumdetail';
import Addforum from './containers/nurse/addforum';
import Datapasien from './containers/nurse/datapasien';
import Menubar from './containers/nurse/menubar';

import Resumepulang from './containers/nurse/resumepulang';
import Tambahresume from './containers/nurse/tambahresume';
import Anjuranpasien from './containers/nurse/anjuranpasien';
import Tambahanjuran from './containers/nurse/tambahanjuran';
import Kelolakuis from './containers/nurse/kelolakuis';
import Listpasien from './containers/nurse/listpasien';
import Detailresumepulang from './containers/nurse/detailresumepulang';
import Tambahkuis from './containers/nurse/tambahkuis';
import Chat from './containers/pasien/chat';


const Stack = createStackNavigator();
const headerTitleStyle = [styles.font22, styles.bold];


function Navigation() {
  var initialroute = global.initialroute
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialroute}>
      <Stack.Screen
          name="Listpasien"
          component={Listpasien}
          options={{ headerShown:false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown:false }}
        />
        <Stack.Screen
          name="Materiedukasi"
          component={Materiedukasi}
          options={{ headerTitle:"Materi Edukasi" }}
        />
        <Stack.Screen
          name="Detailmateri"
          component={Detailmateri}
          options={{ headerTitle:"Materi Edukasi" }}
        />
         <Stack.Screen
          name="Daftarakun"
          component={Daftarakun}
          options={({ route }) => ({ title: route.params?route.params.nama:"Register Pasien" })}
        />
         <Stack.Screen
          name="Daftarbayi"
          component={Daftarbayi}
          options={({ route }) => ({title: route.params?route.params.nama:"Register Pasien"})}
        />
         <Stack.Screen
          name="Daftarortu"
          component={Daftarortu}
          options={({ route }) => ({ title: route.params?route.params.nama:"Register Pasien" })}
        />
         <Stack.Screen
          name="Forum"
          component={Forum}
          options={{ headerTitle:"Forum" }}
        />
         <Stack.Screen
          name="Forumdetail"
          component={Forumdetail}
          options={{ headerTitle:"Forum" }}
        />
        <Stack.Screen
          name="Addforum"
          component={Addforum}
          options={({ route }) => ({ title: route.params.nama })}
        />
          <Stack.Screen
          name="Datapasien"
          component={Datapasien}
          options={{ headerTitle:"Data Pasien" }}
        />
         <Stack.Screen
          name="Menubar"
          component={Menubar}
          options={{ headerShown:false }}
        />
         <Stack.Screen
          name="Resumepulang"
          component={Resumepulang}
          options={{ headerTitle:"Resume Pulang" }}
        />
        <Stack.Screen
          name="Tambahresume"
          component={Tambahresume}
          options={({ route }) => ({ title: route.params?route.params.nama:"Tambah Resume Pulang" })}
        />
        <Stack.Screen
          name="Anjuranpasien"
          component={Anjuranpasien}
          options={{ headerTitle:"Anjuran Pasien" }}
        />
        <Stack.Screen
          name="Tambahanjuran"
          component={Tambahanjuran}
          options={({ route }) => ({ title: route.params?route.params.nama:"Buat Reminder" })}
        />
        <Stack.Screen
          name="Kelolakuis"
          component={Kelolakuis}
          options={{ headerTitle:"Mengelola Kuis" }}
        />
           <Stack.Screen
          name="Detailresumepulang"
          component={Detailresumepulang}
          options={{ headerTitle:"Resume Pulang" }}
        />
        <Stack.Screen
          name="Tambahkuis"
          component={Tambahkuis}
          options={({ route }) => ({ title: route.params?route.params.nama:"Tambah Kuis" })}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerTitle:"Chat" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
