import React, { useEffect, useState } from 'react';
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
import messaging from '@react-native-firebase/messaging';
function Beranda(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [cari, setcari] = useState("")
    const [user, setuser] = useState({})
    useEffect(() => {

        messaging()
            .subscribeToTopic('event')
            .then(() => console.log('Subscribed to topic!'));
        // Assume a message-notification contains a "type" property in the data payload of the screen to open

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );

        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );

                }

            });
    }, []);
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {

        })
        return unsubscribe;
    }, [])
    useState(() => {
        messaging()
            .getToken()
            .then(token => {
                send_fcm(token)
                console.log(token)
            });
    })
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const send_fcm = (fcm_token) => {

        fetch(global.url + '/advice/send_fcm', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                fcm_token: fcm_token
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)

            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)

            });

    }
    const authorize = (key) => {
        fetch(global.url + "/user", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + key,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.data)
                setuser(json.data)
            })
            .catch((error) => console.error(error));
    };
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('key')
            if (value !== null) {
                authorize(value)
            }
        } catch (e) {
            // error reading value
        }
    }

    const [spinner, setspinner] = useState(false)
    const [kosong, setkosong] = useState(false)
    const resumepulang = () => {
        if (global.status == 1) {
            global.mode = "resume"
            props.navigation.navigate("Detailresumepulang", { nama: "Resume Pulang" })
        } else if (global.status == 2) {
            props.navigation.navigate("Resumepulang")
        }
    }
    const datakontrol = () => {
        if (global.status == 1) {
            props.navigation.navigate("Datakontrol")
        } else if (global.status == 2) {
            props.navigation.navigate("Datakontrolpasien")
        }
    }
    useState(() => {
        getData()
    })
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

            <View style={{ flex: 1 }}>
                <View style={{ alignItems: "flex-end", padding: 22 }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("Anjuranpasien") }} style={[style.card, { flexDirection: "row", alignItems: "center", marginRight: 3, marginLeft: 3, flex: 0, elevation: 10 }]}>
                        <Ionicons name={'notifications-outline'} size={24} color="#92B1CD" />
                    </TouchableOpacity>
                </View>

                <View style={{ width: "100%", justifyContent: "center", alignItems: 'center' }}>
                    <Image
                        source={require("../../assets/image/profilcewe.png")}
                        style={{ width: 100, height: 100 }}
                        resizeMode="contain"
                    />
                </View>
                <Text style={[style.poppinsbold, { textAlign: "center", fontSize: 18, marginTop: 15 }]}>{user.name}</Text>
                <Text style={[style.poppinsmedium, { fontSize: 14, textAlign: 'center', color: colors.lightblue }]}>{global.status == 1 ? "Pasien" : ""}{global.status == 2 ? "Nurse" : ""}{global.status == 3 ? "Admin" : ""}</Text>
                <View style={[style.line, { height: 3, backgroundColor: '#ECECEC' }]}></View>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{ padding: 3, padding: 20 }}>
                            <View>
                                {global.status == 2 || global.status == 3 ? (
                                    <View>
                                        <TouchableOpacity onPress={() => { props.navigation.navigate("Listpasien") }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0 }]}>
                                            <Image
                                                source={require("../../assets/image/addpeople.png")}
                                                style={{ width: 55, height: 65 }}
                                                resizeMode="stretch"
                                            />
                                            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Data Pasien</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { props.navigation.navigate("Anjuranpasien") }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                            <Image
                                                source={require("../../assets/image/note.png")}
                                                style={{ width: 55, height: 65 }}
                                                resizeMode="stretch"
                                            />
                                            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Reminder Pasien</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {

                                            props.navigation.navigate("Kategorikuis")
                                        }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                            <Image
                                                source={require("../../assets/image/resume.png")}
                                                style={{ width: 55, height: 65 }}
                                                resizeMode="stretch"
                                            />
                                            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Mengelola Kuis</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>) : (null)}
                                {global.status == 3 ? (
                                    <View>
                                        <TouchableOpacity onPress={() => { props.navigation.navigate("Nurse") }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                            <Image
                                                source={require("../../assets/image/resume.png")}
                                                style={{ width: 55, height: 65 }}
                                                resizeMode="stretch"
                                            />
                                            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Daftar Nurse</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>) : (null)}
                                <TouchableOpacity onPress={() => { props.navigation.navigate("Kelolasurvey") }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                    <Image
                                        source={require("../../assets/image/resume.png")}
                                        style={{ width: 55, height: 65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Daftar Survey</Text>
                                    </View>
                                </TouchableOpacity>
                                {global.status == 3 ? (<View>
                                    <TouchableOpacity onPress={() => {
                                        global.mode = "resume"
                                        props.navigation.navigate("Detailresumepulang", { nama: "Resume Pulang" })
                                    }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                        <Image
                                            source={require("../../assets/image/resume.png")}
                                            style={{ width: 55, height: 65 }}
                                            resizeMode="stretch"
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>Resume Pulang (Pasien)</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        global.mode = "resume"
                                        props.navigation.navigate("Resumepulang")
                                    }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                        <Image
                                            source={require("../../assets/image/resume.png")}
                                            style={{ width: 55, height: 65 }}
                                            resizeMode="stretch"
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>Resume Pulang (Nurse)</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        props.navigation.navigate("Datakontrolpasien")
                                    }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                        <Image
                                            source={require("../../assets/image/resume.png")}
                                            style={{ width: 55, height: 65 }}
                                            resizeMode="stretch"
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>Data Kontrol (Pasien)</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        props.navigation.navigate("Datakontrol")
                                    }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                        <Image
                                            source={require("../../assets/image/resume.png")}
                                            style={{ width: 55, height: 65 }}
                                            resizeMode="stretch"
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>Data Kontrol (Nurse)</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                ) : (<View>
                                    <TouchableOpacity onPress={resumepulang} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                        <Image
                                            source={require("../../assets/image/resume.png")}
                                            style={{ width: 55, height: 65 }}
                                            resizeMode="stretch"
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>Resume Pulang</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={datakontrol} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                        <Image
                                            source={require("../../assets/image/resume.png")}
                                            style={{ width: 55, height: 65 }}
                                            resizeMode="stretch"
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>Data Kontrol</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>)}

                                <TouchableOpacity onPress={() => {

                                    props.navigation.navigate("Kategoriforum")
                                }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                    <Image
                                        source={require("../../assets/image/resume.png")}
                                        style={{ width: 55, height: 65 }}
                                        resizeMode="stretch"
                                    />
                                    <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Forum</Text>
                                    </View>
                                </TouchableOpacity>
                                {global.status == 3 ? (

                                    <TouchableOpacity onPress={() => {

                                        props.navigation.navigate("Chartkuis")
                                    }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                        <Image
                                            source={require("../../assets/image/resume.png")}
                                            style={{ width: 55, height: 65 }}
                                            resizeMode="stretch"
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>Chart</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (null)}

                            </View>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};

export default Beranda;
