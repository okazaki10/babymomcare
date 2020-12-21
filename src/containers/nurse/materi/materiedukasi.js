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
function Materiedukasi(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);

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
    const tambahmateri = () => {
        props.navigation.navigate("Tambahmateri")
    }
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

            <View style={{ flex: 1 }}>
                {global.status == 2 || global.status == 3 ? (<View>
                    <Text style={[style.poppinsbold, { fontSize: 20, marginTop: 20, textAlign: "center" }]}>Materi Edukasi</Text>
                    <View style={[style.line, { height: 3, backgroundColor: '#ECECEC' }]}></View>
                </View>) : (null)}

                <View style={{ flex: 1, padding: 20 }}>
                    {global.status == 3 ? (
                    <Button title="+ Tambah Materi" onPress={tambahmateri} buttonStyle={[style.button, { marginTop: 0, marginBottom: 15 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                    ) : (null)}
                    <View style={[style.card, { flexDirection: "row", alignItems: "center", marginRight: 3, marginLeft: 3, flex: 0, backgroundColor: "#F3F4F6", marginBottom: 15 }]}>
                        <TextInput onChangeText={setcari} placeholder="Cari Materi Edukasi" style={{ flex: 1, padding: 0, marginLeft: 10 }}></TextInput>
                        <Ionicons name={'search-outline'} size={24} color={colors.grey} />
                    </View>
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                <TouchableOpacity style={[style.card, { marginBottom: 15, flexDirection: "row", backgroundColor: colors.button }]} onPress={() => props.navigation.navigate("Detailmateri")}>
                                    <Image
                                        source={require("../../../assets/image/empty.png")}
                                        style={{ width: 35, height: 35 }}
                                        resizeMode="contain"
                                    />
                                    <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 14, color: "white" }]}>Cara Memandikan Bayi</Text>
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

export default Materiedukasi;
