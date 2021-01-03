import React, { useState } from 'react';
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
function Tambahkuis(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [materi, setmateri] = useState("")
    const [halaman,sethalaman] = useState(props.route.params ? props.route.params.halaman : 5)
    const [judul, setjudul] = useState([])
    const [opsi, setopsi] = useState([])
    const [opsi2, setopsi2] = useState([])
    const [opsi3, setopsi3] = useState([])
    const [opsi4, setopsi4] = useState([])
    const [jawabanbenar, setjawabanbenar] = useState([])

    const kuisdiubah = () => {
        setisipesan("Data kuis berhasil diubah!")
        toggleModal()
    }
    
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
    const [kuis, setkuis] = useState([{
        judul: "bagaimana cara memandikan bayi yang benar",
        soal1: "aasd",
        soal2: "asa",
        soal3: "sadaa",
        soal4: "asda",
        jawabanbenar: "opsi2"
    }, {
        judul: "bagaimaasd asd asandikan bayi yang benar",
        soal1: "s12aa",
        soal2: "aa21sasa",
        soal3: "sa312daa",
        soal4: "as1122da",
        jawabanbenar: "opsi1"
    }])
    useState(() => {
        if (global.add == 0) {
            sethalaman(kuis.length)
            var judul = []
            var soal1 = []
            var soal2 = []
            var soal3 = []
            var soal4 = []
 
            for (var i=0; i < kuis.length; i++) {
                judul[i] = kuis[i].judul
                soal1[i] = kuis[i].soal1
                soal2[i] = kuis[i].soal2
                soal3[i] = kuis[i].soal3
                soal4[i] = kuis[i].soal4
                
            }
            setjudul(judul)
            setopsi(soal1)
            setopsi2(soal2)
            setopsi3(soal3)
            setopsi4(soal4)
          
        }else{
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
    const [selesai, setselesai] = useState(false)
    const kuisselesai = () => {
        setselesai(true)
    }

    const [spinner, setspinner] = useState(false)
    const [nilai, setnilai] = useState("")
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

 
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
                title: "kuisioner_1",
                materi_id:props.route.params.id,
                questions: judul,
                choice1:opsi,
                choice2:opsi2,
                choice3:opsi3,
                is_true:jawabanbenar
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
                            <Button title="Ok" onPress={toggleModal} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: colors.button2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
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
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Opsi 1</Text>
                        <TextInput onChangeText={(item) => { setopsid(nomor, item) }} value={opsi[nomor]} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Opsi 2</Text>
                        <TextInput onChangeText={(item) => { setopsi2d(nomor, item) }} value={opsi2[nomor]} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Opsi 3</Text>
                        <TextInput onChangeText={(item) => { setopsi3d(nomor, item) }} value={opsi3[nomor]} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        
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
