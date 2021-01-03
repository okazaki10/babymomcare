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
function Pendaftarannurse(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [nama, setnama] = useState("")
    const [username, setusername] = useState("")
    const [pendidikanibu, setpendidikanibu] = useState("s1")
    const [password, setpassword] = useState("")
    const [alamat, setalamat] = useState("1")
    const [nomortelepon, setnomortelepon] = useState("")
    const [tempatrumahsakit, settempatrumahsakit] = useState("")
    const [lamabekerja, setlamabekerja] = useState("")

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

    const daftar = () => {



    };
    const [spinner, setspinner] = useState(false)
    const [nilai, setnilai] = useState("")
    const nursediubah = () => {
        setspinner(true)
        fetch(global.url + '/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                role: "nurse",
                username: username,
                password: password,
                nurse_name: nama,
                working_exp: lamabekerja,
                education: pendidikanibu,
                phone: nomortelepon,
                hospital_id: alamat
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setisipesan("Data nurse berhasil diubah!")
                toggleModal()
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });

    }
    const nursedibuat = () => {
        setspinner(true)
        fetch(global.url + '/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                role: "nurse",
                username: username,
                password: password,
                nurse_name: nama,
                working_exp: lamabekerja,
                education: pendidikanibu,
                phone: nomortelepon,
                hospital_id: 1
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Data nurse berhasil dibuat!")
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
        props.navigation.goBack()
        toggleModal()
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
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 0 }]}>Nama</Text>
                        <TextInput onChangeText={setnama} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Username</Text>
                        <TextInput onChangeText={setusername} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Password</Text>
                        <TextInput onChangeText={setpassword} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]} secureTextEntry={true}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Alamat Rumah Sakit</Text>

                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={alamat}
                                onValueChange={(itemValue, itemIndex) => {
                                    setalamat(itemValue)
                                    console.log(itemValue)
                                }

                                }
                                mode="dropdown">
                                <Picker.Item label="RSUD Kabupaten Tangerang" value="1" />
                                <Picker.Item label="RSUD dr. Chasbullah Abdulmadjid Kota Bekasi" value="2" />

                            </Picker>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tingkat Pendidikan</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={pendidikanibu}
                                onValueChange={(itemValue, itemIndex) => {
                                    setpendidikanibu(itemValue)
                                    console.log(itemValue)
                                }

                                }
                                mode="dropdown">
                                <Picker.Item label="SMP sederajat" value="smp" />
                                <Picker.Item label="SMA sederajat" value="sma" />
                                <Picker.Item label="Diploma" value="diploma" />
                                <Picker.Item label="Sarjana" value="s1" />
                                <Picker.Item label="Magister" value="s2" />
                                <Picker.Item label="Doktor" value="s3" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Nomor Telepon</Text>
                        <TextInput onChangeText={setnomortelepon} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]} keyboardType="numeric"></TextInput>
                        {/*<Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tempat Rumah Sakit</Text>
                        <TextInput onChangeText={settempatrumahsakit} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>*/}
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Lama Bekerja</Text>
                        <TextInput onChangeText={setlamabekerja} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]} keyboardType="numeric"></TextInput>



                    </View>
                </ScrollView>
                <View style={{ padding: 22 }}>
                    {global.add == 1 ? (
                        <Button title="Daftar" onPress={nursedibuat} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                    ) : (
                            <Button title="Simpan" onPress={nursediubah} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>)}

                </View>
            </View>

        </View>
    );
};

export default Pendaftarannurse;
