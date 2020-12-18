import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
function Daftarperawat(props) {
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
    const tambahanjuran = () => {
        props.navigation.navigate("Tambahanjuran")
    }
    const kontakperawat = () => {
        props.navigation.navigate("Kontakperawat")
     
    }
    const tindakananjuran = () => {
        setisipesan("Pilih tindakan untuk reminder ini")
        toggleModal2()
    }
    const hapusanjuran = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus reminder ini")
        toggleModal3()
    }
    const [title2, settitle2] = useState("")
    const [description2, setdescription2] = useState("")
    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [isModalVisible3, setModalVisible3] = useState(false);
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

            <View style={{ flex: 1 }}>
            <Text style={[style.poppinsbold, { fontSize: 20, marginTop: 20,textAlign:"center" }]}>{global.status == 1?"Daftar Perawat":"Daftar Pasien"}</Text>
            <View style={[style.line, { height: 3, backgroundColor: '#ECECEC' }]}></View>
                <View style={{ flex: 1, padding: 20 }}>
                   
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                <TouchableOpacity  onPress={kontakperawat} style={[style.card, { marginTop: 0, flexDirection: "row", padding: 0 }]}>
                                    <Image
                                        source={require("../../../assets/image/addpeople.png")}
                                        style={{ width: 55, height: 65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Ari Susanti</Text>
                                    </View>
                                
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { props.navigation.navigate("Tambahanjuran") }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0 }]}>
                                    <Image
                                        source={require("../../../assets/image/addpeople.png")}
                                        style={{ width: 55, height: 65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Selina Maurizka</Text>
                                    </View>
                              
                                </TouchableOpacity>

                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Daftarperawat;