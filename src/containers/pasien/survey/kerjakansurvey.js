import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFrown, faThumbsUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from 'react-native-reanimated';
function Kerjakansurvey(props) {
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
    const tambahkontrol = () => {
        global.mode = "kontrol"
        props.navigation.navigate("Tambahresume", { nama: "Tambah data kontrol" })
    }
    const ubahkontrol = () => {
        global.mode = "kontrol"
        global.add = 0
        props.navigation.navigate("Tambahresume", { nama: "Ubah data kontrol" })
        toggleModal2()
    }
    const tindakankontrol = () => {

        setisipesan("Pilih tindakan untuk resume ini")
        toggleModal2()

    }
    const hapuskontrol = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus konten ini")
        toggleModal3()

    }
    const detailkontrol = () => {
        global.mode = "kontrol"
        props.navigation.navigate("Detailresumepulang", { nama: "Detail data kontrol" })
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
    const [jawaban, setjawaban] = useState([])
    const [id_soal, setid_soal] = useState([])
    const [kuis, setkuis] = useState([{
        judul: "bagaimana cara memandikan bayi yang benar",
        soal1: "a",
        soal2: "asa",
        soal3: "sadaa",
        soal4: "asda"
    }, {
        judul: "bagaimaasd asd asandikan bayi yang benar",
        soal1: "s12aa",
        soal2: "aa21sasa",
        soal3: "sa312daa",
        soal4: "as1122da"
    }])
    const [listjawaban, setlistjawaban] = useState([0, 1, 2, 3, 4])
    const [listjawaban2, setlistjawaban2] = useState(["Tidak Pernah", "Jarang", "Kadang-kadang", "Sering", "Selalu"])
    const pilih = (index, value, id) => {
        const s = [...jawaban]
        const c = [...id_soal]
        s[index] = value
        c[index] = id
        setjawaban(s)
        setid_soal(c)
    }
    const [nomor, setnomor] = useState(0)
    useState(() => {
        /*for (var i = 0; i < kuis.length; i++) {
            setjawaban(index => [...index, ""])
        }*/
    })
    const tambahnomor = () => {
        setnomor(nomor + 1)
    }
    const kurangnomor = () => {
        setnomor(nomor - 1)
    }
    const [selesai, setselesai] = useState(false)
    const kuisselesai2 = () => {
        setselesai(true)
    }
    const [data, setdata] = useState([{}])
    const lihatsurvey = () => {
        setspinner(true)
        fetch(global.url + '/survey/show', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                title: props.route.params.id,
            })
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
    const kuisselesai = () => {
        setspinner(true)
        fetch(global.url + '/survey/answer/store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: id_soal,
                answers: jawaban
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    //setdata(json)
                    setisipesan("Survey telah terisi!")
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
    useState(() => {
        lihatsurvey()
    })
    const kembali = () => {
        props.navigation.goBack()
    }
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
                            <Button onPress={hapuskontrol} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={ubahkontrol} title="Ubah" titleStyle={[style.nunitosans, { textAlign: "center", color: "#E3DB69" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Batal" titleStyle={[style.nunitosans, { textAlign: "center", color: "black" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
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
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, padding: 20 }}>
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            {data[nomor] ? (<View>
                                <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginLeft: 15, marginTop: 0, textAlign: "center", color: colors.button }]}>Pertanyaan {nomor + 1}</Text>
                                <View style={[style.card, { padding: 22, marginTop: 15 }]}>
                                    <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginTop: 0, textAlign: "center" }]}>{data[nomor].question}</Text>
                                </View>

                                <View style={[style.card, { padding: 22, marginTop: 15 }]}>

                                    {listjawaban.map((item,index) => (
                                        jawaban[nomor] == item ? (
                                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                                                <View style={{ width: 15, height: 15, borderRadius: 50, backgroundColor: colors.primary, borderWidth: 1, borderColor: colors.button }}></View>
                                                <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginLeft: 15, marginTop: 0 }]}>{data[nomor].choice_type == "number"?item:listjawaban2[index]}</Text>
                                            </TouchableOpacity>
                                        ) : (
                                                <TouchableOpacity onPress={() => { pilih(nomor, item, data[nomor].id) }} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                                                    <View style={{ width: 15, height: 15, borderRadius: 50, backgroundColor: "white", borderWidth: 1, borderColor: colors.button }}></View>
                                                    <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginLeft: 15, marginTop: 0 }]}>{data[nomor].choice_type == "number"?item:listjawaban2[index]}</Text>
                                                </TouchableOpacity>
                                            )
                                    ))}

                                </View>
                                <View style={{ flexDirection: "row", marginTop: 20 }}>
                                    <View style={{ flex: 1, marginRight: 10 }}>
                                        {nomor > 0 ? (
                                            <Button title="Kembali" onPress={kurangnomor} buttonStyle={[style.button, { backgroundColor: "#EFF3F7" }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                        ) : (null)}
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        {nomor >= kuis.length ? (
                                            <Button title="Selesai" onPress={kuisselesai} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                        ) : (
                                                <Button title="Selanjutnya" onPress={tambahnomor} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>)}

                                    </View>
                                </View>
                            </View>
                            ) : (<Text>Survey belum dibuat</Text>)}



                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Kerjakansurvey;
