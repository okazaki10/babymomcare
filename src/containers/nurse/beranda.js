import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Text } from 'react-native-elements';

import { colors } from '../../globalstyles';

import style from '../../globalstyles';

import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
function Beranda(props) {

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

    useState(() => {
        messaging()
            .getToken()
            .then(token => {
                send_fcm(token)
                console.log(token)
            });
    })


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
    const [unread, setunread] = useState(0)
    const getunread = (key) => {
        //setspinner(true)
        fetch(global.url + '/advice/unread-notification', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + key,
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.data)
                setunread(json.data)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                //setspinner(false)
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
                getunread(value)
            }
        } catch (e) {
            // error reading value
        }
    }

    const [spinner, setspinner] = useState(false)

    const resumepulang = () => {
        if (global.status == 1) {
            global.mode = "resume"
            props.navigation.navigate("Detailresumepulang", { nama: "Ringkasan Pulang" })
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
                <ScrollView>
                    <View style={{ alignItems: "flex-end", padding: 22 }}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate("Notifikasi") }} style={[style.card, { flexDirection: "row", alignItems: "center", marginRight: 3, marginLeft: 3, flex: 0, elevation: 10 }]}>
                            <Ionicons name={'notifications-outline'} size={24} color="#92B1CD" />
                            {unread && unread != "0" ? (
                                <View style={{ position: "absolute", top: -5, right: -3, zIndex: 100, backgroundColor: "red", width: 18, height: 18, justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
                                    <Text style={{ fontSize: 12, color: "white" }}>{unread <= 99 ? unread : "99+"}</Text>
                                </View>
                            ) : (null)}
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", justifyContent: "center", alignItems: 'center' }}>
                        {global.status == 1 ? (<Image
                            source={require("../../assets/image/addpeople.png")}
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                        />) : (global.status == 2 ? (<Image
                            source={require("../../assets/image/profilcewe.png")}
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                        />) : (global.status == 3 ? (<Image
                            source={require("../../assets/image/admin.png")}
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                        />) : (<Image
                            source={require("../../assets/image/super_admin.png")}
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                        />)))}

                    </View>
                    <Text style={[style.poppinsbold, { textAlign: "center", fontSize: 18, marginTop: 15 }]}>{user.name}</Text>
                    <Text style={[style.poppinsmedium, { fontSize: 14, textAlign: 'center', color: colors.lightblue }]}>{global.status == 1 ? "Ibu" : ""}{global.status == 2 ? "Perawat" : ""}{global.status == 3 ? "Koordinator perawat" : ""}{global.status == 4 ? "Super Admin" : ""}</Text>
                    <View style={[style.line, { height: 3, backgroundColor: '#ECECEC' }]}></View>
                    <View style={{ flex: 0 }}>

                        <View style={{ padding: 3, padding: 20 }}>
                            <View>
                                {global.status == 2 || global.status == 3 || global.status == 4 ? (
                                    <View>
                                        <TouchableOpacity onPress={() => {
                                            if (global.status == 3 || global.status == 4) {
                                                props.navigation.navigate("Listpasien", { idadmin: 1, survey: 1 })
                                            } else {
                                                props.navigation.navigate("Listpasien", { survey: 1 })
                                            }
                                        }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0, flex: 0 }]}>
                                            <View
                                                style={{ height: 65 }}
                                            />
                                            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Hasil Kuesioner Pasien</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            if (global.status == 3 || global.status == 4) {
                                                props.navigation.navigate("Listpasien", { idadmin: 1, quiz: 1 })
                                            } else {
                                                props.navigation.navigate("Listpasien", { quiz: 1 })
                                            }
                                        }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                            <View
                                                style={{ height: 65 }}
                                            />
                                            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Hasil Kuis Materi</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            if (global.status == 3 || global.status == 4) {
                                                props.navigation.navigate("Listpasien", { idadmin: 1 })
                                            } else {
                                                props.navigation.navigate("Listpasien")
                                            }
                                        }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                            <View
                                                style={{ height: 65 }}
                                            />
                                            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Data Pasien</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { props.navigation.navigate("Anjuranpasien") }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0 }]}>
                                            <View
                                                style={{ height: 65 }}
                                            />
                                            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Perawatan di rumah</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {

                                            props.navigation.navigate("Kategorikuis")
                                        }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                            <View
                                                style={{ height: 65 }}
                                            />
                                            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Kelola Kuis</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>) : (null)}
                                {global.status == 3 || global.status == 4 ? (
                                    <View>
                                        <TouchableOpacity onPress={() => { props.navigation.navigate("Nurse") }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                            <View
                                                style={{ height: 65 }}
                                            />
                                            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Daftar Perawat Aktif</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { props.navigation.navigate("Nurse", { approved: 1 }) }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                            <View
                                                style={{ height: 65 }}
                                            />
                                            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                <Text style={[style.poppinsbold, { fontSize: 15 }]}>Daftar Perawat Dalam Konfirmasi</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>) : (null)}
                                <TouchableOpacity onPress={() => { props.navigation.navigate("Kelolasurvey") }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                    <View
                                        style={{ height: 65 }}
                                    />
                                    <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Daftar Kuesioner</Text>
                                    </View>
                                </TouchableOpacity>
                                {global.status == 3 || global.status == 4 ? (<View>

                                    <TouchableOpacity onPress={() => {
                                        global.mode = "resume"
                                        props.navigation.navigate("Nurse", { nama: "Pilih Nurse", mode: "resume" })
                                    }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                        <View
                                            style={{ height: 65 }}
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>Ringkasan Pulang</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        global.mode = "kontrol"
                                        props.navigation.navigate("Nurse", { nama: "Pilih Nurse", mode: "kontrol" })
                                    }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                        <View
                                            style={{ height: 65 }}
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>Data Kontrol</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        props.navigation.navigate("Userlog")
                                    }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                        <View
                                            style={{ height: 65 }}
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>User log</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                ) : (<View>
                                    <TouchableOpacity onPress={resumepulang} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                        <View
                                            style={{ height: 65 }}
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>Ringkasan Pulang</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={datakontrol} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                        <View
                                            style={{ height: 65 }}
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>Data Kontrol</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>)}

                                <TouchableOpacity onPress={() => {

                                    props.navigation.navigate("Kategoriforum")
                                }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                    <View
                                        style={{ height: 65 }}
                                    />
                                    <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Tanya jawab</Text>
                                    </View>
                                </TouchableOpacity>
                                {global.status == 3 || global.status == 4 ? (

                                    <TouchableOpacity onPress={() => {

                                        props.navigation.navigate("Chartkuis")
                                    }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                        <View
                                            style={{ height: 65 }}
                                        />
                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>Chart</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (null)}

                                <TouchableOpacity onPress={() => {

                                    props.navigation.navigate("Faq")
                                }} style={[style.card, { marginTop: 30, flexDirection: "row", padding: 0, flex: 0 }]}>
                                    <View
                                        style={{ height: 65 }}
                                    />
                                    <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>Pertanyaan Umum</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>

            </View>

        </View>
    );
};

export default Beranda;
