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
import Datakontrol from './containers/nurse/resumepulang/datakontrol';
import Kerjakankuis from './containers/nurse/kuis/kerjakankuis';
import Menubaradmin from './containers/admin/menubaradmin';
import Nurse from './containers/admin/nurse/nurse';
import Datanurse from './containers/admin/nurse/datanurse';
import Tabnurse from './containers/admin/nurse/tabnurse';
import Pendaftarannurse from './containers/admin/nurse/pendaftarannurse';
import Tambahsurvey from './containers/pasien/survey/tambahsurvey';
import Tambahmateri from './containers/nurse/materi/tambahmateri';
import Chartkuis from './containers/nurse/kuis/chartkuis';
import Notifikasi from './containers/nurse/notifikasi';
import Judulmateri from './containers/nurse/materi/judulmateri';
import Tabmateri from './containers/nurse/materi/tabmateri';
import Tabreminder from './containers/pasien/tabreminder';
import Kategoriforum from './containers/nurse/forum/kategoriforum';
import Kategorikuis from './containers/nurse/kuis/kategorikuis';
import Kerjakansurvey from './containers/pasien/survey/kerjakansurvey';
import Kelolasurvey from './containers/pasien/survey/kelolasurvey';
import Datakontrolpasien from './containers/nurse/resumepulang/datakontrolpasien';
import Tambahrelasi from './containers/admin/nurse/tambahrelasi';
import Logperawat from './containers/admin/nurse/logperawat';
import Addcomment from './containers/nurse/forum/addcomment';
import Tambahkategori from './containers/nurse/materi/tambahkategori';
import Tambahtopik from './containers/nurse/forum/tambahtopik';
import Lihathasilsurvey from './containers/pasien/survey/lihathasilsurvey';
import Lihathasilkuis from './containers/nurse/kuis/lihathasilkuis';
import Changepassword from './containers/nurse/pasien/changepassword';
import Webview from './containers/webview';
import Userlog from './containers/nurse/userlog';
import Faq from './containers/nurse/faq/faq';
import Historykuis from './containers/nurse/kuis/historykuis';



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
          options={{ headerTitle:"Data Pasien" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Materiedukasi"
          component={Materiedukasi}
          options={{ headerTitle: "Materi Edukasi" }}
        />
        <Stack.Screen
          name="Detailmateri"
          component={Detailmateri}
          options={{ headerTitle: "Materi Edukasi" }}
        />
        <Stack.Screen
          name="Daftarakun"
          component={Daftarakun}
          options={({ route }) => ({ title: route.params ? route.params.nama : "Register Pasien" })}
        />
        <Stack.Screen
          name="Daftarbayi"
          component={Daftarbayi}
          options={({ route }) => ({ title: route.params ? route.params.nama : "Register Pasien" })}
        />
        <Stack.Screen
          name="Daftarortu"
          component={Daftarortu}
          options={({ route }) => ({ title: route.params ? route.params.nama : "Register Pasien" })}
        />
        <Stack.Screen
          name="Forum"
          component={Forum}
          options={{ headerTitle: "Tanya jawab" }}
        />
        <Stack.Screen
          name="Forumdetail"
          component={Forumdetail}
          options={{ headerTitle: "Tanya jawab" }}
        />
        <Stack.Screen
          name="Addforum"
          component={Addforum}
          options={({ route }) => ({ title: route.params.nama })}
        />
        <Stack.Screen
          name="Datapasien"
          component={Datapasien}
          options={{ headerTitle: "Data Pasien" }}
        />
        <Stack.Screen
          name="Menubar"
          component={Menubar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Resumepulang"
          component={Resumepulang}
          options={{ headerTitle: "Resume Pulang" }}
        />
        <Stack.Screen
          name="Tambahresume"
          component={Tambahresume}
          options={({ route }) => ({ title: route.params ? route.params.nama : "Tambah Resume Pulang" })}
        />
        <Stack.Screen
          name="Anjuranpasien"
          component={Anjuranpasien}
          options={{ headerTitle: "Anjuran Pasien" }}
        />
        <Stack.Screen
          name="Tambahanjuran"
          component={Tambahanjuran}
          options={({ route }) => ({ title: route.params ? route.params.nama : "Buat Anjuran" })}
        />
        <Stack.Screen
          name="Kelolakuis"
          component={Kelolakuis}
          options={{ headerTitle: "Mengelola Kuis" }}
        />
        <Stack.Screen
          name="Detailresumepulang"
          component={Detailresumepulang}
          options={({ route }) => ({ title: route.params ? route.params.nama : "Resume Pulang" })}
        />
        <Stack.Screen
          name="Tambahkuis"
          component={Tambahkuis}
          options={({ route }) => ({ title: route.params ? "Tambah Kuis" : "Tambah Kuis" })}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ route }) => ({ title: route.params ? route.params.nama : "Kontak Perawat" })}
        />
        <Stack.Screen
          name="Menubarpasien"
          component={Menubarpasien}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Daftarperawat"
          component={Daftarperawat}
          options={{ headerTitle: "Daftar Perawat" }}
        />
        <Stack.Screen
          name="Kontakperawat"
          component={Kontakperawat}
          options={{ headerTitle: "Kontak Perawat" }}
        />
        <Stack.Screen
          name="Daftarsurvey"
          component={Daftarsurvey}
          options={{ headerTitle: "Daftar Kuesioner" }}
        />
        <Stack.Screen
          name="Datakontrol"
          component={Datakontrol}
          options={{ headerTitle: "Data Kontrol" }}
        />
        <Stack.Screen
          name="Kerjakankuis"
          component={Kerjakankuis}
          options={{ headerTitle: "Kuis" }}
        />
        <Stack.Screen
          name="Menubaradmin"
          component={Menubaradmin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Nurse"
          component={Nurse}
          options={{ headerTitle: "Perawat" }}
        />
        <Stack.Screen
          name="Tabnurse"
          component={Tabnurse}
          options={{ headerTitle:"Perawat"}}
        />
         <Stack.Screen
          name="Pendaftarannurse"
          component={Pendaftarannurse}
          options={{ headerTitle:"Perawat"}}
        />
          <Stack.Screen
          name="Tambahsurvey"
          component={Tambahsurvey}
          options={{ headerTitle:"Tambah Kuesioner"}}
        />
          <Stack.Screen
          name="Tambahmateri"
          component={Tambahmateri}
          options={({ route }) => ({ title: route.params ? "Tambah Materi" : "Tambah Materi" })}
        />
       <Stack.Screen
          name="Chartkuis"
          component={Chartkuis}
          options={{ headerTitle:"Chart Kuesioner"}}
        />
          <Stack.Screen
          name="Notifikasi"
          component={Notifikasi}
          options={{ headerTitle:"Notifikasi"}}
        />
         <Stack.Screen
          name="Judulmateri"
          component={Judulmateri}
          options={{ headerTitle:"Judul Materi"}}
        />
          <Stack.Screen
          name="Tabreminder"
          component={Tabreminder}
          options={{ headerShown:false}}
        />
         <Stack.Screen
          name="Kategoriforum"
          component={Kategoriforum}
          options={({ route }) => ({ title: route.params ? route.params.nama : "Kategori Tanya jawab" })}
        />
        <Stack.Screen
          name="Kategorikuis"
          component={Kategorikuis}
          options={({ route }) => ({ title: route.params ? route.params.nama : "Kategori Kuis" })}
        />
         <Stack.Screen
          name="Kerjakansurvey"
          component={Kerjakansurvey}
          options={{ headerTitle:"Kerjakan Kuesioner"}}
        />
        <Stack.Screen
          name="Kelolasurvey"
          component={Kelolasurvey}
          options={{ headerTitle:"Kelola Kuesioner"}}
        />
           <Stack.Screen
          name="Datakontrolpasien"
          component={Datakontrolpasien}
          options={{ headerTitle:"Pilih Pasien"}}
        />
        <Stack.Screen
          name="Tambahrelasi"
          component={Tambahrelasi}
          options={{ headerTitle:"Tambah Relasi"}}
        />
           <Stack.Screen
          name="Logperawat"
          component={Logperawat}
          options={{ headerTitle:"Log Perawat"}}
        />
         <Stack.Screen
          name="Addcomment"
          component={Addcomment}
          options={{ headerTitle:"Tambah Komentar"}}
        />
             <Stack.Screen
          name="Tambahkategori"
          component={Tambahkategori}
          options={{ headerTitle:"Tambah Kategori Materi"}}
        />
        <Stack.Screen
          name="Tambahtopik"
          component={Tambahtopik}
          options={{ headerTitle:"Tambah Kategori Topik"}}
        />
        <Stack.Screen
          name="Lihathasilsurvey"
          component={Lihathasilsurvey}
          options={{ headerTitle:"Lihat hasil Kuesioner"}}
        />
        <Stack.Screen
          name="Lihathasilkuis"
          component={Lihathasilkuis}
          options={{ headerTitle:"Lihat hasil kuis"}}
        />
        <Stack.Screen
          name="Changepassword"
          component={Changepassword}
          options={{ headerTitle:"Ganti password"}}
        />
        <Stack.Screen
          name="Webview"
          component={Webview}
          options={{ headerTitle:"Daftar Perawat"}}
        />
        <Stack.Screen
          name="Userlog"
          component={Userlog}
          options={{ headerTitle:"User log"}}
        />
        <Stack.Screen
          name="Faq"
          component={Faq}
          options={{ headerTitle:"FAQ"}}
        />
        <Stack.Screen
          name="Historykuis"
          component={Historykuis}
          options={{ headerTitle:"History kuis"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
