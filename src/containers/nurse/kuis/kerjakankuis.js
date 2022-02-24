import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFrown, faThumbsUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { useIsFocused } from '@react-navigation/native';
function Kerjakankuis(props) {

    const [isipesan, setisipesan] = useState("")


    const [spinner, setspinner] = useState(false)

    const ubahkontrol = () => {
        global.mode = "kontrol"
        global.add = 0
        props.navigation.navigate("Tambahresume", { nama: "Ubah data kontrol" })
        toggleModal2()
    }

    const hapuskontrol = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus konten ini")
        toggleModal3()

    }

    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [isModalVisible3, setModalVisible3] = useState(false);
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    const [jawaban, setjawaban] = useState([])


    const pilih = (index, value) => {
        const s = [...jawaban]
        s[index] = value
        setjawaban(s)
    }
    const [nomor, setnomor] = useState(0)

    const tambahnomor = () => {
        setnomor(nomor + 1)
    }
    const kurangnomor = () => {
        setnomor(nomor - 1)
    }
    const [selesai, setselesai] = useState(false)

    const [data, setdata] = useState({})
    const [halaman, sethalaman] = useState([{}])
    const lihatkuis = () => {
        //setspinner(true)
        fetch(global.url + '/quiz/show', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setdata(json.data)
                    sethalaman(json.data.questions)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const [data2, setdata2] = useState({})
    const kuisselesai = () => {
        setspinner(true)
        fetch(global.url + '/quiz/answer/store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                answers: jawaban
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {

                    //setisipesan("Kuis telah terisi!")
                    //toggleModal()
                    selesaikuis()

                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const selesaikuis = () => {
        setspinner(true)
        fetch(global.url + '/quiz/answer/show', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                quiz_id: data.quiz_id
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setdata2(json)
                    setselesai(true)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const selesaikuis2 = () => {
        setspinner(true)
        fetch(global.url + '/quiz/answer/show', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                quiz_id: props.route.params.id
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setdata2(json)
                    setselesai(true)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }

    const lihatquizhistory = () => {
        //setspinner(true)
        fetch(global.url + '/quiz/history', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                quiz_id: props.route.params.id,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setdata(json)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }

    const [guide, setguide] = useState(true)
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            if (props.route.params.mode) {
                selesaikuis2()
                lihatquizhistory()
            } else {
                lihatkuis()
            }
        }
    }, [isFocused])

    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Modal isVisible={isModalVisible3}
                onBackdropPress={toggleModal3}
                onBackButtonPress={toggleModal3}>
                <View style={style.content}>
                    <View>
                        <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={toggleModal3}>
                            <FontAwesomeIcon icon={faTimes} size={22} color={"black"}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <View style={{ alignItems: "center" }}>
                            <Image
                                source={require("../../../assets/image/exit.png")}
                                style={{ width: 100, height: 100 }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={[style.poppinsbold, { fontSize: 20, textAlign: "center", marginTop: 15, color: colors.grey }]}>{isipesan}</Text>
                        <Text style={[style.nunitosans, { fontSize: 14, textAlign: "center", marginTop: 5, color: colors.grey }]}>Kembali ke <Text style={[style.poppinsbold, { fontSize: 14 }]}>Beranda</Text></Text>

                        <View style={{ marginTop: 15, marginRight: 15, marginLeft: 15, flexDirection: "row" }}>
                            <View style={{ flex: 1, marginRight: 15 }}>
                                <Button onPress={toggleModal3} title="Iya" titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: "red", backgroundColor: "red" }]}></Button>
                            </View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Button onPress={toggleModal3} title="Tidak" titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: "red", backgroundColor: "white" }]}>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal isVisible={isModalVisible2}
                onBackdropPress={toggleModal2}
                onBackButtonPress={toggleModal2}>
                <View style={style.content}>
                    <Text style={[style.nunitosans, { textAlign: "center" }]}>{isipesan}</Text>
                    <View style={{ flexDirection: "row", marginTop: 40 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={hapuskontrol} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={ubahkontrol} title="Ubah" titleStyle={[style.nunitosans, { textAlign: "center", color: "#E3DB69" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Batal" titleStyle={[style.nunitosans, { textAlign: "center", color: "black" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>

            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, padding: 20 }}>
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            {selesai == true ? (
                                <View>
                                    <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginLeft: 15, marginTop: 0, textAlign: "center", color: colors.button }]}>Hasil</Text>
                                    <View style={[style.card, { padding: 22, marginTop: 15 }]}>
                                        {data2.data.map((item, index) => (<View style={{ flexDirection: "row", marginBottom: 15 }}>
                                            <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginTop: 0, flex: 0, width: 20 }]}>{(index + 1) + "."}</Text>
                                            <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginTop: 0 }]}>{item.question}</Text>
                                            <View style={{alignItems:"center",justifyContent:"center"}}>
                                                {item.point == 1 ? (<FontAwesomeIcon icon={faThumbsUp} size={22} color={"lightgreen"}></FontAwesomeIcon>
                                                ) : (
                                                    <FontAwesomeIcon icon={faFrown} size={22} color={"red"}></FontAwesomeIcon>)}
                                            </View>
                                        </View>))}
                                        <View style={[style.line, { marginTop: 5, marginBottom: 5 }]}></View>
                                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginTop: 0 }]}>Total Benar</Text>
                                            <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginTop: 0, textAlign: "right" }]}>{data2.total_point}/{data2.total_question}</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <Button title="Kembali ke halaman materi" onPress={() => { props.navigation.goBack() }} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                    </View>
                                </View>
                            ) : (
                                guide ? (
                                    <View>
                                        <View style={[style.card, { padding: 22, marginTop: 15 }]}>
                                            <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginTop: 0 }]}>Guide Menyelesaikan Kuis :</Text>
                                            <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 14, marginTop: 15 }]}>Pilih salah satu jawaban yang paling benar dari ketiga jawaban</Text>
                                        </View>
                                        <View style={{ marginTop: 30 }}>
                                            <Button title="Lanjut" onPress={() => { setguide(false) }} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                        </View>
                                    </View>
                                ) : (<View>
                                    <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginLeft: 15, marginTop: 0, textAlign: "center", color: colors.button }]}>Pertanyaan {nomor + 1}</Text>
                                    <View style={[style.card, { padding: 22, marginTop: 15 }]}>
                                        <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginTop: 0, textAlign: "center" }]}>{data.questions ? data.questions[nomor].question : ""}</Text>
                                    </View>

                                    <View style={[style.card, { padding: 22, marginTop: 15 }]}>
                                        {data.questions ? data.questions[nomor].choice.map((item, index) => (
                                            jawaban[nomor] == item.id ? (
                                                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                                                    <View style={{ width: 15, height: 15, borderRadius: 50, backgroundColor: colors.primary, borderWidth: 1, borderColor: colors.button }}></View>
                                                    <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginLeft: 15, marginTop: 0 }]}>{index == 0 ? "A" : index == 1 ? "B" : "C"}. {item.choice}</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity onPress={() => { pilih(nomor, item.id) }} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                                                    <View style={{ width: 15, height: 15, borderRadius: 50, backgroundColor: "white", borderWidth: 1, borderColor: colors.button }}></View>
                                                    <Text style={[style.poppinsbold, style.datapasien2, { fontSize: 15, marginLeft: 15, marginTop: 0 }]}>{index == 0 ? "A" : index == 1 ? "B" : "C"}. {item.choice}</Text>
                                                </TouchableOpacity>
                                            )
                                        )) : (null)}

                                    </View>
                                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                                        <View style={{ flex: 1, marginRight: 10 }}>
                                            {nomor > 0 ? (
                                                <Button title="Kembali" onPress={kurangnomor} buttonStyle={[style.button, { backgroundColor: "#EFF3F7" }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                            ) : (null)}
                                        </View>
                                        <Text>{data.length}</Text>
                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                            {nomor >= halaman.length - 1 ? (
                                                jawaban[nomor] == null ? (null) : (
                                                    <Button title="Selesai" onPress={kuisselesai} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                                )) : (
                                                jawaban[nomor] == null ? (null) : (
                                                    <Button title="Selanjutnya" onPress={tambahnomor} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                                )
                                            )}

                                        </View>
                                    </View>
                                </View>)
                            )}

                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Kerjakankuis;
