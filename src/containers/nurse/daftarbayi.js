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
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Ionicons from 'react-native-vector-icons/Ionicons';
function Daftarbayi(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [nama, setnama] = useState("")
    const [tgllahir, settgllahir] = useState("")
    const [gestasi, setgestasi] = useState("")
    const [anak, setanak] = useState("")
    const [bbnow, setbbnow] = useState("")
    const [bblater, setbblater] = useState("")
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = (tipe) => {
        setMode(tipe);
        setShow(true);
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
    return (
        <View style={style.main}>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}

                />
            )}
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
                                source={require("../../assets/image/exit.png")}
                                style={{ width: 50, height: 50 }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={[style.nunitosans, { textAlign: "center", marginTop: 15 }]}>{isipesan}</Text>
                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1, padding: 22 }}>
                        <View style={{ alignItems: "center" }}>
                            <Image
                                source={require("../../assets/image/register-pasien-2.png")}
                                style={{ width: "100%", height: DEVICE_WIDTH * 0.15 }}
                                resizeMode="stretch"
                            />
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Nama</Text>
                        <TextInput onChangeText={setnama} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tanggal Lahir</Text>
                        <TouchableOpacity  style={{ flexDirection: "row" }}  onPress={() => showDatepicker('date')}>
                            <View style={[style.card, { flexDirection: "row", alignItems: "center", marginTop: 20,elevation:5 }]}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={[style.nunitosansemi, { fontSize: 15, color: "black" }]}>{format(date, "dd'/'MM'/'yyyy'", { locale: id })}</Text>
                               </View>
                                <View style={{ flex: 1, alignItems: "flex-end" }}>
                                    <Ionicons name={'calendar-outline'} size={24} color="black" />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Usia Gestasi</Text>
                        <TextInput onChangeText={setgestasi} style={[style.card, { elevation: 5, marginTop: 10 }]} keyboardType="numeric"></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Anak Ke</Text>
                        <TextInput onChangeText={setanak} style={[style.card, { elevation: 5, marginTop: 10 }]} keyboardType="numeric"></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>BB Lahir</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center",elevation:5 }]}>
                            <TextInput onChangeText={setbbnow} style={{padding: 0, marginLeft: 10 }} keyboardType="numeric"></TextInput>
                            <Text style={{marginLeft:5}}>Kg</Text>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>BB Sekarang</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center",elevation:5 }]}>
                            <TextInput onChangeText={setbblater} style={{padding: 0, marginLeft: 10 }} keyboardType="numeric"></TextInput>
                            <Text style={{marginLeft:5}}>Kg</Text>
                        </View>
                      
                    </View>
                </ScrollView>
                <View style={{ padding: 22, flexDirection: "row" }}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Button title="Kembali" onPress={() => props.navigation.goBack()} buttonStyle={[style.button, { backgroundColor: "#EFF3F7" }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Button title="Selanjutnya" onPress={() => props.navigation.navigate("Daftarortu")} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default Daftarbayi;
