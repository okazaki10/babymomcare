import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { colors } from '../../globalstyles';
import style from '../../globalstyles';
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
import ImagePicker from 'react-native-image-picker';
function Tambahresume(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [tempatkontrol, settempatkontrol] = useState("")
    const [bb, setbb] = useState("")
    const [pb, setpb] = useState("")
    const [lk, setlk] = useState("")
    const [suhu, setsuhu] = useState("")
    const [ayd, setayd] = useState([""])
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
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
    const [gambar, setgambar] = useState("")
    const [hide, sethide] = useState(true)
    const [options, setoptions] = useState({
        title: 'Pilih Foto',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        quality: 0.5
    })
    const tambahanjuran = () => {
        setayd(index => [...index, ""])
    }
    const setanjuran = (index, value) => {
        const anjuran = [...ayd]
        anjuran[index] = value
        setayd(anjuran)
    }
    const resumediubah = () => {
        setisipesan("Resume Pulang berhasil diubah!")
        toggleModal()
    }
    const resumedibuat = () => {
        setisipesan("Resume Pulang berhasil dibuat!")
        toggleModal()
    }
    const gantiprofil = () => {
        if (global.status == 0) {
            ImagePicker.showImagePicker(options, (response) => {
                //console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    if (response.uri) {
                        sethide(false)
                        setgambar(response.uri)
                    }

                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                }
            });
        }
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
                                source={require("../../assets/image/check.png")}
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
                <ScrollView>
                    <View style={{ flex: 1, padding: 22 }}>
                        <Text style={[style.poppinsmedium, { fontSize: 14 }]}>Tanggal Kontrol Selanjutnya</Text>
                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity onPress={() => showDatepicker('date')} style={[style.card, { flexDirection: "row", alignItems: "center", marginTop: 20, elevation: 5 }]}>
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
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tempat Kontrol</Text>
                        <TextInput onChangeText={settempatkontrol} style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>

                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Berat Badan</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput onChangeText={setbb} style={{ padding: 0, marginLeft: 10 }} keyboardType="numeric"></TextInput>
                            <Text style={{ marginLeft: 5 }}>Kg</Text>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Panjang Badan</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput onChangeText={setpb} style={{ padding: 0, marginLeft: 10 }} keyboardType="numeric"></TextInput>
                            <Text style={{ marginLeft: 5 }}>cm</Text>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Lingkar Kepala</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput onChangeText={setlk} style={{ padding: 0, marginLeft: 10 }} keyboardType="numeric"></TextInput>
                            <Text style={{ marginLeft: 5 }}>cm</Text>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Suhu</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput onChangeText={setsuhu} style={{ padding: 0, marginLeft: 10 }} keyboardType="numeric"></TextInput>
                            <Text style={{ marginLeft: 5 }}>celcius</Text>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Anjuran Yang Diberikan</Text>
                        {ayd.map((item, index) =>
                            <View>
                                <TextInput onChangeText={(value) => { setanjuran(index, value) }} style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                            </View>)}
                        <TouchableOpacity onPress={tambahanjuran} style={{ alignItems: "flex-end", marginTop: 20 }}>
                            <Text style={[style.poppinsmedium, { fontSize: 14, textDecorationLine: "underline" }]}>+ Add Row</Text>
                        </TouchableOpacity>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Upload Foto Bayi</Text>
                        {hide ? (null) : (<Image
                            source={{ uri: gambar == "" ? "https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg" : gambar }}
                            style={{ width: "100%", height: DEVICE_WIDTH * 0.7 }}
                            resizeMode="cover"
                        ></Image>)}


                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Button title="Upload Foto" onPress={gantiprofil} buttonStyle={[style.button, { backgroundColor: "#C4C4C4" }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                            </View>
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: "center" }}>
                                <Text style={[style.poppinsmedium, { fontSize: 14 }]}>Pilih Foto</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ padding: 22, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        {global.add == 1 ? (<Button title="Simpan" onPress={resumedibuat} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>) : (
                            <Button title="Simpan" onPress={resumediubah} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>)}

                    </View>
                </View>
            </View>
        </View>
    );
};

export default Tambahresume;
