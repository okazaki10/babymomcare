import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp, faPlusSquare, faRoute, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Faq(props) {
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
    const ubahpasien = (index) => {
        if (index == 0) {
            props.navigation.navigate("Daftarbayi", { nama: "Edit Data Bayi" })
            global.add = 0
        } else if (index == 1) {
            props.navigation.navigate("Daftarortu", { nama: "Ubah Ortu" })
            global.add = 0
        } else if (index == 2) {
            props.navigation.navigate("Daftarakun", { nama: "Ubah Akun" })
            global.add = 0
        }
    }
    const tindakanpasien = (index) => {
        if (index == 0) {
            setisipesan("Pilih tindakan untuk data ini")
            toggleModal2()
        } else if (index == 1) {
            setisipesan("Pilih tindakan untuk data ini")
            toggleModal2()
        } else if (index == 2) {
            setisipesan("Pilih tindakan untuk data ini")
            toggleModal2()
        }
    }
    const addpasien = () => {
        props.navigation.navigate("Addforum", { nama: "Buat Tanya jawab" })
    }
    const forumdetail = () => {
        props.navigation.navigate("Forumdetail")
    }
    const [menuswitch, setmenuswitch] = useState(0)
    const [menuswitch2, setmenuswitch2] = useState(0)
    const [menuswitch3, setmenuswitch3] = useState(0)
    const gantidata = (index) => {
        setmenuswitch(index)
    }
    const [title2, settitle2] = useState("")
    const [description2, setdescription2] = useState("")
    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [anjuran, setanjuran] = useState("")
    const [note, setnote] = useState("")
    const [datakontrol, setdatakontrol] = useState("")
    const add_nurse_note = () => {
        setspinner(true)
        fetch(global.url + '/kontrol/nurse_note', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id,
                nurse_note: anjuran
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Catatan perawat berhasil diubah!")
                    toggleModal()
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const add_note = () => {
        setspinner(true)
        fetch(global.url + '/kontrol/patient_note', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id,
                note: note
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Catatan tambahan berhasil diubah!")
                    toggleModal()
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const lihatkontrol = () => {
        //setspinner(true)
        fetch(global.url + '/kontrol/show', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setdatakontrol(json.data)
                    setanjuran(json.data.nurse_note)
                    setnote(json.data.note)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const lihatresume = () => {
        //setspinner(true)
        fetch(global.url + '/kontrol/resume', {
            method: 'POST',
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
                    if (json.data) {
                        setdatakontrol(json.data)
                        setanjuran(json.data.nurse_note)
                    }
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const lihatresume2 = () => {
        //setspinner(true)
        fetch(global.url + '/kontrol/resume', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    if (json.data) {
                        setdatakontrol(json.data)
                        setanjuran(json.data.nurse_note)
                    }
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }


    return (
        <View style={style.main}>

            <StatusBar backgroundColor={colors.primary} />
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
            <Modal isVisible={isModalVisible2}
                onBackdropPress={toggleModal2}
                onBackButtonPress={toggleModal2}>
                <View style={style.content}>
                    <Text style={[style.nunitosans, { textAlign: "center" }]}>{isipesan}</Text>
                    <View style={{ flexDirection: "row", marginTop: 40 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Hapus" titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Batal" titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]} buttonStyle={{ backgroundColor: "white" }}>
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
                            <Text>Frequently Asked Question</Text>
                            <Text>Akun</Text>
                            <Text></Text>
                            <View style={[style.card, { flex: 1, marginLeft: 5 }]}>
                                {menuswitch == 1 ? (
                                    <Button icon={
                                        <View style={{ marginRight: 5 }}>
                                            <FontAwesomeIcon icon={faChevronUp} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="1.	Bagaimana cara daftar akun Catatan Bunda?" onPress={() => setmenuswitch(0)} buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                ) : (
                                    <Button icon={
                                        <View style={{ marginRight: 5 }}>
                                            <FontAwesomeIcon icon={faChevronDown} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="1.	Bagaimana cara daftar akun Catatan Bunda?" onPress={() => setmenuswitch(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                )}

                                {menuswitch == 1 ? (<Text style={{ marginTop: 15 }}>Untuk mendaftar akun catatan bunda, dapat menghubungi perawat yang bersangkutan agar didaftarkan</Text>) : (null)}
                            </View>
                            <View style={[style.card, { flex: 1, marginLeft: 5, marginTop: 20 }]}>
                                {menuswitch2 == 1 ? (
                                    <Button icon={
                                        <View style={{}}>
                                            <FontAwesomeIcon icon={faChevronUp} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="2.	Bagaimana cara saya menggunakan fitur Pengingat?" onPress={() => setmenuswitch2(0)} buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                ) : (
                                    <Button icon={
                                        <View style={{ }}>
                                            <FontAwesomeIcon icon={faChevronDown} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="2.	Bagaimana cara saya menggunakan fitur Pengingat?" onPress={() => setmenuswitch2(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                )}

                                {menuswitch2 == 1 ? (<Text style={{ marginTop: 15 }}>Untuk mengubah profil yang telat dibuat, dapat menguhubungi perawat yang bersangkutan</Text>) : (null)}
                            </View>
                            <View style={[style.card, { flex: 1, marginLeft: 5, marginTop: 20 }]}>
                                {menuswitch3 == 1 ? (
                                    <Button icon={
                                        <View style={{ }}>
                                            <FontAwesomeIcon icon={faChevronUp} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="3.	Apa yang harus dilakukan jika lupa password akun Catatan Bunda?" onPress={() => setmenuswitch3(0)} buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                ) : (
                                    <Button icon={
                                        <View style={{ }}>
                                            <FontAwesomeIcon icon={faChevronDown} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="3.	Apa yang harus dilakukan jika lupa password akun Catatan Bunda?" onPress={() => setmenuswitch3(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                )}

                                {menuswitch3 == 1 ? (<Text style={{ marginTop: 15 }}>Anda dapat menghubungi perawat yang bersangkutan untuk ganti password lama anda jika lupa</Text>) : (null)}
                            </View>

                            <Text style={{ marginTop: 15 }}>Pengingat</Text>
                            <Text>1.	Apa itu fitur Pengingat?</Text>
                            <Text>2.	Bagaimana cara saya menggunakan fitur Pengingat?</Text>
                            <Text>3.	Bagaimana jika notifikasi fitur Pengingat yang muncul terhapus secara tidak sengaja?</Text>
                            <Text>4.	Apakah saya dapat merubah Pengingat yang dibuat?</Text>
                            <Text>5.	Berapa lama durasi fitur Pengingat akan mengingatkan lagi jika pengguna mengklik  Snooze/tunda pada button Notifikasi?</Text>

                            <Text style={{ marginTop: 5 }}>Bagaimana privasi data kesehatan anak saya?</Text>
                            <Text style={{ marginTop: 5 }}>Apakah layanan Bicara dengan Perawat?</Text>
                            <Text style={{ marginTop: 5 }}>Bagaimana cara menggunakan fitur Bicara dengan Perawat?</Text>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};



export default Faq;
