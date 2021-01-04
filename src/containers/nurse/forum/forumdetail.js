import React, { useRef, useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatDistance } from 'date-fns';
import { id } from 'date-fns/locale';
function Forumdetail(props) {
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
    const timeelapsed = (time) => {
        return formatDistance(new Date(), time, { includeSeconds: true, locale: id })
    }
    const [spinner, setspinner] = useState(false)
    const [kosong, setkosong] = useState(false)
    const [data, setdata] = useState({ comments: [] })
    const lihatforum = () => {
        setspinner(true)
        fetch(global.url + '/forum/show', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setdata(json.data)
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
        lihatforum()
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
                    <View style={{ flex: 1, padding: 23 }}>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>{data.title}</Text>
                            <Ionicons name={'pencil-outline'} size={24} color={colors.grey} />
                        </View>

                        <View style={[style.card, { marginTop: 15, elevation: 5 }]}>
                            <View style={[{ flexDirection: "row" }]}>
                                <Image
                                    source={require("../../../assets/image/empty.png")}
                                    style={{ width: 40, height: 40 }}
                                    resizeMode="contain"
                                />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, paddingRight: 50 }]}>{data.name}</Text>
                                    <Text style={[style.poppinsbold, { fontSize: 12, color: colors.grey, paddingRight: 50 }]}>{data.role}</Text>
                                    <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginTop: 5, paddingRight: 50 }]}>{data.question}</Text>
                                </View>
                            </View>

                        </View>
                        <Button title="+ Tambah Komentar" onPress={() => { props.navigation.navigate("Addcomment", { id: data.id }) }} buttonStyle={[style.button, { marginTop: 20 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>Komentar</Text>
                        </View>

                        <View style={[style.card, { marginTop: 15, elevation: 5 }]}>
                            <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>List Komentar</Text>
                            {data.comments.map((item) => (
                                <View>

                                    <View style={[style.line, { marginBottom: 15 }]}></View>
                                    <View style={[{ flexDirection: "row" }]}>
                                        <Image
                                            source={require("../../../assets/image/empty.png")}
                                            style={{ width: 40, height: 40 }}
                                            resizeMode="contain"
                                        />
                                        <View style={{ marginLeft: 15 }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, paddingRight: 50 }]}>{item.user}</Text>
                                            <Text style={[style.poppinsbold, { fontSize: 12, color: colors.grey, paddingRight: 50 }]}>{item.role}</Text>
                                            <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginTop: 5, paddingRight: 50 }]}>{item.text}</Text>
                                        </View>
                                    </View>

                                </View>))}
                            {/*
                            <View style={[{ flexDirection: "row" }]}>
                                <Image
                                    source={require("../../../assets/image/empty.png")}
                                    style={{ width: 40, height: 40 }}
                                    resizeMode="contain"
                                />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, paddingRight: 50 }]}>Reza Artamevia</Text>
                                   
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Ionicons name={'time-outline'} size={18} color={colors.button} style={{ marginRight: 5 }} />
                                        <Text style={[style.poppinsbold, { fontSize: 11, color: colors.grey, paddingRight: 50 }]}>{timeelapsed(new Date())} yang lalu</Text>
                                    </View>
                                   
                                    <Text style={[style.nunitosans, { fontSize: 13, color: colors.grey, marginTop: 5, paddingRight: 50 }]}>Anak saya saat ini sedang mengalami berat badan rendah, saya sangat khawatir</Text>
                                </View>
                            </View>
 */}
                        </View>
                    </View>

                </ScrollView>
            </View>

        </View>
    );
};

export default Forumdetail;
