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
function Daftarortu(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [namaibu, setnamaibu] = useState("")
    const [agamaibu, setagamaibu] = useState("")
    const [pendidikanibu, setpendidikanibu] = useState("sarjana")
    const [pengalamanibu, setpengalamanibu] = useState("")
    const [pekerjaanibu, setpekerjaanibu] = useState("")
    const [paritas, setparitas] = useState("")
    const [namaayah, setnamaayah] = useState("")
    const [agamaayah, setagamaayah] = useState("")
    const [pendidikanayah, setpendidikanayah] = useState("sarjana")
    const [pengalamanayah, setpengalamanayah] = useState("")
    const [pekerjaanayah, setpekerjaanayah] = useState("")
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show2, setShow2] = useState(false);
    const [date2, setDate2] = useState(new Date());
    const [mode2, setMode2] = useState('date');
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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = (tipe) => {
        setMode(tipe);
        setShow(true);
    };
    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow2(Platform.OS === 'ios');
        setDate2(currentDate);
    };

    const showDatepicker2 = (tipe) => {
        setMode2(tipe);
        setShow2(true);
    };
    const login = () => {
        props.navigation.navigate("Mainpage")
        /*
        setspinner(true)
        fetch(global.url + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                device_name: "xavier"
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.role == "colleger") {
                    global.status = 0
                    storeData(json.token)
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Menu_bar' }],
                    });
                } else if (json.role == "admin") {
                    global.status = 1
                    storeData(json.token)
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Menu_bar' }],
                    });
                } else {
                    toggleModal()
                    setisipesan("Email atau password salah")
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
            */
    };
    const [spinner, setspinner] = useState(false)
    const [nilai, setnilai] = useState("")
    const pasiendiubah = () => {
        setisipesan("Data ortu berhasil diubah!")
        toggleModal()
    }
    const pasiendibuat = () => {
        setspinner(true)
        fetch(global.url + '/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                role: "patient",
                username: props.route.params.username,
                password: props.route.params.password,
                baby_name: global.baby_name,
                baby_birthday: global.baby_birthday,
                born_weight: global.born_weight,
                born_length: global.born_length,
                baby_gender: global.baby_gender,
                mother_name: namaibu,
                mother_birthday: format(date, "yyyy-MM-dd HH:mm:ss"),
                mother_religion: agamaibu,
                mother_education: pendidikanibu,
                mother_job: pekerjaanibu,
                paritas: paritas,
                father_name: namaayah,
                father_birthday: format(date2, "yyyy-MM-dd HH:mm:ss"),
                father_religion: agamaayah,
                father_education: pendidikanayah,
                father_job: pekerjaanayah,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Data pasien berhasil dibuat!")
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
    const kembali = () => {
        props.navigation.navigate("Menubar")
        toggleModal()
    }
    return (
        <View style={style.main}>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            {show2 && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date2}
                    mode={mode2}
                    is24Hour={true}
                    display="default"
                    onChange={onChange2}
                />
            )}
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <Modal isVisible={isModalVisible}
                onBackdropPress={kembali}
                onBackButtonPress={kembali}>
                <View style={style.content}>
                    <View>
                        <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={kembali}>
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

                <ScrollView>
                    <View style={{ flex: 1, padding: 22 }}>
                        {global.add == 1 ? (<View style={{ alignItems: "center" }}>
                            <Image
                                source={require("../../../assets/image/register-pasien-3.png")}
                                style={{ width: "100%", height: DEVICE_WIDTH * 0.15 }}
                                resizeMode="stretch"
                            />
                        </View>) : (null)}
                        <Text style={[style.poppinsbold, { fontSize: 17, marginTop: 15 }]}>Data Ibu</Text>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 5 }]}>Nama Ibu</Text>
                        <TextInput onChangeText={setnamaibu} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Tanggal lahir ibu</Text>
                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity onPress={() => showDatepicker('date')} style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
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
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Pekerjaan</Text>
                        <TextInput onChangeText={setpekerjaanibu} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>

                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tingkat Pendidikan</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={pendidikanibu}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setpendidikanibu(itemValue)
                                    console.log(itemValue)
                                }
                                }
                                mode="dropdown">
                                <Picker.Item label="Sarjana" value="sarjana" />
                                <Picker.Item label="Magister" value="magister" />
                                <Picker.Item label="Doktor" value="doktor" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Agama</Text>
                        <TextInput onChangeText={setagamaibu} style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Paritas</Text>
                        <TextInput onChangeText={setparitas} style={[style.card, { elevation: 5, marginTop: 10 }]} keyboardType="numeric"></TextInput>
                        <Text style={[style.poppinsbold, { fontSize: 17, marginTop: 15 }]}>Data Ayah</Text>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 5 }]}>Nama Ayah</Text>
                        <TextInput onChangeText={setnamaayah} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Tanggal lahir ayah</Text>
                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity onPress={() => showDatepicker2('date')} style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={[style.nunitosansemi, { fontSize: 15, color: "black", textDecorationLine: "underline" }]}>{format(date2, "dd'/'MM'/'yyyy'", { locale: id })}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-end" }}>
                                    <Ionicons name={'calendar-outline'} size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                            <View style={{ justifyContent: "flex-end", marginLeft: 10 }}>
                                <TouchableOpacity onPress={() => setDate2(new Date())}>
                                    <Text style={[style.nunitosans, { fontSize: 12, textDecorationLine: "underline" }]}>Set as Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Pekerjaan</Text>
                        <TextInput onChangeText={setpekerjaanayah} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tingkat Pendidikan</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={pendidikanayah}
                                onValueChange={(itemValue, itemIndex) => {
                                    setpendidikanayah(itemValue)
                                    console.log(itemValue)
                                }
                                }
                                mode="dropdown">
                                <Picker.Item label="Sarjana" value="sarjana" />
                                <Picker.Item label="Magister" value="magister" />
                                <Picker.Item label="Doktor" value="doktor" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Agama</Text>
                        <TextInput onChangeText={setagamaayah} style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                    </View>
                </ScrollView>

                {global.add == 1 ? (
                    <View style={{ padding: 22, flexDirection: "row" }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Button title="Kembali" onPress={() => props.navigation.goBack()} buttonStyle={[style.button, { backgroundColor: "#EFF3F7" }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Button title="Simpan" onPress={pasiendibuat} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                        </View>
                    </View>) : (
                        <View style={{ padding: 22 }}>
                            <Button title="Simpan" onPress={pasiendiubah} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                        </View>)}


            </View>

        </View>
    );
};

export default Daftarortu;
