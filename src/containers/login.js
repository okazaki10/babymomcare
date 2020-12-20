import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../globalstyles';

import style from '../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
function Login(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
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
        if (username == "a") {
            props.navigation.navigate("Menubar")
            global.status = 2
        } else if (username == "b") {
            props.navigation.navigate("Menubarpasien")
            global.status = 1
        } else if (username == "c") {
            props.navigation.navigate("Menubaradmin")
            global.status = 3
        }
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
                                source={require("../assets/image/exit.png")}
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
                    <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', marginTop: 50 }}>
                        <Image
                            source={require("../assets/image/baby.png")}
                            style={{ width: "50%", height: DEVICE_WIDTH * 0.40 }}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={{ flex: 1, marginTop: 10, padding: 22 }}>
                        <Text style={[style.poppinsbold, { textAlign: "center", fontSize: 18 }]}>Aplikasi Berat Badan Lahir Rendah</Text>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Username</Text>
                        <TextInput onChangeText={setusername} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Password</Text>
                        <TextInput onChangeText={setpassword} secureTextEntry={true} style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                    </View>
                </ScrollView>
                <View style={{ padding: 22 }}>
                    <Button title="Masuk" onPress={login} buttonStyle={style.button} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                </View>
            </View>

        </View>
    );
};

export default Login;
