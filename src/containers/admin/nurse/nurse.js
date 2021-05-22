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
function Nurse(props) {
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
    const tambahnurse = () => {
        global.add = 1
        props.navigation.navigate("Pendaftarannurse")
    }
    const ubahnurse = () => {
        global.add = 0
        props.navigation.navigate("Pendaftarannurse", { nama: "Nurse", id_nurse: id })
        toggleModal2()
    }
    const lihatnurse = () => {
        props.navigation.navigate("Tabnurse", { nama: "Nurse" })
    }
    const tindakannurse = () => {
        setisipesan("Pilih tindakan untuk nurse ini")
        toggleModal2()
    }
    const hapusnurse = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus nurse ini")
        toggleModal3()
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
    const [isModalVisible4, setModalVisible4] = useState(false);
    const toggleModal4 = () => {
        setModalVisible4(!isModalVisible4);
    };
    const [data, setdata] = useState([{}])
    const [id, setid] = useState("")
    const [idpromote, setidpromote] = useState("")
    const hapusnurse2 = () => {
        setspinner(true)
        fetch(global.url + '/admin/nurse/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: id,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    toggleModal3()
                    lihatpasien()
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const promote = () => {
        setspinner(true)
        fetch(global.url + '/admin/promote', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: idpromote,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    toggleModal4()
                    lihatpasien()
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const demote = () => {
        setspinner(true)
        fetch(global.url + '/admin/demote', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: idpromote,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    toggleModal4()
                    lihatpasien()
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const approve = () => {
        setspinner(true)
        fetch(global.url + '/admin/approve-nurse', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: id,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    toggleModal2()
                    lihatpasien2()
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const lihatpasien = () => {
        //setspinner(true)
        fetch(global.url + '/admin/list/approved-nurse', {
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
    const lihatpasien2 = () => {
        //setspinner(true)
        fetch(global.url + '/admin/list/unapproved-nurse', {
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
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            if (props.route.params?.approved) {
                lihatpasien2()
            } else {
                lihatpasien()
            }
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
            <Modal isVisible={isModalVisible4}
                onBackdropPress={toggleModal4}
                onBackButtonPress={toggleModal4}>
                <View style={style.content}>
                    <Text style={[style.nunitosans, { textAlign: "center" }]}>{isipesan}</Text>
                    <View style={{ flexDirection: "row", marginTop: 40 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={promote} title="Promote" titleStyle={[style.nunitosans, { textAlign: "center", color: "blue" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={demote} title="Demote" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Batal" titleStyle={[style.nunitosans, { textAlign: "center", color: "black" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
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
                                <Button onPress={hapusnurse2} title="Iya" titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: "red", backgroundColor: "red" }]}></Button>
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
                            <Button onPress={hapusnurse} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={ubahnurse} title="Ubah" titleStyle={[style.nunitosans, { textAlign: "center", color: "#E3DB69" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                        {props.route.params?.approved ? (null) : (
                            global.status == 4 ? (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Button onPress={() => {
                                    toggleModal4()
                                    toggleModal2()
                                }} title="Promote" titleStyle={[style.nunitosans, { textAlign: "center", color: "blue" }]} buttonStyle={{ backgroundColor: "white" }}>
                                </Button>
                            </View>) : (null)
                        )}

                        {props.route.params?.approved ? (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={approve} title="Aprrove" titleStyle={[style.nunitosans, { textAlign: "center", color: "blue" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>) : (null)}
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Batal" titleStyle={[style.nunitosans, { textAlign: "center", color: "black" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, padding: 20 }}>
                    <Button title="+ Daftar Perawat" onPress={tambahnurse} buttonStyle={[style.button, { marginBottom: 5 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                {data.map((item) => item.id ? (<TouchableOpacity onLongPress={() => {
                                    setid(item.id)
                                    setidpromote(item.user_id)
                                    tindakannurse()
                                }
                                } onPress={() => {
                                    if (props.route.params?.mode) {
                                        props.navigation.navigate("Listpasien", { idls: item.id, mode: props.route.params.mode })
                                    } else {
                                        global.nurse_id = item.id
                                        props.navigation.navigate("Tabnurse", { nama: "Nurse" })
                                    }
                                }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0 }]}>
                                    <Image
                                        source={require("../../../assets/image/profilcewe.png")}
                                        style={{ width: 45, height: 65, marginLeft: 15 }}
                                        resizeMode="contain"
                                    />
                                    <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>{item.name}</Text>
                                        <Text style={[style.nunitosans, { fontSize: 15 }]}>{item.role}</Text>
                                        <Text style={[style.nunitosans, { fontSize: 11 }]}>{item.is_approved == true ? "disetujui" : "belum disetujui"}</Text>
                                    </View>
                                </TouchableOpacity>) : (null))}



                            </View>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};

export default Nurse;