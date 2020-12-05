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
import Ionicons from 'react-native-vector-icons/Ionicons';
function Mainpage(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [cari, setcari] = useState("")

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
    const [kosong, setkosong] = useState(false)
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            

            <View style={{ flex: 1 }}>
           
                    <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', marginTop: 50 }}>
                        <Image
                            source={require("../../assets/image/profilcewe.png")}
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={[style.poppinsbold, { textAlign: "center", fontSize: 18, marginTop: 15 }]}>Resma Andini</Text>
                    <Text style={[style.poppinsmedium, { fontSize: 14, textAlign: 'center', color: colors.lightblue }]}>Nurse</Text>
                    <View style={[style.line, { height: 3, backgroundColor: '#ECECEC' }]}></View>
                    <View style={{ flex: 1, padding: 20 }}>
                    <View style={[style.card, { flexDirection: "row", alignItems: "center", marginRight: 3, marginLeft: 3,flex:0 }]}>
                            <Ionicons name={'search-outline'} size={24} color={colors.button} />
                            <TextInput onChangeText={setcari} placeholder="Cari Pasien" style={{ flex: 1, padding: 0, marginLeft: 10 }}></TextInput>
                        </View>
                        <ScrollView>
                            <View style={{ padding: 3 }}>
                                {kosong ? (<View>
                                    <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', marginTop: 20 }}>
                                        <Image
                                            source={require("../../assets/image/empty.png")}
                                            style={{ width: 100, height: 100 }}
                                            resizeMode="contain"
                                        />
                                        <Text style={[style.poppinsbold, { textAlign: "center", fontSize: 14, marginTop: 15 }]}>Anda belum memiliki pasien</Text>
                                    </View>
                                    <Button title="+ Tambah Pasien Baru" onPress={login} buttonStyle={[style.button, { marginTop: 15 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                </View>) : (
                                        <View>
                                      
                                                <TouchableOpacity style={[style.card, { marginTop: 15, flexDirection: "row" }]} onPress={()=>{props.navigation.navigate("Materiedukasi")}}>
                                                    <Image
                                                        source={require("../../assets/image/empty.png")}
                                                        style={{ width: 100, height: 100 }}
                                                        resizeMode="contain"
                                                    />
                                                    <View style={{ marginLeft: 15 }}>
                                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Rafif Iqbal Shaputra</Text>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <Ionicons name={'person'} size={17} color={colors.button} />
                                                            <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginLeft: 1 }]}>Ibu Selina Maurizka</Text>
                                                        </View>
                                                        <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 2 }]}>Masalah : Risiko Hipotermia</Text>
                                                        <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 5 }]}>BB Lahir : 2,5 kg</Text>
                                                    </View>
                                              
                                              </TouchableOpacity>
                                              <TouchableOpacity style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                                    <Image
                                                        source={require("../../assets/image/empty.png")}
                                                        style={{ width: 100, height: 100 }}
                                                        resizeMode="contain"
                                                    />
                                                    <View style={{ marginLeft: 15 }}>
                                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Rafif Iqbal Shaputra</Text>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <Ionicons name={'person'} size={17} color={colors.button} />
                                                            <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginLeft: 1 }]}>Ibu Selina Maurizka</Text>
                                                        </View>
                                                        <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 2 }]}>Masalah : Risiko Hipotermia</Text>
                                                        <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 5 }]}>BB Lahir : 2,5 kg</Text>
                                                    </View>
                                              
                                              </TouchableOpacity>
                                                    <TouchableOpacity style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                                    <Image
                                                        source={require("../../assets/image/empty.png")}
                                                        style={{ width: 100, height: 100 }}
                                                        resizeMode="contain"
                                                    />
                                                    <View style={{ marginLeft: 15 }}>
                                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Rafif Iqbal Shaputra</Text>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <Ionicons name={'person'} size={17} color={colors.button} />
                                                            <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginLeft: 1 }]}>Ibu Selina Maurizka</Text>
                                                        </View>
                                                        <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 2 }]}>Masalah : Risiko Hipotermia</Text>
                                                        <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 5 }]}>BB Lahir : 2,5 kg</Text>
                                                    </View>
                                              
                                              </TouchableOpacity>
                                              <TouchableOpacity style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                                    <Image
                                                        source={require("../../assets/image/empty.png")}
                                                        style={{ width: 100, height: 100 }}
                                                        resizeMode="contain"
                                                    />
                                                    <View style={{ marginLeft: 15 }}>
                                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Rafif Iqbal Shaputra</Text>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <Ionicons name={'person'} size={17} color={colors.button} />
                                                            <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginLeft: 1 }]}>Ibu Selina Maurizka</Text>
                                                        </View>
                                                        <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 2 }]}>Masalah : Risiko Hipotermia</Text>
                                                        <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey, marginTop: 5 }]}>BB Lahir : 2,5 kg</Text>
                                                    </View>
                                              
                                              </TouchableOpacity>
                                       
                                        </View>)}
                            </View>
                        </ScrollView>
                    </View>
           

            </View>

        </View>
    );
};

export default Mainpage;
