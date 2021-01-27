import React, { createRef, useEffect, useRef, useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
function Chat(props) {
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

    const [spinner, setspinner] = useState(false)
    const [kosong, setkosong] = useState(false)
    const [isi, setisi] = useState("")
    const [data, setdata] = useState([{}])
    const chat = () => {
        //setspinner(true)
        setisi("")
        fetch(global.url + '/chat/send-message', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                receiver_id: props.route.params.id,
                text: isi
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Reminder berhasil dibuat!")
                    toggleModal()
                }
                //setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                //setspinner(false)
            });
    }

    const show = () => {
        //setspinner(true)
        fetch(global.url + '/chat/show-message', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                receiver_id: props.route.params.id
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setdata(json.data)
                }
                //setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                //setspinner(false)
            });
    }

    useState(() => {
        show()
    })

    const [time3, settime3] = useState(0)
    useEffect(() => {
        const timeout3 = () => setTimeout(() => {
            settime3(time3 + 1)
            settime3(time3 - 1)
            show()
        }, 500);
        const timeout4 = timeout3()
        return () => {
            clearTimeout(timeout4);
        };
    }, [time3]);
    const scrollViewRef = useRef()
    const handleScrollTo = (w, h) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, y: h })
        }
    };
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

            <View style={{ flex: 1 }}>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={handleScrollTo}
                >

                    <View style={{ padding: 3 }}>
                        {data.map((item) => item.text ? (<View>
                            {item.sender_username == global.username ? (
                                <View style={{ alignItems: "flex-end", marginRight: 15, marginLeft: 15 }}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", flexDirection: "row" }}>
                                        <View>
                                            <View style={{ backgroundColor: colors.primary, padding: 20, borderRadius: 25, marginTop: 10 }}>
                                                <Text style={[style.poppinsmedium, { fontSize: 14 }]}>{item.text}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                    <View style={{ alignItems: "flex-start", marginRight: 15, marginLeft: 15 }}>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", flexDirection: "row" }}>
                                            <Image
                                                source={require("../../../assets/image/profilcewe.png")}
                                                style={{ width: 50, height: 50, marginRight: 10 }}
                                                resizeMode="contain"
                                            />
                                            <View>
                                                <Text style={[style.nunitosans, { fontSize: 14, marginLeft: 20 }]}>{item.sender_name}</Text>
                                                <View style={{ backgroundColor: "#EFF3F7", padding: 20, borderRadius: 25, marginTop: 10 }}>
                                                    <Text style={[style.poppinsmedium, { fontSize: 14 }]}>{item.text}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}



                        </View>) : (null))}

                    </View>

                </ScrollView>
                <View style={[{ justifyContent: "center", alignItems: "center", marginTop: 10, flex: 0, height: 75, backgroundColor: "white", elevation: 10, padding: 10, flexDirection: "row" }]} >
                    <View style={{ flex: 1 }}>
                        <TextInput onChangeText={setisi} value={isi} multiline={true} placeholder="Type your message..."></TextInput>
                    </View>
                    <TouchableOpacity onPress={chat} style={{ marginRight: 20 }}>
                        <FontAwesomeIcon icon={faPaperPlane} size={22} color={colors.button}></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default Chat;
