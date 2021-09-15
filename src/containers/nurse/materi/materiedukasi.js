import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { colors } from '../../../globalstyles';
import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { useIsFocused } from '@react-navigation/native'

function Materiedukasi(props) {

    const [spinner, setspinner] = useState(false)

    const [isipesan, setisipesan] = useState("")
    const tambahmateri = () => {
        global.add = 1
        props.navigation.navigate("Tambahkategori")
    }
    const [judul, setjudul] = useState("")
    const [gambar, setgambar] = useState("")
    const ubahmateri = () => {
        global.add = 0
        props.navigation.navigate("Tambahkategori", { nama: "Ubah kategori", id: id_kategori, judul: judul, gambar: gambar })
        toggleModal2()
    }

    const tindakankontrol = () => {
        if (global.status != 1) {
            setisipesan("Pilih tindakan untuk materi ini")
            toggleModal2()
        }
    }

    const hapusmateri = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus materi ini")
        toggleModal3()

    }
    const [id_kategori, setid_kategori] = useState()
    const hapus2 = () => {
        setspinner(true)
        fetch(global.url + '/materi/category/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: id_kategori,
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


    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [isModalVisible3, setModalVisible3] = useState(false);
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    const [data, setdata] = useState([{}])
    const lihatkategori = () => {
        //setspinner(true)
        fetch(global.url + '/materi/category', {
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
            lihatkategori()
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
                            <Button onPress={hapusmateri} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={ubahmateri} title="Ubah" titleStyle={[style.nunitosans, { textAlign: "center", color: "#E3DB69" }]} buttonStyle={{ backgroundColor: "white" }}>
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

                {global.status == 2 || global.status == 3 || global.status == 4 ? (<View>
                    <Text style={[style.poppinsbold, { fontSize: 20, marginTop: 20, textAlign: "center" }]}>Kategori Materi</Text>
                    <View style={[style.line, { height: 3, backgroundColor: '#ECECEC' }]}></View>
                </View>) : (null)}
                <ScrollView>
                    <View style={{ flex: 0, padding: 22 }}>
                        {global.status == 1 ? (null) : (<View><Button title="+ Tambah Kategori Materi" onPress={tambahmateri} buttonStyle={[style.button, { marginTop: 0, marginBottom: 15 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                            <View style={[style.line, { marginTop: 0, marginBottom: 15 }]}></View>
                        </View>)}

        
                            <View style={{ flex: 1 }}>

                                {data.map((item) => item.id ? (<TouchableOpacity onPress={() => { props.navigation.navigate("Judulmateri", { id: item.id }) }}
                                    onLongPress={() => {
                                        setid_kategori(item.id)
                                        setjudul(item.name)
                                        setgambar(item.image)
                                        tindakankontrol()
                                    }}
                                    style={[style.card, { marginBottom: 15, flexDirection: "row", backgroundColor: colors.button, flex: 0 }]} >
                                    <Image
                                        source={{ uri: item.image ? item.image : "https://nameproscdn.com/a/2018/05/106343_82907bfea9fe97e84861e2ee7c5b4f5b.png" }}
                                        style={{ width: 35, height: 35, borderRadius: 50 }}
                                        resizeMode="cover"
                                    />
                                    <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 14, color: "white" }]}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>) : (null))}

                            </View>


                    </View>
                </ScrollView>
            </View>

        </View>
    );
};

export default Materiedukasi;
