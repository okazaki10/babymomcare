import React, { useRef, useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Datapasien(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [cari, setcari] = useState("")

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const storeData = async (key) => {
        try {
            await AsyncStorage.setItem('key', key)
            global.key = key
        } catch (e) {
            // saving error
        }
    }


    const login = () => {
        /*
        setspinner(true)
        fetch(global.url + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                device_name: "xavier"
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.role == "colleger") {
                    global.status = 0
                    storeData(json.token)
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Menu_bar' }],
                    });
                } else if (json.role == "admin") {
                    global.status = 1
                    storeData(json.token)
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Menu_bar' }],
                    });
                } else {
                    toggleModal()
                    setisipesan("Email atau password salah")
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
            */
    };
    const [spinner, setspinner] = useState(false)
    const [kosong, setkosong] = useState(false)
    const ubahpasien = (index) => {
        if (index == 0) {
            props.navigation.navigate("Daftarbayi", { nama: "Edit Data Bayi" })
            global.add = 0
        } else if (index == 1) {
            props.navigation.navigate("Daftarortu", { nama: "Ubah Ortu" })
            global.add = 0
        } else if (index == 2) {
            props.navigation.navigate("Daftarakun", { nama: "Ubah Akun" })
            global.add = 0
        }
    }

    const addpasien = () => {
        props.navigation.navigate("Addforum", { nama: "Buat Forum" })
    }
    const forumdetail = () => {
        props.navigation.navigate("Forumdetail")
    }
    const [menuswitch, setmenuswitch] = useState(0)
    const gantidata = (index) => {
        setmenuswitch(index)
    }
    const [title2, settitle2] = useState("")
    const [description2, setdescription2] = useState("")
    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
 
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Modal isVisible={isModalVisible2}
                onBackdropPress={toggleModal2}
                onBackButtonPress={toggleModal2}>
                <View style={style.content}>
                    <Text style={[style.nunitosans, { textAlign: "center" }]}>{isipesan}</Text>
                    <View style={{ flexDirection: "row", marginTop: 40 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Batal" titleStyle={[style.nunitosans, { textAlign: "center", color: "black" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, marginRight: 5 }}>
                            {menuswitch == 0 ? (
                                <Button title="Data Bayi" buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                            ) : (
                                    <Button title="Data Bayi" onPress={() => gantidata(0)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                )}
                        </View>
                        <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                            {menuswitch == 1 ? (
                                <Button title="Data Ortu" buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                            ) : (
                                    <Button title="Data Ortu" onPress={() => gantidata(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                )}
                        </View>
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            {menuswitch == 2 ? (
                                <Button title="Data Akun" buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                            ) : (
                                    <Button title="Data Akun" onPress={() => gantidata(2)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                )}
                        </View>
                    </View>
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>

                                {menuswitch == 0 ? (<View>
                                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>Data Bayi</Text>
                                        <Ionicons name={'pencil-outline'} size={24} color={colors.grey} />
                                    </View>

                                    <TouchableOpacity onPress={() => { ubahpasien(0) }} style={[style.card, { marginTop: 15, elevation: 5, padding: 20 }]}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien, { marginTop: 0 }]}>Nama</Text>
                                            <Text style={[style.nunitosans, style.datapasien2, { marginTop: 0 }]}>: Rafif iqbal saputra</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Tanggal Lahir</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: 28/09/2019</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Usia Getas</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: -</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Jenis Kelamin</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: Laki-laki</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Panjang bayi lahir</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: 20 cm</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>BB Lahir</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: 2.2 kg</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>BB Sekarang</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: 2.5 kg</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>) : (null)}
                                {menuswitch == 1 ? (<View>
                                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>Data Ortu</Text>
                                        <Ionicons name={'pencil-outline'} size={24} color={colors.grey} />
                                    </View>
                                    <TouchableOpacity onPress={() => { ubahpasien(1) }} style={[style.card, { marginTop: 15, elevation: 5, padding: 20 }]}>
                                        <View>
                                            <Text style={[style.poppinsbold, { fontSize: 14, color: colors.grey, paddingRight: 50 }]}>Data Ibu</Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Nama</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: Selina Maurizka</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Tanggal Lahir</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: 28/09/2019</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Pekerjaan</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: Guru</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Tingkat pendidikan</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: Sarjana</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Agama</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: Islam</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Paritas</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: 1</Text>
                                            </View>

                                            <Text style={[style.poppinsbold, { fontSize: 14, color: colors.grey, marginTop: 22, paddingRight: 50 }]}>Data Ayah</Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Nama</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: Luthfi Ferdian</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Tanggal Lahir</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: 28/09/2019</Text>
                                            </View>

                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Pekerjaan</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: Guru</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Tingkat pendidikan</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: Sarjana</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Agama</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: Islam</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>) : (null)}
                                {menuswitch == 2 ? (<View>
                                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>Data Akun</Text>
                                        <Ionicons name={'pencil-outline'} size={24} color={colors.grey} />
                                    </View>
                                    <TouchableOpacity onPress={() => { ubahpasien(2) }} style={[style.card, { marginTop: 15, elevation: 5, padding: 20 }]}>
                                        <View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien, { marginTop: 0 }]}>Email</Text>
                                                <Text style={[style.nunitosans, style.datapasien2, { marginTop: 0 }]}>: rafifshaputra25@gmail.com</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>No Hp</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: 0821632713232</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Username</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: rafifsaputra</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Password</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: *******</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Rekomendasi Materi</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: makanan</Text>
                                            </View>
                                    
                                        </View>
                                    </TouchableOpacity>
                                </View>) : (null)}

                            </View>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};



export default Datapasien;
