import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../../globalstyles';

import style from '../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
function Beranda(props) {
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
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />


            <View style={{ flex: 1 }}>

                <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', marginTop: 50 }}>
                    <Image
                        source={require("../../assets/image/profilcewe.png")}
                        style={{ width: 100, height: 100 }}
                        resizeMode="contain"
                    />
                </View>
                <Text style={[style.poppinsbold, { textAlign: "center", fontSize: 18, marginTop: 15 }]}>Resma Andini</Text>
                <Text style={[style.poppinsmedium, { fontSize: 14, textAlign: 'center', color: colors.lightblue }]}>Nurse</Text>
                <View style={[style.line, { height: 3, backgroundColor: '#ECECEC' }]}></View>
                <View style={{ flex: 1, padding: 20 }}>
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                <TouchableOpacity  onPress={() => { props.navigation.navigate("Listpasien") }} style={[style.card, { marginTop: 15, flexDirection: "row",padding:0 }]}>
                                    <Image
                                        source={require("../../assets/image/addpeople.png")}
                                        style={{ width:55, height:65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15,justifyContent:"center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Data Pasien</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => { props.navigation.navigate("Anjuranpasien") }} style={[style.card, { marginTop: 30, flexDirection: "row",padding:0 }]}>
                                    <Image
                                        source={require("../../assets/image/note.png")}
                                        style={{ width:55, height:65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15,justifyContent:"center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Reminder Pasien</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => { props.navigation.navigate("Resumepulang") }} style={[style.card, { marginTop: 30, flexDirection: "row",padding:0 }]}>
                                    <Image
                                        source={require("../../assets/image/resume.png")}
                                        style={{ width:55, height:65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15,justifyContent:"center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Resume Pulang</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => { props.navigation.navigate("Kelolakuis") }} style={[style.card, { marginTop: 30, flexDirection: "row",padding:0 }]}>
                                    <Image
                                        source={require("../../assets/image/resume.png")}
                                        style={{ width:55, height:65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15,justifyContent:"center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Mengelola Kuis</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => { props.navigation.navigate("Daftarsurvey") }} style={[style.card, { marginTop: 30, flexDirection: "row",padding:0 }]}>
                                    <Image
                                        source={require("../../assets/image/resume.png")}
                                        style={{ width:55, height:65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15,justifyContent:"center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Daftar Survey</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => { props.navigation.navigate("Datakontrol") }} style={[style.card, { marginTop: 30, flexDirection: "row",padding:0 }]}>
                                    <Image
                                        source={require("../../assets/image/resume.png")}
                                        style={{ width:55, height:65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15,justifyContent:"center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Data Kontrol</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => { props.navigation.navigate("Forum") }} style={[style.card, { marginTop: 30, flexDirection: "row",padding:0 }]}>
                                    <Image
                                        source={require("../../assets/image/resume.png")}
                                        style={{ width:55, height:65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15,justifyContent:"center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Forum</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => { props.navigation.navigate("Tabnurse") }} style={[style.card, { marginTop: 30, flexDirection: "row",padding:0 }]}>
                                    <Image
                                        source={require("../../assets/image/resume.png")}
                                        style={{ width:55, height:65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15,justifyContent:"center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Daftar Nurse</Text>
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

export default Beranda;
