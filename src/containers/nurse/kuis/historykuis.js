import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { useIsFocused } from '@react-navigation/native';
function Historykuis(props) {

    const [isipesan, setisipesan] = useState("")

    const [spinner, setspinner] = useState(false)

    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };

    const [id_survey, setid_survey] = useState("")
    const ubahkuis = () => {
        if (kuis == "") {
            ToastAndroid.show("Masukkan judul kuisioner", ToastAndroid.SHORT)
        } else {
            toggleModal2()
            props.navigation.navigate("Tambahsurvey", { nama: "Ubah Kuesioner", id_survey: id_survey, kuis: kuis, choice_type: choice })
            global.add = 0
        }
    }



    const hapuskuis = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus kuis ini")
        toggleModal3()

    }


    const [isModalVisible3, setModalVisible3] = useState(false);
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    const [jumlah, setjumlah] = useState("5")
    const [data, setdata] = useState([{}])




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

    const showpatientquiz = () => {
        //setspinner(true)
        fetch(global.url + '/quiz/history', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                patient_id: props.route.params.id_pasien,
                quiz_id: props.route.params.id,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                console.log('pasien')
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

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            if (props.route.params?.id_pasien) {
                showpatientquiz()
            } else {
                lihatquizhistory()
            }
        }
    }, [isFocused])
    const [kuis, setkuis] = useState("")
    const [choice, setchoice] = useState("text")
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

            <Modal isVisible={isModalVisible2}
                onBackdropPress={toggleModal2}
                onBackButtonPress={toggleModal2}>
                <View style={style.content}>
                    <Text style={[style.nunitosans, { textAlign: "center" }]}>{isipesan}</Text>
                    <View style={{ flexDirection: "row", marginTop: 40 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={hapuskuis} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={ubahkuis} title="Ubah" titleStyle={[style.nunitosans, { textAlign: "center", color: "#E3DB69" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Batal" titleStyle={[style.nunitosans, { textAlign: "center", color: "black" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, padding: 20 }}>
                    {props.route.params?.admin == 1 ? (null) : (<Button title="Kerjakan Lagi" onPress={() => { props.navigation.navigate("Kerjakankuis", { id: props.route.params.id }) }} buttonStyle={[style.button, { marginTop: 0 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>)}
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                {data.map(item => item.quiz_id ? (<TouchableOpacity onPress={() => {
                                    props.navigation.navigate("Kerjakankuis", { id: item.quiz_id, lihatquiz: 1, mode: 1 })
                                }} style={[style.card, { marginTop: 15, flexDirection: "row" }]}>
                                    <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 12 }]}>Pengerjaan ke {item.order}</Text>
                                        <Text style={[style.poppinsbold, { fontSize: 12 }]}>Jawaban Benar = {item.point}/{item.total}</Text>
                                        <Text style={[style.poppinsbold, style.datapasien2, { marginTop: 0 }]}>Nilai = {(100 * (item.point / item.total)).toString().substr(0, 4)}</Text>
                                    </View>

                                </TouchableOpacity>) : (null))}
                            </View>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View >
    );
};

export default Historykuis;
