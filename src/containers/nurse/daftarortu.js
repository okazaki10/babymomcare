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
import { Picker } from '@react-native-picker/picker';
function Daftarortu(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [namaibu, setnamaibu] = useState("")
    const [umuribu, setumuribu] = useState("")
    const [agamaibu, setagamaibu] = useState("")
    const [sukuibu, setsukuibu] = useState("")
    const [pendidikanibu, setpendidikanibu] = useState("")
    const [pengalamanibu, setpengalamanibu] = useState("")
    const [namaayah, setnamaayah] = useState("")
    const [umurayah, setumurayah] = useState("")
    const [agamaayah, setagamaayah] = useState("")
    const [sukuayah, setsukuayah] = useState("")
    const [pendidikanayah, setpendidikanayah] = useState("")
    const [pengalamanayah, setpengalamanayah] = useState("")
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
    const [nilai, setnilai] = useState("")
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
                                source={require("../../assets/image/exit.png")}
                                style={{ width: 50, height: 50 }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={[style.nunitosans, { textAlign: "center", marginTop: 15 }]}>{isipesan}</Text>
                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1 }}>

                <ScrollView>
                    <View style={{ flex: 1, padding: 22 }}>
                        <View style={{ alignItems: "center" }}>
                            <Image
                                source={require("../../assets/image/register-pasien-3.png")}
                                style={{ width: "100%", height: DEVICE_WIDTH * 0.15 }}
                                resizeMode="stretch"
                            />
                        </View>
                        <Text style={[style.poppinsbold, { fontSize: 17, marginTop: 15 }]}>Data Ibu</Text>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 5 }]}>Nama Ibu</Text>
                        <TextInput onChangeText={setnamaibu} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Umur</Text>
                        <TextInput onChangeText={setumuribu} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Agama</Text>
                        <TextInput onChangeText={setagamaibu} style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Suku Bangsa</Text>
                        <TextInput onChangeText={setsukuibu} style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tingkat Pendidikan</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={pendidikanibu}
                                onValueChange={(itemValue, itemIndex) =>
                                    setpendidikanibu(itemValue)
                                }
                                mode="dropdown">
                                <Picker.Item label="Sarjana" value="sarjana" />
                                <Picker.Item label="Magister" value="magister" />
                                <Picker.Item label="Doktor" value="doktor" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Pengalaman Merawat Bayi</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={pendidikanayah}
                                onValueChange={(itemValue, itemIndex) =>
                                    setpendidikanayah(itemValue)
                                }
                                mode="dropdown">
                                <Picker.Item label="Pernah" value="pernah" />
                                <Picker.Item label="Tidak Pernah" value="tidak_pernah" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsbold, { fontSize: 17, marginTop: 15 }]}>Data Ayah</Text>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 5 }]}>Nama Ayah</Text>
                        <TextInput onChangeText={setnamaayah} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Umur</Text>
                        <TextInput onChangeText={setumurayah} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Agama</Text>
                        <TextInput onChangeText={setagamaayah} style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Suku Bangsa</Text>
                        <TextInput onChangeText={setsukuayah} style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tingkat Pendidikan</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={pendidikanayah}
                                onValueChange={(itemValue, itemIndex) =>
                                    setpendidikanayah(itemValue)
                                }
                                mode="dropdown">
                                <Picker.Item label="Sarjana" value="sarjana" />
                                <Picker.Item label="Magister" value="magister" />
                                <Picker.Item label="Doktor" value="doktor" />
                            </Picker>
                        </View>
                        
                    </View>
                </ScrollView>
                <View style={{ padding: 22, flexDirection: "row" }}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Button title="Kembali" onPress={() => props.navigation.goBack()} buttonStyle={[style.button, { backgroundColor: "#EFF3F7" }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Button title="Selanjutnya" onPress={login} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default Daftarortu;
