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
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
import { Linking } from 'react-native';
function Kelolasurvey(props) {

    const [isipesan, setisipesan] = useState("")


    const [spinner, setspinner] = useState(false)

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
    const [judul_kuis, setjudul_kuis] = useState("")
    const ubahkuis = () => {
        toggleModal2()
        props.navigation.navigate("Tambahsurvey", { nama: "Ubah Kuesioner", id_survey: id_survey, kuis: kuis, choice_type: choice, judul_kuis: judul_kuis })
        global.add = 0
    }

    const tambahkuis = () => {
        props.navigation.navigate("Tambahsurvey", { halaman: jumlah, choice_type: choice })
        global.add = 1
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
    const [google_form, setgoogle_form] = useState(false)
    const [link, setlink] = useState("")
    const [judul2, setjudul2] = useState("")
    const tambahkuislink = () => {
        setspinner(true)
        fetch(global.url + '/survey/store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                title: judul2,
                url: link,
                choice_type: choice
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Data kuis berhasil dibuat!")
                    toggleModal()
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


    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            lihatsurvey()
        }
    }, [isFocused])
    const [kuis, setkuis] = useState("")
    const [choice, setchoice] = useState("text")
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
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
                            <Button title="Ok" onPress={() => {
                                toggleModal()
                            }} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: colors.button2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
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
                    {global.status == 1 ? (null) : (

                        <View>
                            <Text style={[style.poppinsmedium, { fontSize: 14 }]}>Tipe Pertanyaan</Text>
                            <View style={[style.card, { elevation: 5, padding: 0, flex: 0, marginTop: 15 }]}>
                                <Picker
                                    selectedValue={choice}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setchoice(itemValue)
                                        if (itemValue == "link") {
                                            setgoogle_form(true)
                                        } else {
                                            setgoogle_form(false)
                                        }
                                    }
                                    }
                                    mode="dropdown">
                                    <Picker.Item label="Text" value="text" />
                                    <Picker.Item label="Angka" value="number" />
                                    <Picker.Item label="Iya/tidak" value="yes_no" />
                                    <Picker.Item label="Google Form" value="link" />
                                </Picker>
                            </View>
                            {google_form ? (<View>
                                <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Judul kuis</Text>
                                <TextInput onChangeText={setjudul2} value={judul2} placeholder="Judul" style={[style.card, { flex: 0, elevation: 5, marginTop: 15 }]}></TextInput>
                                <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Link google form</Text>
                                <TextInput onChangeText={setlink} value={link} placeholder="Link" autoCapitalize="none" style={[style.card, { flex: 0, elevation: 5, marginTop: 15 }]}></TextInput>


                                <Button title="+ Tambah Kuesioner" onPress={tambahkuislink} buttonStyle={[style.button, { marginTop: 25, marginBottom: 0 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>


                            </View>) : (
                                <View>
                                    <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Jumlah Halaman</Text>

                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ flex: 1, marginRight: 15 }}>
                                            <TextInput onChangeText={setjumlah} value={jumlah} placeholder="Total Halaman" autoCapitalize="none" style={[style.card, { elevation: 5 }]} keyboardType="numeric"></TextInput>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Button title="+ Tambah Kuesioner" onPress={tambahkuis} buttonStyle={[style.button, { marginBottom: 0 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                        </View>
                                    </View>
                                </View>
                            )}
                            <View style={[style.line]}></View>
                        </View>
                    )}

                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                {data.map(item => item.id ? (<TouchableOpacity onLongPress={() => {
                                    setid_survey(item.id)
                                    setjudul_kuis(item.title)
                                    tindakankuis()
                                }} onPress={() => {
                                    if (item.url) {

                                        Linking.openURL(item.url);

                                    } else {
                                        props.navigation.navigate("Kerjakansurvey", { id: item.id, choice_type: item.choice_type })
                                    }

                                }} style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                    <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 12 }]}>{item.title}</Text>
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

export default Kelolasurvey;
