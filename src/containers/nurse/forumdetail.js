import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../../globalstyles';

import style from '../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatDistance } from 'date-fns';
import { id } from 'date-fns/locale';
function Forumdetail(props) {
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
    const timeelapsed = (time) => {
        return formatDistance(new Date(), time, { includeSeconds: true, locale: id })
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
                    <View style={{ flex: 1, padding: 23 }}>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>Bagaimana Mengatasi Berat Rendah?</Text>
                            <Ionicons name={'pencil-outline'} size={24} color={colors.grey} />
                        </View>

                        <View style={[style.card, { marginTop: 15, elevation: 5 }]}>
                            <View style={[{ flexDirection: "row" }]}>
                                <Image
                                    source={require("../../assets/image/empty.png")}
                                    style={{ width: 40, height: 40 }}
                                    resizeMode="contain"
                                />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, paddingRight: 50 }]}>Reza Artamevia</Text>
                                    <Text style={[style.poppinsbold, { fontSize: 12, color: colors.grey, paddingRight: 50 }]}>Anggota</Text>
                                    <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginTop: 5, paddingRight: 50 }]}>Anak saya saat ini sedang mengalami berat badan rendah, saya sangat khawatir</Text>
                                </View>
                            </View>
                            <View style={[style.line, { marginBottom: 15 }]}></View>
                            <View style={[{ flexDirection: "row" }]}>
                                <Image
                                    source={require("../../assets/image/empty.png")}
                                    style={{ width: 40, height: 40 }}
                                    resizeMode="contain"
                                />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, paddingRight: 50 }]}>Ara Susanti</Text>
                                    <Text style={[style.poppinsbold, { fontSize: 12, color: colors.grey, paddingRight: 50 }]}>Nurse</Text>
                                    <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginTop: 5, paddingRight: 50 }]}>Anak saya saat ini sedang mengalami berat badan rendah, saya sangat khawatir</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>Komentar</Text>
                        </View>

                        <View style={[style.card, { marginTop: 15, elevation: 5 }]}>
                            <View style={[{ flexDirection: "row" }]}>
                                <Image
                                    source={require("../../assets/image/empty.png")}
                                    style={{ width: 40, height: 40 }}
                                    resizeMode="contain"
                                />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, paddingRight: 50 }]}>Reza Artamevia</Text>
                                    <View style={{flexDirection:"row",alignItems:"center"}}>
                                        <Ionicons name={'time-outline'} size={18} color={colors.button} style={{marginRight:5}} />
                                        <Text style={[style.poppinsbold, { fontSize: 11, color: colors.grey, paddingRight: 50 }]}>{timeelapsed(new Date())} yang lalu</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginTop: 5 }]}>Anak saya saat ini sedang mengalami berat badan rendah, saya sangat khawatir</Text>
                        </View>
                    </View>

                </ScrollView>
            </View>

        </View>
    );
};

export default Forumdetail;
