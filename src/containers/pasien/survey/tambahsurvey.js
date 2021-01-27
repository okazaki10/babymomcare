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
function Tambahsurvey(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [materi, setmateri] = useState("")
    const [halaman, sethalaman] = useState(props.route.params ? props.route.params.halaman : 5)
    const [judul, setjudul] = useState([])
    const [choice, setchoice] = useState([])
    const [opsi, setopsi] = useState([])
    const [opsi2, setopsi2] = useState([])
    const [opsi3, setopsi3] = useState([])
    const [opsi4, setopsi4] = useState([])
    const [jawabanbenar, setjawabanbenar] = useState([])


    const setjuduld = (index, value) => {
        const s = [...judul]
        s[index] = value
        setjudul(s)
    }
    const setchoiced = (index, value) => {
        const s = [...choice]
        s[index] = value
        setchoice(s)
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
    const setopsi4d = (index, value) => {
        const s = [...opsi4]
        s[index] = value
        setopsi4(s)
    }
    const setjawabanbenar2d = (index, value) => {
        const s = [...jawabanbenar]
        s[index] = value
        setjawabanbenar(s)
    }
    const [nomor, setnomor] = useState(0)
    const [kuis, setkuis] = useState([{}])
    useState(() => {
        if (global.add == 0) {
            sethalaman(kuis.length)
            var judul = []
            var soal1 = []
            var soal2 = []
            var soal3 = []
            var soal4 = []
            var jawabanbenar = []

            for (var i = 0; i < kuis.length; i++) {
                judul[i] = kuis[i].judul
                soal1[i] = kuis[i].soal1
                soal2[i] = kuis[i].soal2
                soal3[i] = kuis[i].soal3
                soal4[i] = kuis[i].soal4
                jawabanbenar[i] = kuis[i].jawabanbenar

            }
            setjudul(judul)
            setopsi(soal1)
            setopsi2(soal2)
            setopsi3(soal3)
            setopsi4(soal4)
            setjawabanbenar(jawabanbenar)

        } else {
            var choice = []
            for (var i = 0; i < props.route.params.halaman; i++) {
                choice[i] = "text"
            }
            setchoice(choice)
        }
    })
    const tambahnomor = () => {
        setnomor(nomor + 1)
    }
    const kurangnomor = () => {
        setnomor(nomor - 1)
    }
    const [selesai, setselesai] = useState(false)
    const kuisselesai = () => {
        setselesai(true)
    }

    const [spinner, setspinner] = useState(false)
    const [nilai, setnilai] = useState("")
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


    const login = () => {
        props.navigation.navigate("Mainpage")

    };
    const kuisdiubah = () => {
        setspinner(true)
        fetch(global.url + '/survey/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id_survey,
                title: props.route.params.kuis,
                questions: judul,
                choice_type: props.route.params.choice_type
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Data survey berhasil diubah!")
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
    const kuisdibuat = () => {
        setspinner(true)
        fetch(global.url + '/survey/store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                title: props.route.params.kuis,
                questions: judul,
                choice_type: props.route.params.choice_type
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
    const [id, setid] = useState("")
    const lihatkuis = () => {
        //setspinner(true)
        fetch(global.url + '/survey/show', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id_survey,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    sethalaman(json.length)
              
                    var judul = []
                    for (var i = 0; i < json.length; i++) {
                        judul[i] = json[i].question
                    }
                    setjudul(judul)

                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const kembali = () => {
        toggleModal()
        props.navigation.goBack()
    }
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            if (props.route.params) {
                if (props.route.params.id_survey) {
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
                            <Button title="Ok" onPress={kembali} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: colors.button2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1 }}>
                <Text style={[style.poppinsbold, { fontSize: 17, marginTop: 10, textAlign: "center" }]}>Pertanyaan ke {nomor + 1}</Text>
                <ScrollView>
                    <View style={{ flex: 1, padding: 22 }}>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 0 }]}>Judul Pertanyaan</Text>
                        <TextInput onChangeText={(item) => { setjuduld(nomor, item) }} value={judul[nomor]} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>


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



            </View>

        </View>
    );
};

export default Tambahsurvey;
