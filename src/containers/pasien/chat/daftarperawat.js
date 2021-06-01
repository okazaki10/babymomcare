import React, { useEffect, useState } from 'react';
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
import { useIsFocused } from '@react-navigation/native';
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
        if (global.status == 2) {
            props.navigation.navigate("Chat", { nama: "Kontak Pasien" })
        } else {
            props.navigation.navigate("Kontakperawat")
        }

    }
    const tindakananjuran = () => {
        setisipesan("Pilih tindakan untuk anjuran ini")
        toggleModal2()
    }
    const hapusanjuran = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus anjuran ini")
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
    const [data, setdata] = useState([{}])
    const lihatnurse = () => {
        //setspinner(true)
        fetch(global.url + '/patient/related-nurse', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setdata(json.data)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const lihatpasien = () => {
        //setspinner(true)
        fetch(global.url + '/nurse/index', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setdata(json.data)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            if (global.status == 1) {
                lihatnurse()
            } else {
                lihatpasien()
            }
        }
    }, [isFocused])
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: "white", height: 69, justifyContent: "center" }}>
                    <Text style={[style.poppinsbold, { fontSize: 20, textAlign: "center",marginTop:5 }]}>{global.status == 1 ? "Daftar Perawat" : "Daftar Pasien"}</Text>
                </View>
           
                <View style={[style.line, { height: 3, backgroundColor: '#ECECEC', marginTop: 0 }]}></View>
                <View style={{ flex: 1, padding: 20 }}>

                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                {data.map((item) => item.id ? (
                                    <TouchableOpacity onPress={() => {
                                        if (global.status == 1) {
                                            props.navigation.navigate("Kontakperawat", { id: item.user_id, id_kontak: item.id })
                                        } else {
                                            props.navigation.navigate("Chat", { nama: "Kontak Pasien", id: item.user_id })
                                        }
                                    }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0 }]}>
                                        {global.status == 1 ? (<Image
                                            source={require("../../../assets/image/profilcewe.png")}
                                            style={{ width: 45, height: 65, marginLeft: 15 }}
                                            resizeMode="contain"
                                        />) : (<Image
                                            source={require("../../../assets/image/addpeople.png")}
                                            style={{ width: 45, height: 65, marginLeft: 15 }}
                                            resizeMode="contain"
                                        />)}

                                        <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>{item.name ? item.name : item.mother_name}</Text>
                                        </View>

                                    </TouchableOpacity>
                                ) : (null))}



                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Daftarperawat;
