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
function Kelolakuis(props) {

    const [isipesan, setisipesan] = useState("")

    const [spinner, setspinner] = useState(false)

    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const tindakankuis = () => {
        setisipesan("Pilih tindakan untuk data ini")
        toggleModal2()
    }
    const [id_kuis, setid_kuis] = useState("")
    const ubahkuis = () => {
        toggleModal2()
        global.add = 0
        props.navigation.navigate("Tambahkuis", { nama: "Ubah kuis", id_kuis: id_kuis })

    }


    const hapuskuis = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus kuis ini")
        toggleModal3()

    }

    const hapus2 = () => {
        setspinner(true)
        fetch(global.url + '/quiz/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: id_kuis,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    toggleModal3()
                    lihatkategori()
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
    const lihatkategori = () => {
        //setspinner(true)
        fetch(global.url + '/materi/index', {
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
                console.log(JSON.stringify(json.data))
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
    const lihatquiz = () => {
        //setspinner(true)
        fetch(global.url + '/quiz/index', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json))
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
    const setcari = (key) => {
        if (props.route.params?.lihatkuis) {
            fetch(global.url + '/quiz/search', {
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
                        setdata(json)
                    }
                })
                .catch((error) => {
                    console.error(error)
                    ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                });
        } else {
            fetch(global.url + '/materi/search', {
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
                        setdata(json.data)
                    }
                })
                .catch((error) => {
                    console.error(error)
                    ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                });
        }
    }

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            if (props.route.params?.lihatkuis) {
                lihatquiz()
            } else {
                lihatkategori()
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
                    <View style={[style.card, { flexDirection: "row", alignItems: "center", marginRight: 3, marginLeft: 3, flex: 0, marginBottom: 15 }]}>
                        <TextInput onChangeText={setcari} placeholder="Cari Kuis" style={{ flex: 1, padding: 0, marginLeft: 10 }}></TextInput>
                        <Ionicons name={'search-outline'} size={24} color={colors.grey} />
                    </View>
                    {global.status == 1 ? (null) : (
                        <View >

                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 0 }]}>Jumlah Soal</Text>

                            <TextInput onChangeText={setjumlah} value={jumlah} placeholder="Total Soal" autoCapitalize="none" style={[style.card, { elevation: 5, flex: 0, marginTop: 15 }]} keyboardType="numeric"></TextInput>

                        </View>
                    )}
                    <View style={[style.line]}></View>
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                {data.map((item) => item.id ? (<TouchableOpacity onLongPress={() => {
                                    if (item.quiz) {
                                        setid_kuis(item.quiz.id)
                                        tindakankuis()
                                    }
                                }} onPress={() => {
                                    if (props.route.params.lihatquiz) {
                                        props.navigation.navigate("Kerjakankuis", { id: item.quiz.id, lihatquiz: 1, id_pasien: props.route.params.id_pasien })
                                    } else {
                                        if (item.quiz) {
                                            if (global.status == 1) {
                                                props.navigation.navigate("Kerjakankuis", { id: item.quiz.id })
                                            }
                                        } else if (item.materi_id) {
                                            if (global.status == 1) {
                                                props.navigation.navigate("Kerjakankuis", { id: item.id })
                                            }
                                        } else {
                                            global.add = 1
                                            props.navigation.navigate("Tambahkuis", { halaman: jumlah, id: item.id })
                                        }
                                    }

                                }} style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                    <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 12 }]}>{item.title}</Text>
                                    </View>
                                    {item.quiz || item.materi_id ? (<View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ marginRight: 15 }}>
                                            <Ionicons name={'pencil'} size={24} color={colors.grey} />
                                        </View>
                                        <View style={{ marginRight: 15 }}>
                                            <Ionicons name={'trash'} size={24} color={colors.grey} />
                                        </View>
                                    </View>) : (<View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ marginRight: 15 }}>
                                            <Ionicons name={'add'} size={24} color={colors.grey} />
                                        </View>
                                    </View>)}

                                </TouchableOpacity>) : (null))}


                            </View>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};

export default Kelolakuis;
