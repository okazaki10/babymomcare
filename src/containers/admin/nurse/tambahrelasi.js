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
function Tambahrelasi(props) {
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
    const tambahresume = () => {
        global.mode = "resume"
        props.navigation.navigate("Tambahresume")
    }
    const ubahresume = () => {
        global.mode = "resume"
        global.add = 0
        props.navigation.navigate("Tambahresume", { nama: "Ubah resume pulang" })
        toggleModal2()
    }
    const tindakanresume = () => {

        setisipesan("Pilih tindakan untuk resume ini")
        toggleModal2()

    }
    const hapusresume = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus konten ini")
        toggleModal3()

    }
    const detailresume = () => {
        global.mode = "resume"
        props.navigation.navigate("Detailresumepulang")
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
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
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
                       
                        <View style={{ marginTop: 15, marginRight: 15, marginLeft: 15,flexDirection:"row" }}>
                            <View style={{ flex: 1,marginRight:15 }}>
                                <Button onPress={toggleModal3} title="Iya" titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: "red", backgroundColor: "red"  }]}></Button>
                            </View>
                            <View style={{ flex: 1,marginLeft:15}}>
                                <Button onPress={toggleModal3} title="Tidak" titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: "red", backgroundColor: "white"  }]}>
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
                            <Button onPress={hapusresume} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={ubahresume} title="Ubah" titleStyle={[style.nunitosans, { textAlign: "center", color: "#E3DB69" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Batal" titleStyle={[style.nunitosans, { textAlign: "center", color: "black" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />


            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, padding: 20 }}>

                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            {kosong ? (<View>
                                <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', marginTop: 20 }}>
                                    <Image
                                        source={require("../../../assets/image/empty.png")}
                                        style={{ width: 100, height: 100 }}
                                        resizeMode="contain"
                                    />
                                    <Text style={[style.poppinsbold, { textAlign: "center", fontSize: 14, marginTop: 15 }]}>Anda belum memiliki resume pulang</Text>
                                </View>
                             
                            </View>) : (
                                    <View>
                                        <View style={[style.card, { flexDirection: "row", alignItems: "center", marginRight: 3, marginLeft: 3, flex: 0 }]}>
                                            <Ionicons name={'search-outline'} size={24} color={colors.button} />
                                            <TextInput onChangeText={setcari} placeholder="Cari Pasien" style={{ flex: 1, padding: 0, marginLeft: 10 }}></TextInput>
                                        </View>
                                       
                                        <TouchableOpacity onLongPress={tindakanresume} onPress={detailresume} style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                            <Image
                                                source={require("../../../assets/image/empty.png")}
                                                style={{ width: 100, height: 100 }}
                                                resizeMode="contain"
                                            />
                                            <View style={{ marginLeft: 15 }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Rafif Iqbal Shaputra</Text>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Ionicons name={'person'} size={17} color={colors.button} />
                                                    <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginLeft: 1 }]}>Ibu Selina Maurizka</Text>
                                                </View>
                                                <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 2 }]}>Masalah : Risiko Hipotermia</Text>
                                                <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 5 }]}>BB Lahir : 2,5 kg</Text>
                                            </View>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                            <Image
                                                source={require("../../../assets/image/empty.png")}
                                                style={{ width: 100, height: 100 }}
                                                resizeMode="contain"
                                            />
                                            <View style={{ marginLeft: 15 }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Rafif Iqbal Shaputra</Text>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Ionicons name={'person'} size={17} color={colors.button} />
                                                    <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginLeft: 1 }]}>Ibu Selina Maurizka</Text>
                                                </View>
                                                <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 2 }]}>Masalah : Risiko Hipotermia</Text>
                                                <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 5 }]}>BB Lahir : 2,5 kg</Text>
                                            </View>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                            <Image
                                                source={require("../../../assets/image/empty.png")}
                                                style={{ width: 100, height: 100 }}
                                                resizeMode="contain"
                                            />
                                            <View style={{ marginLeft: 15 }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Rafif Iqbal Shaputra</Text>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Ionicons name={'person'} size={17} color={colors.button} />
                                                    <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginLeft: 1 }]}>Ibu Selina Maurizka</Text>
                                                </View>
                                                <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 2 }]}>Masalah : Risiko Hipotermia</Text>
                                                <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 5 }]}>BB Lahir : 2,5 kg</Text>
                                            </View>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                            <Image
                                                source={require("../../../assets/image/empty.png")}
                                                style={{ width: 100, height: 100 }}
                                                resizeMode="contain"
                                            />
                                            <View style={{ marginLeft: 15 }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Rafif Iqbal Shaputra</Text>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Ionicons name={'person'} size={17} color={colors.button} />
                                                    <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginLeft: 1 }]}>Ibu Selina Maurizka</Text>
                                                </View>
                                                <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 2 }]}>Masalah : Risiko Hipotermia</Text>
                                                <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 5 }]}>BB Lahir : 2,5 kg</Text>
                                            </View>

                                        </TouchableOpacity>

                                    </View>)}
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};

export default Tambahrelasi;
