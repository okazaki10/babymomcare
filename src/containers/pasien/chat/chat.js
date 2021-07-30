import React, {  useEffect, useRef, useState } from 'react';
import { View, Image, ScrollView,  TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import {  Text } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { TextInput } from 'react-native-gesture-handler';

function Chat(props) {
 
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const [spinner, setspinner] = useState(false)

    const [isi, setisi] = useState("")
    const [data, setdata] = useState([{}])
    const chat = () => {

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
                    setisipesan("Anjuran berhasil dibuat!")
                    toggleModal()
                }
     
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
  
            });
    }

    const show = () => {

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

            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
     
            });
    }
    const settoread = () => {

        fetch(global.url + '/chat/read-message', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                sender_id: props.route.params.id
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

    useState(() => {
        show()
        settoread()
    })

    const [time3, settime3] = useState(0)
    useEffect(() => {
        /*
        const timeout3 = () => setTimeout(() => {
            settime3(time3 + 1)
            settime3(time3 - 1)
            show()
        }, 500);
        const timeout4 = timeout3()
        return () => {
            clearTimeout(timeout4);
        };
        */
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
                                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                            {item.is_read == 1 ? (<Text style={[style.nunitosans, { fontSize: 10, marginRight: 10, color: "gray" }]}>Read</Text>) : (null)}
                                            <View style={{ backgroundColor: colors.primary, padding: 20, borderRadius: 25 }}>
                                                <Text style={[style.poppinsmedium, { fontSize: 14 }]}>{item.text}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <View style={{ alignItems: "flex-start", marginRight: 15, marginLeft: 15, marginTop: 15 }}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", flexDirection: "row" }}>

                                        {item.role == "patient" ? (
                                            <Image
                                                source={require("../../../assets/image/addpeople.png")}
                                                style={{ width: 50, height: 50, marginRight: 10 }}
                                                resizeMode="contain"
                                            />) : (item.role == "nurse" ? (<Image
                                                source={require("../../../assets/image/profilcewe.png")}
                                                style={{ width: 50, height: 50, marginRight: 10 }}
                                                resizeMode="contain"
                                            />) : (<Image
                                                source={require("../../../assets/image/admin.png")}
                                                style={{ width: 50, height: 50, marginRight: 10 }}
                                                resizeMode="contain"
                                            />))}

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
