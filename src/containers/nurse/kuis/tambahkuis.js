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
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
function Tambahkuis(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [materi, setmateri] = useState("")
    const [halaman, sethalaman] = useState(props.route.params ? props.route.params.halaman : 5)
    const [id, setid] = useState("")
    const [judul, setjudul] = useState([])
    const [opsi, setopsi] = useState([])
    const [opsi2, setopsi2] = useState([])
    const [opsi3, setopsi3] = useState([])
    const [judulid, setjudulid] = useState([])
    const [opsiid, setopsiid] = useState([])
    const [opsi2id, setopsi2id] = useState([])
    const [opsi3id, setopsi3id] = useState([])
    const [jawabanbenar, setjawabanbenar] = useState([])

    const setjuduld = (index, value) => {
        const s = [...judul]
        s[index] = value
        setjudul(s)
    }
    const setopsid = (index, value) => {
        const s = [...opsi]
        s[index] = value
        setopsi(s)
    }
    const setopsi2d = (index, value) => {
        const s = [...opsi2]
        s[index] = value
        setopsi2(s)
    }
    const setopsi3d = (index, value) => {
        const s = [...opsi3]
        s[index] = value
        setopsi3(s)
    }

    const setjawabanbenar2d = (index, value) => {
        const s = [...jawabanbenar]
        s[index] = value
        setjawabanbenar(s)
    }
    const [nomor, setnomor] = useState(0)
    useState(() => {

        if (global.add == 0) {


        } else {
            var jawabanbenar = []
            for (var i = 0; i < props.route.params.halaman; i++) {
                jawabanbenar[i] = "choice1"
            }
            setjawabanbenar(jawabanbenar)
        }

    })
    const tambahnomor = () => {
        setnomor(nomor + 1)
    }
    const kurangnomor = () => {
        setnomor(nomor - 1)
    }


    const [spinner, setspinner] = useState(false)
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [title, settitle] = useState("")
    const kuisdibuat = () => {
        setspinner(true)
        fetch(global.url + '/quiz/store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                title: title,
                materi_id: props.route.params.id,
                questions: judul,
                choice1: opsi,
                choice2: opsi2,
                choice3: opsi3,
                is_true: jawabanbenar
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

                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }

    const kuisdiubah = () => {

        setspinner(true)
        fetch(global.url + '/quiz/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                quizId: id,
                title: title,
                questionId: judulid,
                questions: judul,
                choice1Id: opsiid,
                choice1: opsi,
                choice2Id: opsi2id,
                choice2: opsi2,
                choice3Id: opsi3id,
                choice3: opsi3
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Data kuis berhasil diubah!")
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

    const [data, setdata] = useState({})
    const lihatkuis = () => {
        //setspinner(true)
        fetch(global.url + '/quiz/show', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id_kuis,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    sethalaman(json.data.questions.length)
                    setid(json.data.quiz_id)
                    var judul = []
                    var soal1 = []
                    var soal2 = []
                    var soal3 = []
                    var judulid = []
                    var soal1id = []
                    var soal2id = []
                    var soal3id = []

                    for (var i = 0; i < json.data.questions.length; i++) {
                        judul[i] = json.data.questions[i].question
                        soal1[i] = json.data.questions[i].choice[0].choice
                        soal2[i] = json.data.questions[i].choice[1].choice
                        soal3[i] = json.data.questions[i].choice[2].choice
                        judulid[i] = json.data.questions[i].id
                        soal1id[i] = json.data.questions[i].choice[0].id
                        soal2id[i] = json.data.questions[i].choice[1].id
                        soal3id[i] = json.data.questions[i].choice[2].id

                    }
                    setjudul(judul)
                    setopsi(soal1)
                    setopsi2(soal2)
                    setopsi3(soal3)
                    setjudulid(judulid)
                    setopsiid(soal1id)
                    setopsi2id(soal2id)
                    setopsi3id(soal3id)
                    settitle(json.data.title)
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
            if (props.route.params) {
                if (props.route.params.id_kuis) {
                    lihatkuis()
                }
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
                                props.navigation.goBack()
                            }} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: colors.button2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1 }}>
                <View style={{ padding: 22 }}>
                    <TextInput placeholder={"Judul Kuis"} onChangeText={settitle} value={title} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10, flex: 0 }]}></TextInput>
                </View>
                <ScrollView>
                <Text style={[style.poppinsbold, { fontSize: 17, textAlign: "center" }]}>Pertanyaan ke {nomor + 1}</Text>
                    <View style={{ flex: 1, padding: 22 }}>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 0 }]}>Judul Pertanyaan</Text>
                        <TextInput onChangeText={(item) => { setjuduld(nomor, item) }} value={judul[nomor]} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Opsi 1</Text>
                        <TextInput onChangeText={(item) => { setopsid(nomor, item) }} value={opsi[nomor]} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Opsi 2</Text>
                        <TextInput onChangeText={(item) => { setopsi2d(nomor, item) }} value={opsi2[nomor]} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Opsi 3</Text>
                        <TextInput onChangeText={(item) => { setopsi3d(nomor, item) }} value={opsi3[nomor]} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        {global.add == 1 ? (<View>
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Jawaban Benar</Text>
                            <View style={[style.card, { elevation: 5, padding: 0 }]}>
                                <Picker
                                    selectedValue={jawabanbenar[nomor]}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setjawabanbenar2d(nomor, itemValue)
                                    }
                                    mode="dropdown">
                                    <Picker.Item label="Opsi 1" value="choice1" />
                                    <Picker.Item label="Opsi 2" value="choice2" />
                                    <Picker.Item label="Opsi 3" value="choice3" />
                                </Picker>
                            </View>
                        </View>) : (null)}

                    </View>
                </ScrollView>

                <View style={{ flexDirection: "row", marginTop: 20, marginRight: 22, marginLeft: 22 }}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        {nomor > 0 ? (
                            <Button title="Kembali" onPress={kurangnomor} buttonStyle={[style.button, { backgroundColor: "#EFF3F7" }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                        ) : (null)}
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        {nomor >= halaman - 1 ? (
                            global.add == 1 ? (
                                <Button title="Selesai" onPress={kuisdibuat} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                            ) : (
                                    <Button title="Selesai" onPress={kuisdiubah} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                )
                        ) : (
                                <Button title="Selanjutnya" onPress={tambahnomor} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>)}
                    </View>
                </View>
                {/*
                <View style={{ padding: 22 }}>
                    {global.add == 1 ? (
                        <Button title="Simpan" onPress={kuisdibuat} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                    ) : (
                            <Button title="Simpan" onPress={kuisdiubah} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                        )}
                </View>
                    */}

            </View>

        </View>
    );
};

export default Tambahkuis;
