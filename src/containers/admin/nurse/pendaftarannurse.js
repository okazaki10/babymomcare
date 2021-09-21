import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { TextInput } from 'react-native-gesture-handler';

import { Picker } from '@react-native-picker/picker';
function Pendaftarannurse(props) {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [nama, setnama] = useState("")
    const [username, setusername] = useState("")
    const [pendidikanibu, setpendidikanibu] = useState("D3")
    const [password, setpassword] = useState("")
    const [konfirmasi_password, setkonfirmasi_password] = useState("")
    const [alamat, setalamat] = useState("1")
    const [nomortelepon, setnomortelepon] = useState("")

    const [lamabekerja, setlamabekerja] = useState("")

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [spinner, setspinner] = useState(false)

    const nursediubah = () => {
        setspinner(true)
        fetch(global.url + '/nurse/data/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id_nurse,
                name: nama,
                password: password,
                working_exp: lamabekerja,
                education: pendidikanibu,
                phone: nomortelepon,
                hospital_id: alamat
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Data nurse berhasil diubah!")
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
    const nursedibuat = () => {
        if (password != konfirmasi_password) {
            ToastAndroid.show("Konfirmasi password tidak sama", ToastAndroid.SHORT)

        } else {
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
    }
    const kembali = () => {
        props.navigation.goBack()
        toggleModal()
    }
    const lihatnurse = () => {
        setspinner(true)
        fetch(global.url + '/admin/nurse/show', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id_nurse
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setnama(json.data.name)
                    setalamat(json.data.hospital_id.toString())
                    setnomortelepon(json.data.phone.toString())
                    setlamabekerja(json.data.working_exp.toString())
                    setpendidikanibu(json.data.education)
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

        if (props.route.params?.id_nurse) {
            lihatnurse()
        }

    })
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
                        <TextInput value={nama} onChangeText={setnama} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        {global.add == 1 ? (<View>
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Username</Text>
                            <TextInput value={username} onChangeText={setusername} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        </View>) : (null)}
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Password</Text>
                        <TextInput onChangeText={setpassword} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]} secureTextEntry={true}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Konfirmasi Password</Text>
                        <TextInput onChangeText={setkonfirmasi_password} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]} secureTextEntry={true}></TextInput>
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
                                <Picker.Item label="RSUD Kabupaten Bekasi" value="3" />
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
                                <Picker.Item label="D3" value="D3" />
                                <Picker.Item label="Ners" value="Ners" />
                                <Picker.Item label="Spesialis" value="Spesialis" />


                            </Picker>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Nomor Telepon</Text>
                        <TextInput value={nomortelepon} onChangeText={setnomortelepon} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]} keyboardType="numeric"></TextInput>

                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Lama Bekerja (dalam tahun)</Text>
                        <TextInput value={lamabekerja} onChangeText={setlamabekerja} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]} keyboardType="numeric"></TextInput>



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
