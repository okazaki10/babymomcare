import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
function Chat(props) {
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
                <ScrollView>
                    <View style={{ padding: 3 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", flexDirection: "row", marginRight: 50, marginLeft: 50 }}>
                            <Image
                                source={require("../../../assets/image/profilcewe.png")}
                                style={{ width: 50, height: 50, marginRight: 10 }}
                                resizeMode="contain"
                            />
                            <View>
                                <Text style={[style.nunitosans, { fontSize: 14, marginLeft: 20 }]}>Ara susanti</Text>
                                <View style={{ backgroundColor: "#EFF3F7", padding: 20, borderRadius: 25, marginTop: 10 }}>
                                    <Text style={[style.poppinsmedium, { fontSize: 14 }]}>halo apakah ada yang bisa saya bantu? halo apakah ada yang bisa saya bantu? halo apakah ada yang bisa saya bantu?halo apakah ada yang bisa saya bantu? halo apakah ada yang bisa saya bantu?</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0, backgroundColor: colors.primary, padding: 20, borderRadius: 25, marginTop: 15, marginRight: 22, marginLeft: 50 }}>
                            <Text style={[style.poppinsmedium, { fontSize: 14, textAlign: "right" }]}>halo apakah ada yang apakah ada</Text>
                        </View>
                    </View>

                </ScrollView>
                <View style={[{ justifyContent: "center", alignItems: "center", marginTop: 10, flex: 0, height: 75, backgroundColor: "white", elevation: 10, padding: 10, flexDirection: "row" }]} >
                    <View style={{ flex: 1 }}>
                        <TextInput multiline={true} placeholder="Type your message..."></TextInput>
                    </View>
                    <TouchableOpacity style={{ marginRight: 20 }}>
                        <FontAwesomeIcon icon={faPaperPlane} size={22} color={colors.button}></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default Chat;
