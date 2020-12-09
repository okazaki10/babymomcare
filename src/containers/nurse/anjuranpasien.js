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
function Anjuranpasien(props) {
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

                <View style={{ flex: 1, padding: 20 }}>
                    <Button title="+ Buat Anjuran Pasien" onPress={() => { props.navigation.navigate("Tambahanjuran") }} buttonStyle={[style.button, { marginBottom: 5 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                <TouchableOpacity onPress={() => { props.navigation.navigate("Tambahanjuran") }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0 }]}>
                                    <Image
                                        source={require("../../assets/image/addpeople.png")}
                                        style={{ width: 55, height: 65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Memberi Asi</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ marginRight: 15 }}>
                                            <Ionicons name={'pencil'} size={24} color={colors.grey} />
                                        </View>
                                        <View style={{ marginRight: 15 }}>
                                            <Ionicons name={'trash'} size={24} color={colors.grey} />
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { props.navigation.navigate("Tambahanjuran") }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0 }]}>
                                    <Image
                                        source={require("../../assets/image/addpeople.png")}
                                        style={{ width: 55, height: 65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Memberi Asi</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ marginRight: 15 }}>
                                            <Ionicons name={'pencil'} size={24} color={colors.grey} />
                                        </View>
                                        <View style={{ marginRight: 15 }}>
                                            <Ionicons name={'trash'} size={24} color={colors.grey} />
                                        </View>

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

export default Anjuranpasien;
