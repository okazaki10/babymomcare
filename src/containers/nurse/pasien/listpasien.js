import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
function Listpasien(props) {
 
    const [isipesan, setisipesan] = useState("")


    const [spinner, setspinner] = useState(false)
    const [kosong, setkosong] = useState(false)
    const tindakanpasien = () => {

        setisipesan("Pilih tindakan untuk data ini")
        toggleModal2()

    }
    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [isModalVisible3, setModalVisible3] = useState(false);
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    const hapuspasien = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus pasien ini")
        toggleModal3()

    }
    const [datapasien, setdatapasien] = useState([{}])

    const lihatpasien = () => {
        //setspinner(true)
        fetch(global.url + '/nurse/index', {
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
                    setdatapasien(json.data)
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
        fetch(global.url + '/nurse/index', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.idls
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setdatapasien(json.data)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const [idpasien, setidpasien] = useState()
    const hapuspasien2 = () => {
        setspinner(true)
        fetch(global.url + '/nurse/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: idpasien,
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

    const lihatpasienadmin = () => {
        //setspinner(true)
        fetch(global.url + '/admin/list/patient-nurse2', {
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
                    setdatapasien(json.data)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }

    const setcari = (key) => {
        if (key) {
            if (global.status == 2) {
                fetch(global.url + '/nurse/search-patient', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + global.key,
                    },
                    body: JSON.stringify({
                        keyword: key,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json)
                        if (json.errors) {
                            ToastAndroid.show(json.message, ToastAndroid.SHORT)
                        } else {
                            setdatapasien(json)
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                        ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                    });
            } else if (global.status == 3 || global.status == 4) {
                fetch(global.url + '/admin/search-patient', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + global.key,
                    },
                    body: JSON.stringify({
                        keyword: key,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json)
                        if (json.errors) {
                            ToastAndroid.show(json.message, ToastAndroid.SHORT)
                        } else {
                            setdatapasien(json.data)
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                        ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                    });
            }
        } else {
            if (props.route.params?.idls) {
                lihatpasien2()
            } else if (props.route.params?.idadmin) {
                lihatpasienadmin()
            } else {
                lihatpasien()
            }
        }
    }

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            if (props.route.params?.idls) {
                lihatpasien2()
            } else if (props.route.params?.idadmin) {
                lihatpasienadmin()
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
                                <Button onPress={hapuspasien2} title="Iya" titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: "red", backgroundColor: "red" }]}></Button>
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
                            <Button onPress={hapuspasien} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
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
                            {kosong ? (<View>
                                <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', marginTop: 20 }}>
                                    <Image
                                        source={require("../../../assets/image/empty.png")}
                                        style={{ width: 100, height: 100 }}
                                        resizeMode="contain"
                                    />
                                    <Text style={[style.poppinsbold, { textAlign: "center", fontSize: 14, marginTop: 15 }]}>Anda belum memiliki pasien</Text>
                                </View>
                                <Button title="+ Tambah Pasien Baru" onPress={() => {
                                    global.add = 1
                                    props.navigation.navigate("Daftarakun")
                                }} buttonStyle={[style.button, { marginTop: 15 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                            </View>) : (
                                    <View>
                                        <View style={[style.card, { flexDirection: "row", alignItems: "center", marginRight: 3, marginLeft: 3, flex: 0 }]}>
                                            <Ionicons name={'search-outline'} size={24} color={colors.button} />
                                            <TextInput onChangeText={setcari} placeholder="Cari Pasien" style={{ flex: 1, padding: 0, marginLeft: 10 }}></TextInput>
                                        </View>
                                        <Button title="+ Tambah Pasien Baru" onPress={() => {
                                            global.add = 1
                                            props.navigation.navigate("Daftarakun")
                                        }} buttonStyle={[style.button, { marginTop: 15 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                        {datapasien.map((item) => item.id ? (
                                            <TouchableOpacity onLongPress={() => {
                                                setidpasien(item.id)
                                                tindakanpasien()
                                            }} style={[style.card, { marginTop: 15, flexDirection: "row" }]} onPress={() => {
                                                if (props.route.params?.mode == "kontrol") {
                                                    props.navigation.navigate("Datakontrol", { id: item.id })
                                                } else if (props.route.params?.mode == "resume") {
                                                    props.navigation.navigate("Detailresumepulang", { nama: "Ringkasan Pulang",id: item.id })
                                                } else if (props.route.params?.quiz) {
                                                    props.navigation.navigate("Lihathasilkuis", { id_pasien: item.id, lihatquiz: 1 })
                                                } else if (props.route.params?.survey) {
                                                    props.navigation.navigate("Lihathasilsurvey", { id_pasien: item.id, lihatsurvey: 1 })
                                                } else {
                                                    props.navigation.navigate("Datapasien", { id: item.id })
                                                }
                                            }}>

                                                <View style={{ marginLeft: 15 }}>
                                                    <Text style={[style.poppinsbold, { fontSize: 15 }]}>{item.baby_name}</Text>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Ionicons name={'person'} size={17} color={colors.button} />
                                                        <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginLeft: 1 }]}>Ibu {item.mother_name}</Text>
                                                    </View>

                                                    <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 5 }]}>BB Lahir : {item.born_weight} gram</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ) : (null))}


                                    </View>)}
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};

export default Listpasien;
