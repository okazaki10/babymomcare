import React, { useState } from 'react';
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

function Datanurse(props) {
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
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>

                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien, { marginTop: 0 }]}>Nama</Text>
                                    <Text style={[style.nunitosans, style.datapasien2, { marginTop: 0 }]}>: Nikmah salsabila</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Username</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: nikmah</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Password</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: ********</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Alamat Rumah Sakit</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: Jalan radio raya</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Tingkat Pendidikan</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: S1</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Nomor Telepon</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: 087880992192</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Tempat Rumah Sakit</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: sentra medika</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Lama Bekerja</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: 5 tahun</Text>
                                </View>

                            </View>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};



export default Datanurse;
