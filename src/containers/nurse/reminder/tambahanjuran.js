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
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tambahresume from '../resumepulang/tambahresume';
function Tambahanjuran(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [judul, setjudul] = useState("")


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const login = () => {
        props.navigation.navigate("Mainpage")
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
    const tambahnajuran = () => {
        setisipesan("Reminder berhasil dibuat!")
        toggleModal()
    }
    const ubahanjuran = () => {
        setisipesan("Reminder berhasil diubah!")
        toggleModal()
    }
    return (
        <View style={style.main}>

            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <Modal isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}>
                <View style={style.content}>
                    <View>
                        <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={toggleModal}>
                            <FontAwesomeIcon icon={faTimes} size={22} color={"black"}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <View style={{ alignItems: "center" }}>
                            <Image
                                source={require("../../../assets/image/check.png")}
                                style={{ width: 100, height: 100 }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={[style.poppinsbold, { fontSize: 20, textAlign: "center", marginTop: 15, color: colors.grey }]}>{isipesan}</Text>
                        <Text style={[style.nunitosans, { fontSize: 14, textAlign: "center", marginTop: 5, color: colors.grey }]}>Kembali ke <Text style={[style.poppinsbold, { fontSize: 14 }]}>Beranda</Text></Text>
                        <View style={{ marginTop: 15, marginRight: 30, marginLeft: 30 }}>
                            <Button title="Ok" onPress={toggleModal} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: colors.button2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1, padding: 22 }}>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 0 }]}>Judul Reminder</Text>
                        <TextInput onChangeText={setjudul} style={[style.card, { elevation: 5,  marginTop: 15 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Deskripsi</Text>
                        <TextInput onChangeText={setjudul} style={[style.card, { elevation: 5,  marginTop: 15 }]} multiline={true}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Frekuensi (berapa hari sekali)</Text>
                        <TextInput onChangeText={setjudul} style={[style.card, { elevation: 5,  marginTop: 15 }]} keyboardType={"numeric"}></TextInput>
                    </View>
                </ScrollView>
                <View style={{ padding: 22, flexDirection: "row" }}>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        {global.add == 1 ? (
                            <Button title="Simpan" onPress={tambahnajuran} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                        ) : (
                            <Button title="Simpan" onPress={ubahanjuran} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>)}

                    </View>
                </View>
            </View>

        </View>
    );
};

export default Tambahanjuran;
