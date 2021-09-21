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

function Changepassword(props) {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [password, setpassword] = useState("")
    const [new_password, setnew_password] = useState("")
    const [confirm, setconfirm] = useState("")
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };



    const [spinner, setspinner] = useState(false)


    const gantipassword = () => {
        if (new_password == confirm) {
            setspinner(true)
            fetch(global.url + '/password/update', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + global.key,
                },
                body: JSON.stringify({
                    password: password,
                    new_password: new_password
                })
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    if (json.errors) {
                        ToastAndroid.show(json.message, ToastAndroid.SHORT)
                    } else {
                        setisipesan("Password berhasil diubah!")
                        toggleModal()
                    }
                    setspinner(false)
                })
                .catch((error) => {
                    console.error(error)
                    ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                    setspinner(false)
                });
        } else {
            ToastAndroid.show("Konfirmasi password tidak sama", ToastAndroid.SHORT)
        }
    }
    const kembali = () => {
        toggleModal()
        props.navigation.goBack()
    }
    useState(() => {
        if (global.add == 0) {
            if (props.route.params?.pass) {

            }
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
                <ScrollView>
                    <View style={{ flex: 1, padding: 22 }}>

                        <Text style={[style.poppinsmedium, { fontSize: 14 }]}>Password lama</Text>
                        <TextInput onChangeText={setpassword} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]} secureTextEntry={true}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Password baru</Text>
                        <TextInput onChangeText={setnew_password} autoCapitalize="none" secureTextEntry={true} style={[style.card, { elevation: 5, marginTop: 10 }]} secureTextEntry={true}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Konfirmasi password baru</Text>
                        <TextInput onChangeText={setconfirm} autoCapitalize="none" secureTextEntry={true} style={[style.card, { elevation: 5, marginTop: 10 }]} secureTextEntry={true}></TextInput>

                    </View>
                </ScrollView>

                <View style={{ padding: 22 }}>
                    <Button title="Simpan" onPress={gantipassword} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                </View>


            </View>

        </View>
    );
};

export default Changepassword;
