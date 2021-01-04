import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar, Linking } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faCommentDots, faComments, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
function Kontakperawat(props) {
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
    const openWhatsApp = (msg, mobile) => {
        let url =
            "whatsapp://send?text=" +
            msg +
            "&phone=62" +
            mobile;
        Linking.openURL(url)
            .then(data => {
                console.log("WhatsApp Opened successfully " + data);
            })
            .catch(() => {
                alert("Make sure WhatsApp installed on your device");
            });
    };
    const openemail = (message, subject) => {
        Linking.openURL(`mailto:support@domain.com?subject=${subject}&body=${message}`)
    }
    const openMaps = (address) => {
        Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + address);
    }
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />


            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', marginTop: 50 }}>
                        <Image
                            source={require("../../../assets/image/profilcewe.png")}
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={[style.poppinsbold, { textAlign: "center", fontSize: 18, marginTop: 15 }]}>Resma Andini</Text>
                    <View style={{ marginRight: 15, marginLeft: 15, marginTop: 20 }}>
                        <TouchableOpacity onPress={()=>{props.navigation.navigate("Chat",{id:props.route.params.id})}} style={[style.button, { backgroundColor: "#92B1CD", alignItems: "center", justifyContent: "center", height: 40 }]}>
                            <View style={{ flexDirection: "row" }}>
                                <FontAwesomeIcon icon={faComments} size={18} color={"white"}></FontAwesomeIcon>
                                <Text style={[style.poppinsbutton, { color: "white", fontSize: 15, marginLeft: 5 }]}>Chat Perawat</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, padding: 20 }}>

                        <View style={{ padding: 3 }}>
                            <View>
                                <TouchableOpacity onPress={() => { openWhatsApp("halo", "087880992192") }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0 }]}>
                                    <Image
                                        source={{ uri: "https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo.png" }}
                                        style={{ width: 70, height: 65 }}
                                        resizeMode="contain"
                                    />
                                    <View style={{ marginLeft: 0, justifyContent: "center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>087880992192</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { openemail("halo", "ari.susanti@gmail.com") }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0 }]}>
                                    <View style={{ width: 70, height: 65, justifyContent: "center", alignItems: "center" }}>
                                        <Image
                                            source={{ uri: "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png" }}
                                            style={{ width: 50, height: 65 }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={{ marginLeft: 0, justifyContent: "center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>ari.susanti@gmail.com</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { openMaps("Rumah sakit universitas indonesia, pondok cina, beji, depok") }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0 }]}>
                                    <View style={{ width: 70, height: 65, justifyContent: "center", alignItems: "center" }}>
                                        <Image
                                            source={{ uri: "https://logos-download.com/wp-content/uploads/2016/05/Google_Maps_logo_icon.png" }}
                                            style={{ width: 50, height: 65 }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={{ marginLeft: 0, justifyContent: "center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15, marginRight: 50 }]}>Rumah sakit universitas indonesia, pondok cina, beji, depok</Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={[style.poppinsmedium, { fontSize: 14, textAlign:"center",marginTop:25 }]}>Perawat tidak menjawab?</Text>
                                <TouchableOpacity onPress={()=>{props.navigation.goBack()}} style={{ alignItems: "center" }}>
                                    <Text style={[style.poppinsmedium, { fontSize: 14, textDecorationLine: "underline",color:colors.button }]}>Kontak perawat lainnya disini</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>

            </View>

        </View>
    );
};

export default Kontakperawat;
