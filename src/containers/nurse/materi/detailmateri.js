import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { colors } from '../../../globalstyles';
import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import HyperLink from 'react-native-hyperlink';
function Detailmateri(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [spinner, setspinner] = useState(false)
    const [kosong, setkosong] = useState(false)
    const kerjakankuis = () => {
        props.navigation.navigate("Kerjakankuis")
    }
    const [selesai, setselesai] = useState(false)
    const [data, setdata] = useState({})
    const lihatdetailmateri = () => {
        setspinner(true)
        fetch(global.url + '/materi/show', {
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
                console.log(json)
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
    const [data2, setdata2] = useState()
    const showquiz = () => {
        setspinner(true)
        fetch(global.url + '/quiz/status', {
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
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    if (json.status == 1) {
                        setselesai(true)
                    }
                    setdata2(json)
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
        lihatdetailmateri()
        showquiz()
    })
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <ScrollView>
                <View style={{ flex: 1, padding: 23 }}>
                    {data.quiz ? (global.status == 1 ? (
                        selesai == true ?
                            (<TouchableOpacity onPress={() => { props.navigation.navigate("Kerjakankuis", { id: data.quiz.id,mode:"review" }) }} style={[style.card, { marginTop: 0, elevation: 5, padding: 20 }]}>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={[style.poppinsbold, style.datapasien, { marginTop: 0 }]}>Review Kuis</Text>
                                    <View>
                                        <Text style={[style.poppinsbold, style.datapasien2, { marginTop: 0, textAlign: "right" }]}>{data2 ? data2.total_point : ""}/{data2 ? data2.total_question : ""}</Text>
                                        {/*<Text style={[style.poppinsmedium, { fontSize: 12, textDecorationLine: "underline", color: colors.button }]}>Kerjakan Lagi</Text>*/}
                                    </View>
                                </View>
                            </TouchableOpacity>
                            ) : (
                                <Button title="Kerjakan Kuis" onPress={() => { props.navigation.navigate("Kerjakankuis", { id: data.quiz.id }) }} buttonStyle={[style.button, { marginTop: 0 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>)
                    ) : (null)) : (null)}
                    <View style={[style.card, { elevation: 10, padding: 19, marginTop: 15 }]}>
                        <Text style={[style.poppinsbold, { fontSize: 17 }]}>{data.title}</Text>
                        <Text style={[style.nunitosans, { fontSize: 12 }]}>{data.date ? format(new Date(data.date), "iii', 'dd' 'MMM', 'yyyy'", { locale: id }) : ""}</Text>
                        <Image
                            source={{ uri: data.image ? data.image : "https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg" }}
                            style={{ width: "100%", height: 170, marginTop: 15 }}
                            resizeMode="cover"
                        />
                        <HyperLink linkDefault={true} linkStyle={{ color: '#2980b9' }}>
                            <Text style={[style.nunitomateri, { fontSize: 14, marginTop: 15, flex: 1 }]}>{data.content}</Text>
                        </HyperLink>
                    </View>
                    <Text style={[style.poppinsbold, { fontSize: 17, marginTop: 15 }]}>Forum Terkait</Text>
                    <View style={[style.card, { elevation: 10, padding: 19, marginTop: 15 }]}>
                        {data.forum ? data.forum.map((item) => (<View>
                            <TouchableOpacity style={[{ flexDirection: "row" }]} onPress={() => { props.navigation.navigate("Daftarakun") }}>
                                <Image
                                    source={require("../../../assets/image/empty.png")}
                                    style={{ width: 40, height: 40 }}
                                    resizeMode="contain"
                                />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={[style.poppinsbold, { fontSize: 12 }]}>Mengapa anak saya kesulitan membaca?</Text>
                                    <Text style={[style.nunitosans, { fontSize: 11, color: colors.grey }]}>Oleh: Raffi Ahmad</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={[style.line, { marginBottom: 15 }]}></View>
                        </View>)) : (null)}


                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Detailmateri;
