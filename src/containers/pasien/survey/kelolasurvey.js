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
import { Picker } from '@react-native-picker/picker';
function Kelolasurvey(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [cari, setcari] = useState("")
    const [materi, setmateri] = useState("")
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
    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const tindakankuis = () => {
        setisipesan("Pilih tindakan untuk data ini")
        toggleModal2()
    }

    const ubahkuis = () => {
        props.navigation.navigate("Tambahsurvey", { nama: "Ubah Survey", halaman: jumlah })
        global.add = 0
    }

    const tambahkuis = () => {

        props.navigation.navigate("Tambahsurvey", { halaman: jumlah, kuis: kuis })
        global.add = 1

    }


    const hapuskuis = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus kuis ini")
        toggleModal3()

    }
    const [isModalVisible3, setModalVisible3] = useState(false);
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    const [jumlah, setjumlah] = useState("5")
    const [data, setdata] = useState({})
    const lihatsurvey = () => {
        setspinner(true)
        fetch(global.url + '/survey/index', {
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
                    setdata(json)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    useState(() => {
        lihatsurvey()
    })
    const [kuis, setkuis] = useState("kuisioner_1")
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <Modal isVisible={isModalVisible3}
                onBackdropPress={toggleModal3}
                onBackButtonPress={toggleModal3}>
                <View style={style.content}>
                    <View>
                        <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={toggleModal3}>
                            <FontAwesomeIcon icon={faTimes} size={22} color={"black"}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <View style={{ alignItems: "center" }}>
                            <Image
                                source={require("../../../assets/image/exit.png")}
                                style={{ width: 100, height: 100 }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={[style.poppinsbold, { fontSize: 20, textAlign: "center", marginTop: 15, color: colors.grey }]}>{isipesan}</Text>
                        <Text style={[style.nunitosans, { fontSize: 14, textAlign: "center", marginTop: 5, color: colors.grey }]}>Kembali ke <Text style={[style.poppinsbold, { fontSize: 14 }]}>Beranda</Text></Text>

                        <View style={{ marginTop: 15, marginRight: 15, marginLeft: 15, flexDirection: "row" }}>
                            <View style={{ flex: 1, marginRight: 15 }}>
                                <Button onPress={toggleModal3} title="Iya" titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: "red", backgroundColor: "red" }]}></Button>
                            </View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Button onPress={toggleModal3} title="Tidak" titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: "red", backgroundColor: "white" }]}>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal isVisible={isModalVisible2}
                onBackdropPress={toggleModal2}
                onBackButtonPress={toggleModal2}>
                <View style={style.content}>
                    <Text style={[style.nunitosans, { textAlign: "center" }]}>{isipesan}</Text>
                    <View style={{ flexDirection: "row", marginTop: 40 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={hapuskuis} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Batal" titleStyle={[style.nunitosans, { textAlign: "center", color: "black" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, padding: 20 }}>
                    {global.status == 1 ? (null) : (
                        <View>
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 0 }]}>Judul Kuisioner</Text>
                            <View style={[style.card, { elevation: 5, padding: 0, flex: 0 }]}>
                                <Picker
                                    selectedValue={kuis}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setkuis(itemValue)
                                        console.log(itemValue)
                                    }
                                    }
                                    mode="dropdown">
                                    <Picker.Item label="kuisioner_1" value="kuisioner_1" />
                                    <Picker.Item label="kuisioner_2" value="kuisioner_2" />
                                </Picker>
                            </View>
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Jumlah Halaman</Text>

                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <View style={{ flex: 1, marginRight: 15 }}>
                                    <TextInput onChangeText={setjumlah} value={jumlah} placeholder="Total Halaman" autoCapitalize="none" style={[style.card, { elevation: 5 }]} keyboardType="numeric"></TextInput>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button title="+ Tambah Survey" onPress={tambahkuis} buttonStyle={[style.button, { marginBottom: 0 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                </View>
                            </View>
                        </View>
                    )}
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>

                                <TouchableOpacity onLongPress={tindakankuis} onPress={() => {
                                    props.navigation.navigate("Kerjakansurvey", { id: data.title_1 })

                                }} style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                    <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 12 }]}>{data.title_1}</Text>
                                    </View>
                                    {global.status == 1 ? (null) : (
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <View style={{ marginRight: 15 }}>
                                                <Ionicons name={'pencil'} size={24} color={colors.grey} />
                                            </View>
                                            <View style={{ marginRight: 15 }}>
                                                <Ionicons name={'trash'} size={24} color={colors.grey} />
                                            </View>
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity onLongPress={tindakankuis} onPress={() => {
                                    props.navigation.navigate("Kerjakansurvey", { id: data.title_2 })

                                }} style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                    <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 12 }]}>{data.title_2}</Text>
                                    </View>
                                    {global.status == 1 ? (null) : (
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <View style={{ marginRight: 15 }}>
                                                <Ionicons name={'pencil'} size={24} color={colors.grey} />
                                            </View>
                                            <View style={{ marginRight: 15 }}>
                                                <Ionicons name={'trash'} size={24} color={colors.grey} />
                                            </View>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View >
    );
};

export default Kelolasurvey;
