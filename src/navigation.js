import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './globalstyles';

import Login from './containers/login';
import Materiedukasi from './containers/nurse/materi/materiedukasi';
import Detailmateri from './containers/nurse/materi/detailmateri';
import Daftarakun from './containers/nurse/pasien/daftarakun';
import Daftarbayi from './containers/nurse/pasien/daftarbayi';
import Daftarortu from './containers/nurse/pasien/daftarortu';
import Forum from './containers/nurse/forum/forum';
import Forumdetail from './containers/nurse/forum/forumdetail';
import Addforum from './containers/nurse/forum/addforum';
import Datapasien from './containers/nurse/pasien/datapasien';
import Menubar from './containers/nurse/menubar';
import Resumepulang from './containers/nurse/resumepulang/resumepulang';
import Tambahresume from './containers/nurse/resumepulang/tambahresume';
import Anjuranpasien from './containers/nurse/reminder/anjuranpasien';
import Tambahanjuran from './containers/nurse/reminder/tambahanjuran';
import Kelolakuis from './containers/nurse/kuis/kelolakuis';
import Listpasien from './containers/nurse/pasien/listpasien';
import Detailresumepulang from './containers/nurse/resumepulang/detailresumepulang';
import Tambahkuis from './containers/nurse/kuis/tambahkuis';
import Chat from './containers/pasien/chat/chat';
import Menubarpasien from './containers/pasien/menubarpasien';
import Daftarperawat from './containers/pasien/chat/daftarperawat';
import Kontakperawat from './containers/pasien/chat/kontakperawat';
import Daftarsurvey from './containers/pasien/survey/daftarsurvey';


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
          options={{ headerTitle:"Chat Perawat" }}
        />
        <Stack.Screen
          name="Menubarpasien"
          component={Menubarpasien}
          options={{ headerShown:false }}
        />
         <Stack.Screen
          name="Daftarperawat"
          component={Daftarperawat}
          options={{ headerTitle:"Daftar Perawat" }}
        />
         <Stack.Screen
          name="Kontakperawat"
          component={Kontakperawat}
          options={{ headerTitle:"Kontak Perawat" }}
        />
         <Stack.Screen
          name="Daftarsurvey"
          component={Daftarsurvey}
          options={{ headerTitle:"Kontak Perawat" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
