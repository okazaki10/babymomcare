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
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
function Detailmateri(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
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
            <ScrollView>
                <View style={{ flex: 1, padding: 23 }}>
                    <View style={[style.card, { elevation: 10, padding: 19 }]}>
                        <Text style={[style.poppinsbold, { fontSize: 17 }]}>Pemantuan Pertumbuhan dan Perkembangan</Text>
                        <Text style={[style.nunitosans, { fontSize: 12 }]}>{format(new Date(), "iii', 'dd' 'MMM', 'yyyy'", { locale: id })}</Text>
                        <Image
                            source={{ uri: "https://www.pathwaysforyou.org/sites/default/files/styles/1280x720/public/2018-11/ChildrensCareManagement.jpg?itok=v8Wkml5A" }}
                            style={{ width: "100%", height: 170, marginTop: 15 }}
                            resizeMode="cover"
                        />
                        <Text style={[style.nunitomateri, { fontSize: 14, marginTop: 15, flex: 1 }]}>Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan P Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantu Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantu Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan PemantuPemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan PemantuPemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan PemantuPemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan PemantuPemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan PemantuPemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan PemantuPemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan PemantuPemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan PemantuPemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan PemantuPemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan PemantuPemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuan Pertumbuhan dan Perkembangan Pemantuertumbuhan dan a a a  aa a  a aa  a</Text>
                    </View>
                    <Text style={[style.poppinsbold, { fontSize: 17, marginTop: 15 }]}>Forum Terkait</Text>
                    <View style={[style.card, { elevation: 10, padding: 19, marginTop: 15 }]}>
                        <TouchableOpacity style={[ { flexDirection: "row"}]} onPress={()=>{props.navigation.navigate("Daftarpasien")}}>
                            <Image
                                source={require("../../assets/image/empty.png")}
                                style={{ width: 40, height: 40 }}
                                resizeMode="contain"
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={[style.poppinsbold, { fontSize: 12 }]}>Mengapa anak saya kesulitan membaca?</Text>
                                <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey }]}>Oleh: Raffi Ahmad</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[style.line,{marginBottom:15}]}></View>
                        <TouchableOpacity style={[ { flexDirection: "row"}]}>
                            <Image
                                source={require("../../assets/image/empty.png")}
                                style={{ width: 40, height: 40 }}
                                resizeMode="contain"
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={[style.poppinsbold, { fontSize: 12 }]}>Mengapa anak saya kesulitan membaca?</Text>
                                <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey }]}>Oleh: Raffi Ahmad</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Detailmateri;
