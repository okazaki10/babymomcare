import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './globalstyles';
import Mainpage from './containers/nurse/mainpage';
import Login from './containers/login';
import Materiedukasi from './containers/nurse/materiedukasi';
import Detailmateri from './containers/nurse/detailmateri';
import Daftarpasien from './containers/nurse/daftarpasien';
import Daftarbayi from './containers/nurse/daftarbayi';
import Daftarortu from './containers/nurse/daftarortu';
import Forum from './containers/nurse/forum';
import Forumdetail from './containers/nurse/forumdetail';
import Addforum from './containers/nurse/addforum';
import Datapasien from './containers/nurse/datapasien';
import Menubar from './containers/nurse/menubar';
import Reminderpasien from './containers/nurse/resumepulang';
import Resumepulang from './containers/nurse/resumepulang';
import Tambahresume from './containers/nurse/tambahresume';
import Anjuranpasien from './containers/nurse/anjuranpasien';
import Tambahanjuran from './containers/nurse/tambahanjuran';


const Stack = createStackNavigator();
const headerTitleStyle = [styles.font22, styles.bold];


function Navigation() {
  var initialroute = global.initialroute
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialroute}>
      <Stack.Screen
          name="Mainpage"
          component={Mainpage}
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
          name="Daftarpasien"
          component={Daftarpasien}
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
          options={{ headerTitle:"Tambah Resume Pulang" }}
        />
        <Stack.Screen
          name="Anjuranpasien"
          component={Anjuranpasien}
          options={{ headerTitle:"Anjuran Pasien" }}
        />
        <Stack.Screen
          name="Tambahanjuran"
          component={Tambahanjuran}
          options={{ headerTitle:"Buat Reminder" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
