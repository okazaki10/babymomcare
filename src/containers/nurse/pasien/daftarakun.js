import React, { useRef, useState } from 'react';
import { View, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { TextInput } from 'react-native-gesture-handler';
import MultiSelect from 'react-native-multiple-select';
function Daftarakun(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [email, setemail] = useState("")
    const [nohp, setnohp] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [konfirmasi_password, setkonfirmasi_password] = useState("")
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [items, setitems] = useState([{}])
    const [selectedItems, setselectedItems] = useState([])

    const onSelectedItemsChange = (selectedItems) => {
        setselectedItems(selectedItems)
        console.log(selectedItems)
    };

    const referensi = useRef()
    const [spinner, setspinner] = useState(false)
    const lanjut = () => {
        if (password != konfirmasi_password) {
            ToastAndroid.show("Konfirmasi password tidak sama", ToastAndroid.SHORT)
        } else if (username.includes(" ")) {
            ToastAndroid.show("Username tidak boleh ada spasi", ToastAndroid.SHORT)
        } else{
            if (username && password) {
                global.emaild = email
                global.nohpd = nohp
                global.rekomendasi = selectedItems
                props.navigation.navigate("Daftarbayi", { username: username, password: password, selectedItems: selectedItems })
            } else {
                ToastAndroid.show("Pastikan data tidak ada yang kosong", ToastAndroid.SHORT)
            }
        }
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
                phone: nohp,
                email: email,
                password: password
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
                    if (selectedItems) {
                        assignmateri(props.route.params.id)
                    } else {
                        setisipesan("Data pasien berhasil diubah!")
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

    const lihatmateri = () => {
        //setspinner(true)
        fetch(global.url + '/register/list', {
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
                    setitems(json.data)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
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
                    setemail(json.data.email)
                    setnohp(json.data.phone.toString())
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }

    const assignmateri = (id_pasien) => {
        setspinner(true)
        fetch(global.url + '/register/materi', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: id_pasien,
                materis: selectedItems
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

    useState(() => {
        if (global.add == 0) {
            lihatpasien()
        }
        lihatmateri()

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
                        {props.route.params?.mode == "materi" ? (<View>
                            {global.add == 0 ? (<View style={{ marginTop: 30 }}>
                                <MultiSelect
                                    hideTags
                                    items={items}
                                    uniqueKey="id"
                                    ref={referensi}
                                    onSelectedItemsChange={onSelectedItemsChange}
                                    selectedItems={selectedItems}
                                    selectText="Pilih Rekomendasi Materi"
                                    searchInputPlaceholderText="Pilih Materi..."
                                    onChangeInput={(text) => console.log(text)}
                                    submitButtonText="Submit"
                                />
                            </View>) : (null)}
                        </View>) : (<View>
                            {global.add == 1 ? (<View style={{ alignItems: "center" }}>
                                <Image
                                    source={require("../../../assets/image/register-pasien-1.png")}
                                    style={{ width: "100%", height: DEVICE_WIDTH * 0.15 }}
                                    resizeMode="stretch"
                                />
                            </View>) : (null)}
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Email</Text>
                            <TextInput value={email} onChangeText={setemail} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]} keyboardType="email-address"></TextInput>
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>No hp</Text>
                            <TextInput value={nohp} onChangeText={setnohp} style={[style.card, { elevation: 5, marginTop: 10 }]} keyboardType="numeric"></TextInput>
                            {global.add == 1 ? (
                                <View>
                                    <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Username</Text>
                                    <TextInput onChangeText={setusername} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                                </View>) : (null)}
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Password</Text>
                            <TextInput onChangeText={setpassword} secureTextEntry={true} style={[style.card, { elevation: 5, marginTop: 10 }]} autoCapitalize="none"></TextInput>
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Konfirmasi Password</Text>
                            <TextInput onChangeText={setkonfirmasi_password} secureTextEntry={true} style={[style.card, { elevation: 5, marginTop: 10 }]} autoCapitalize="none"></TextInput>
                        </View>)}



                    </View>
                </ScrollView>

                {global.add == 1 ? (
                    <View style={{ padding: 22, flexDirection: "row" }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Button title="Batalkan" onPress={() => { props.navigation.goBack() }} buttonStyle={[style.button, { backgroundColor: "#EFF3F7" }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Button title="Selanjutnya" onPress={lanjut} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                        </View>
                    </View>
                ) : (
                    <View style={{ padding: 22 }}>
                        <Button title="Simpan" onPress={pasiendiubah} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                    </View>
                )}

            </View>

        </View>
    );
};

export default Daftarakun;
