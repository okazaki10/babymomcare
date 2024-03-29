import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { useIsFocused } from '@react-navigation/native';
function Datakontrol(props) {

    const [isipesan, setisipesan] = useState("")

    const [spinner, setspinner] = useState(false)
    const [kosong, setkosong] = useState(false)
    const tambahkontrol = () => {
        global.mode = "kontrol"
        global.add = 1
        props.navigation.navigate("Tambahresume", { nama: "Tambah data kontrol" })
    }
    const ubahkontrol = () => {
        global.mode = "kontrol"
        global.add = 0
        props.navigation.navigate("Tambahresume", { nama: "Ubah data kontrol", id: idd })
        toggleModal2()
    }

    const tindakankontrol = () => {
        setisipesan("Pilih tindakan")
        toggleModal2()

    }
    const hapuskontrol = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus konten ini")
        toggleModal3()

    }
    const detailkontrol = (id) => {
        global.mode = "kontrol"
        props.navigation.navigate("Detailresumepulang", { nama: "Detail data kontrol", id: id })
    }

    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [isModalVisible3, setModalVisible3] = useState(false);
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    const [datakontrol, setdatakontrol] = useState([{}])
    const lihatkontrol = () => {
        //setspinner(true)
        fetch(global.url + '/kontrol/index', {
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
                    setdatakontrol(json.data)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const lihatkontrol2 = () => {
        //setspinner(true)
        fetch(global.url + '/kontrol/index', {
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
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const [idd, setidd] = useState()
    const hapus = () => {
        setspinner(true)
        fetch(global.url + '/kontrol/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: idd,
                mode: "kontrol"
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    toggleModal3()
                    if (global.status == 1) {
                        lihatkontrol()
                    } else {
                        lihatkontrol2()
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
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            if (global.status == 1) {
                lihatkontrol()
            } else {
                lihatkontrol2()
            }
        }
    }, [isFocused])
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
                                <Button onPress={hapus} title="Iya" titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: "red", backgroundColor: "red" }]}></Button>
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
                        {global.status == 1 ? (null) : (
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Button onPress={hapuskontrol} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                            </View>
                        )}
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
                                    <Text style={[style.poppinsbold, { textAlign: "center", fontSize: 14, marginTop: 15 }]}>Anda belum memiliki data kontrol</Text>
                                </View>
                                {global.status == 1 ? (
                                    <Button title="+ Tambah Data Kontrol" onPress={tambahkontrol} buttonStyle={[style.button, { marginTop: 0 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                ) : (null)}
                            </View>) : (
                                <View>
                                    {global.status == 1 ? (
                                        <Button title="+ Tambah Data Kontrol" onPress={tambahkontrol} buttonStyle={[style.button, { marginTop: 0 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                    ) : (null)}
                                    {datakontrol.map((item) => item.id ? (<TouchableOpacity style={[style.card, { padding: 22, marginTop: 15 }]} onLongPress={() => {
                                        setidd(item.id)
                                        tindakankontrol()
                                    }} onPress={() => { detailkontrol(item.id) }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Kontrol Ke-{item.order}</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Tanggal kontrol</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {item.date}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Catatan Tambahan</Text>
                                            <Text style={{ marginTop: 15 }}>: </Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>{item.note}</Text>
                                        </View>
                                        {/*
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Masalah Keperawatan</Text>
                                            <Text style={{ marginTop: 15 }}>: </Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>{item.nurse_note}</Text>
                                        </View>
                                        */}
                                        <Text style={[style.nunitosans, style.datapasien, { textAlign: "right", textDecorationLine: "underline" }]}>Lihat Selengkapnya</Text>
                                    </TouchableOpacity>) : (null))}

                                </View>)}
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};

export default Datakontrol;
