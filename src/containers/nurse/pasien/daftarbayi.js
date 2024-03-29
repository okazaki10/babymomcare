import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { TextInput } from 'react-native-gesture-handler';

import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'
function Daftarbayi(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [nama, setnama] = useState("")

    const [jenis_kelamin, setjenis_kelamin] = useState("male")
    const [diharapkan, setdiharapkan] = useState("1")
    const [pjl, setpjl] = useState("")
    const [lk, setlk] = useState("")
    const [gestas, setgestas] = useState("")
    const [bbnow, setbbnow] = useState("")
    const [diagnosamedis, setdiagnosamedis] = useState("")

    const [date, setDate] = useState(new Date());

    const [hospitaldate, sethospitaldate] = useState(new Date());
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };





    const [spinner, setspinner] = useState(false)



    const lanjut = () => {
        if (nama && bbnow && pjl && jenis_kelamin && diharapkan && gestas && lk) {
            global.baby_name = nama
            global.baby_birthday = format(date, "yyyy-MM-dd HH:mm:ss")
            global.born_weight = bbnow
            global.born_length = pjl
            global.baby_gender = jenis_kelamin
            global.diharapkan = diharapkan
            global.gestas = gestas
            global.lk = lk
            global.diagnosa_medis = diagnosamedis
            global.hospital_entry = hospitaldate
            props.navigation.navigate("Daftarortu", { username: props.route.params.username, password: props.route.params.password, selectedItems: props.route.params.selectedItems })
        } else {
            ToastAndroid.show("Pastikan data tidak ada yang kosong", ToastAndroid.SHORT)
        }
    }
    const lihatpasien = () => {
        setspinner(true)
        fetch(global.url + '/nurse/show', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    //setdata(json.data)
                    setnama(json.data.baby_name)
                    setDate(parseISO(json.data.baby_birthday))
                    sethospitaldate(parseISO(json.data.hospital_entry))
                    setbbnow(json.data.born_weight.toString())
                    setpjl(json.data.born_length.toString())
                    setjenis_kelamin(json.data.baby_gender)
                    setdiharapkan(json.data.harapan_orangtua.toString())
                    setgestas(json.data.usia_gestas.toString())
                    setlk(json.data.lingkar_kepala_lahir.toString())

                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const pasiendiubah = () => {
        setspinner(true)
        fetch(global.url + '/patient/data/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                role: "patient",
                id: props.route.params.id,
                baby_name: nama,
                baby_birthday: format(date, "yyyy-MM-dd HH:mm:ss"),
                born_weight: bbnow,
                born_length: pjl,
                baby_gender: jenis_kelamin,
                usia_gestas: gestas,
                lingkar_kepala: lk,
                harapan_orangtua: diharapkan,
                hospital_entry: hospitaldate

            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    if (json.errors.username) {
                        ToastAndroid.show(json.errors.username[0], ToastAndroid.SHORT)
                    } else {
                        ToastAndroid.show(json.message, ToastAndroid.SHORT)
                    }
                } else {
                    if (props.route.params.selectedItems) {
                        assignmateri(json.id)
                    } else {
                        setisipesan("Data bayi berhasil diubah!")
                        toggleModal()
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
    useState(() => {
        if (global.add == 0) {
            lihatpasien()
        }
    })
    const [isModalVisible4, setModalVisible4] = useState(false);
    const toggleModal4 = () => {
        setModalVisible4(!isModalVisible4);
    };
    const [isModalVisible5, setModalVisible5] = useState(false);
    const toggleModal5 = () => {
        setModalVisible5(!isModalVisible5);
    };
    return (
        <View style={style.main}>

            <Modal isVisible={isModalVisible5}
                onBackdropPress={toggleModal5}
                onBackButtonPress={toggleModal5}>
                <View style={style.content}>
                    <View>
                        <DatePicker
                            date={hospitaldate}
                            onDateChange={sethospitaldate}
                            mode="date"
                        />
                    </View>
                </View>
            </Modal>
            <Modal isVisible={isModalVisible4}
                onBackdropPress={toggleModal4}
                onBackButtonPress={toggleModal4}>
                <View style={style.content}>
                    <View>
                        <DatePicker
                            date={date}
                            onDateChange={setDate}
                            mode="date"
                        />
                    </View>
                </View>
            </Modal>
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
                <ScrollView>
                    <View style={{ flex: 1, padding: 22 }}>
                        {global.add == 1 ? (<View style={{ alignItems: "center" }}>
                            <Image
                                source={require("../../../assets/image/register-pasien-2.png")}
                                style={{ width: "100%", height: DEVICE_WIDTH * 0.15 }}
                                resizeMode="stretch"
                            />
                        </View>) : (null)}

                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Nama</Text>
                        <TextInput value={nama} onChangeText={setnama} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>

                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tanggal Lahir</Text>
                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity onPress={toggleModal4} style={[style.card, { flexDirection: "row", alignItems: "center", marginTop: 20, elevation: 5 }]}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={[style.nunitosansemi, { fontSize: 15, color: "black", textDecorationLine: "underline" }]}>{format(date, "dd'/'MM'/'yyyy'", { locale: id })}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-end" }}>
                                    <Ionicons name={'calendar-outline'} size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                            <View style={{ justifyContent: "flex-end", marginLeft: 10 }}>
                                <TouchableOpacity onPress={() => setDate(new Date())}>
                                    <Text style={[style.nunitosans, { fontSize: 12, textDecorationLine: "underline" }]}>Set as Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Jenis Kelamin</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={jenis_kelamin}
                                onValueChange={(itemValue, itemIndex) => {
                                    setjenis_kelamin(itemValue)
                                    console.log(itemValue)
                                }
                                }
                                mode="dropdown">
                                <Picker.Item label="Laki Laki" value="male" />
                                <Picker.Item label="Perempuan" value="female" />
                            </Picker>
                        </View>

                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Panjang badan lahir</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput value={pjl} onChangeText={setpjl} style={{ padding: 0, marginLeft: 10, flex: 1 }} keyboardType="numeric"></TextInput>
                            <Text style={{ marginLeft: 5 }}>Cm</Text>
                        </View>

                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Berat badan Lahir</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput value={bbnow} onChangeText={setbbnow} style={{ padding: 0, marginLeft: 10, flex: 1 }} keyboardType="numeric"></TextInput>
                            <Text style={{ marginLeft: 5 }}>gram</Text>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Lingkar kepala lahir</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput value={lk} onChangeText={setlk} style={{ padding: 0, marginLeft: 10, flex: 1 }} keyboardType="numeric"></TextInput>
                            <Text style={{ marginLeft: 5 }}>Cm</Text>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Usia gestasi (dalam minggu)</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput value={gestas} onChangeText={setgestas} style={{ padding: 0, marginLeft: 10, flex: 1 }} keyboardType="numeric"></TextInput>
                            <Text style={{ marginLeft: 5 }}>Minggu</Text>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Apakah diharapkan orang tua?</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={diharapkan}
                                onValueChange={(itemValue, itemIndex) => {
                                    setdiharapkan(itemValue)
                                    console.log(itemValue)
                                }
                                }
                                mode="dropdown">
                                <Picker.Item label="Ya" value="1" />
                                <Picker.Item label="Tidak" value="0" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Diagnosa medis</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput value={diagnosamedis} onChangeText={setdiagnosamedis} style={{ padding: 0, marginLeft: 10, flex: 1 }}></TextInput>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tanggal masuk rumah sakit</Text>
                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity onPress={toggleModal5} style={[style.card, { flexDirection: "row", alignItems: "center", marginTop: 20, elevation: 5 }]}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={[style.nunitosansemi, { fontSize: 15, color: "black", textDecorationLine: "underline" }]}>{format(hospitaldate, "dd'/'MM'/'yyyy'", { locale: id })}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-end" }}>
                                    <Ionicons name={'calendar-outline'} size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                            <View style={{ justifyContent: "flex-end", marginLeft: 10 }}>
                                <TouchableOpacity onPress={() => sethospitaldate(new Date())}>
                                    <Text style={[style.nunitosans, { fontSize: 12, textDecorationLine: "underline" }]}>Set as Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {global.add == 1 ? (
                    <View style={{ padding: 22, flexDirection: "row" }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Button title="Kembali" onPress={() => props.navigation.goBack()} buttonStyle={[style.button, { backgroundColor: "#EFF3F7" }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Button title="Selanjutnya" onPress={lanjut} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                        </View>
                    </View>) : (<View style={{ padding: 22 }}>
                        <Button title="Simpan" onPress={pasiendiubah} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                    </View>)}


            </View>
        </View>
    );
};

export default Daftarbayi;
