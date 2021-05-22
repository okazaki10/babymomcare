import React, { useEffect, useState } from 'react';
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
import { useIsFocused } from '@react-navigation/native';
function Lihathasilkuis(props) {
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

    const [spinner, setspinner] = useState(false)
    const [kosong, setkosong] = useState(false)
    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const tindakankuis = () => {
        if (global.status != 1) {
            setisipesan("Pilih tindakan untuk data ini")
            toggleModal2()
        }
    }
    const [id_survey, setid_survey] = useState("")
    const ubahkuis = () => {
        if (kuis == "") {
            ToastAndroid.show("Masukkan judul kuisioner", ToastAndroid.SHORT)
        } else {
            toggleModal2()
            props.navigation.navigate("Tambahsurvey", { nama: "Ubah Survey", id_survey: id_survey, kuis: kuis, choice_type: choice })
            global.add = 0
        }
    }

    const tambahkuis = () => {
        if (kuis == "") {
            ToastAndroid.show("Masukkan judul kuisioner", ToastAndroid.SHORT)
        } else {
            props.navigation.navigate("Tambahsurvey", { halaman: jumlah, kuis: kuis, choice_type: choice })
            global.add = 1
        }
    }


    const hapuskuis = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus kuis ini")
        toggleModal3()

    }

    const hapus2 = () => {
        setspinner(true)
        fetch(global.url + '/survey/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: id_survey,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    toggleModal3()
                    lihatsurvey()
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const [isModalVisible3, setModalVisible3] = useState(false);
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    const [jumlah, setjumlah] = useState("5")
    const [data, setdata] = useState([{}])
    const lihatsurvey = () => {
        //setspinner(true)
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
    const lihatsurveypasien = () => {
        //setspinner(true)
        fetch(global.url + '/admin/survey/list', {
            method: 'POST   ',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                patient_id: props.route.params.id_pasien,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setdata(json.data)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const lihatquizpasien = () => {
        //setspinner(true)
        fetch(global.url + '/admin/quiz/list', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                patient_id: props.route.params.id_pasien
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



    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            lihatquizpasien()
        }
    }, [isFocused])
    const [kuis, setkuis] = useState("")
    const [choice, setchoice] = useState("text")
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
                                <Button onPress={hapus2} title="Iya" titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: "red", backgroundColor: "red" }]}></Button>
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
                            <Button onPress={ubahkuis} title="Ubah" titleStyle={[style.nunitosans, { textAlign: "center", color: "#E3DB69" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
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
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                
                                {data.map(item => item.quiz_id ? (<TouchableOpacity onPress={() => {
                                    //props.navigation.navigate("Kerjakankuis", { id: item.quiz_id,lihatquiz:1 })
                                }} style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                    <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 12 }]}>{item.quiz}</Text>
                                        <Text style={[style.poppinsbold, { fontSize: 12 }]}>Jawaban Benar = {item.point}/{item.total}</Text>
                                        <Text style={[style.poppinsbold, style.datapasien2, { marginTop: 0}]}>Nilai = {(100 * (item.point / item.total)).toString().substr(0,4)}</Text>
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
                                </TouchableOpacity>) : (null))}


                            </View>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View >
    );
};

export default Lihathasilkuis;
