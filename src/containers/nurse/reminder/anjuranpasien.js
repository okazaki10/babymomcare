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
import { useIsFocused } from '@react-navigation/native';
function Anjuranpasien(props) {
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

    const [spinner, setspinner] = useState(false)
    const [kosong, setkosong] = useState(false)
    const tambahanjuran = () => {
        props.navigation.navigate("Tambahanjuran")
    }
    const ubahanjuran = () => {
        props.navigation.navigate("Tambahanjuran", { nama: "Ubah Reminder" })
        global.add = 0
    }
    const [tindakan, settindakan] = useState({})
    const ubahanjuran2 = () => {
        props.navigation.navigate("Tambahanjuran", { nama: "Ubah Reminder", isinya: tindakan })
        global.add = 0
        toggleModal2()
    }

    const tindakananjuran = () => {
        if (global.status != 1) {
            setisipesan("Pilih tindakan untuk reminder ini")
            toggleModal2()
        }
    }
    const hapusanjuran = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus reminder ini")
        toggleModal3()
    }
    const [idhapus,setidhapus] = useState()
    const hapusanjuran2 = () => {
        setspinner(true)
        fetch(global.url + '/advice/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: idhapus,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    toggleModal3()
                    lihatanjuran()
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
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
    const [reminder, setreminder] = useState([{
        judul: "Memberikan asi",
        deskripsi: "asdasfasasdsas"
    }, {
        judul: "Memberikan asi",
        deskripsi: "asdasfasasdsas"
    }])
    const [collapse, setcollapse] = useState([])
    const tambahcollapse = () => {
        var coba = []
        for (var i = 0; i < reminder.length; i++) {
            coba[i] = true
        }
        setcollapse(coba)
    }
    const setkolom = (index) => {
        const collapse2 = [...collapse]
        collapse2[index] = !collapse2[index]
        setcollapse(collapse2)
    }
    useState(() => {
        tambahcollapse()
    })
    const [data, setdata] = useState([{}])
    const lihatanjuran = () => {
        //setspinner(true)
        fetch(global.url + '/advice/index', {
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


    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            lihatanjuran()
        }
    }, [isFocused])
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
                                <Button onPress={hapusanjuran2} title="Iya" titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: "red", backgroundColor: "red" }]}></Button>
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
                            <Button onPress={hapusanjuran} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={ubahanjuran2} title="Ubah" titleStyle={[style.nunitosans, { textAlign: "center", color: "#E3DB69" }]} buttonStyle={{ backgroundColor: "white" }}>
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
                    {global.status == 1 ? (null) :
                        (<Button title="+ Buat Anjuran Pasien" onPress={tambahanjuran} buttonStyle={[style.button, { marginBottom: 5 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>)
                    }

                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                {data.map((item, index) => item.id ? (
                                    <View><TouchableOpacity onLongPress={() => {
                                        setidhapus(item.id)
                                        settindakan({ id: item.id, name: item.name, description: item.description, frequency: item.frequency })
                                        tindakananjuran()
                                    }} onPress={() => { setkolom(index) }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 17 }]}>
                                        <Text style={[style.poppinsbold, { fontSize: 15, flex: 1 }]}>{item.name}</Text>
                                        {global.status == 2 ? (
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <View style={{ marginRight: 15 }}>
                                                    <Ionicons name={'pencil'} size={24} color={colors.grey} />
                                                </View>
                                                <View style={{ marginRight: 15 }}>
                                                    <Ionicons name={'trash'} size={24} color={colors.grey} />
                                                </View>

                                            </View>) : (null)}
                                    </TouchableOpacity>
                                        {
                                            collapse[index] == true ? (null) : (
                                                <View style={[style.card, { marginTop: 5, padding: 17 }]}>
                                                    <Text style={[style.nunitosans, { fontSize: 15 }]}>{item.description}</Text>
                                                </View>)
                                        }

                                    </View>
                                ) : (null))}




                            </View>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View >
    );
};

export default Anjuranpasien;
