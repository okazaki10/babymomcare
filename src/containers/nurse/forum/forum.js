import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Forumdetail from './forumdetail';
import { useIsFocused } from '@react-navigation/native';
function Forum(props) {
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

    const forumdetail = () => {
        props.navigation.navigate("Forumdetail", { id: props.route.params.id })
    }
    const tambahforum = () => {
        props.navigation.navigate("Addforum", { nama: "Buat Forum", id: props.route.params.id })
    }
    const [id_forum,setid_forum] = useState()
    const ubahforum = () => {
        global.add = 0
        props.navigation.navigate("Addforum", { nama: "Ubah Forum",id:props.route.params.id,id_forum:id_forum })
        toggleModal2()
    }
    const tindakanforum = () => {
        if (global.status != 1) {
            setisipesan("Pilih tindakan untuk forum ini")
            toggleModal2()
        }
    }
    
    const hapusforum = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus forum ini")
        toggleModal3()
    }
    const hapus2 = () => {
        setspinner(true)
        fetch(global.url + '/forum/delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: id_forum,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    toggleModal3()
                    lihatforum()
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
    const [data, setdata] = useState([{}])
    const lihatforum = () => {
        //setspinner(true)
        fetch(global.url + '/forum/index', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                topic_id: props.route.params.id
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

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            lihatforum()
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
                            <Button onPress={hapusforum} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={ubahforum} title="Ubah" titleStyle={[style.nunitosans, { textAlign: "center", color: "#E3DB69" }]} buttonStyle={{ backgroundColor: "white" }}>
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
                    <View style={{ flexDirection: "row" }}>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", marginRight: 3, marginLeft: 3, flex: 1 }]}>
                            <Ionicons name={'search-outline'} size={24} color={colors.grey} />
                            <TextInput onChangeText={setcari} placeholder="Cari Pertanyaan" style={{ flex: 1, padding: 0, marginLeft: 10 }}></TextInput>
                        </View>
                        <TouchableOpacity onPress={tambahforum} style={[style.card, { flexDirection: "row", alignItems: "center", marginRight: 3, marginLeft: 3, flex: 0, elevation: 10 }]}>
                            <Ionicons name={'add-circle-outline'} size={24} color="#92B1CD" />
                        </TouchableOpacity>

                    </View>
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                {data.map((item) => item.id?(<TouchableOpacity onLongPress={()=>{
                                    setid_forum(item.id)
                                    tindakanforum()
                                }} onPress={() => { props.navigation.navigate("Forumdetail", { id: item.id, nama: item.user }) }} style={[style.card, { marginTop: 15, flexDirection: "row", elevation: 5 }]}>
                                    <Image
                                        source={require("../../../assets/image/empty.png")}
                                        style={{ width: 40, height: 40 }}
                                        resizeMode="contain"
                                    />
                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15, color: colors.judulforum, paddingRight: 50 }]}>{item.title}</Text>
                                        <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginTop: 2, paddingRight: 50 }]}>Oleh: {item.user}</Text>
                                        <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginTop: 5, paddingRight: 50 }]}>{item.question}</Text>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                            <Ionicons name={'chatbox-outline'} size={24} color={colors.grey} style={{ marginRight: 5 }} />
                                            <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginRight: 5 }]}>{item.total_comment}</Text>
                                            <Ionicons name={'pencil-outline'} size={24} color={colors.grey} />
                                        </View>
                                    </View>
                                </TouchableOpacity>):(null))}


                            </View>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};

export default Forum;
