import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView,TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import {  Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { TextInput } from 'react-native-gesture-handler';

import { format} from 'date-fns';
import { id } from 'date-fns/locale';
function Detailresumepulang(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const [spinner, setspinner] = useState(false)

 
    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [anjuran, setanjuran] = useState("")
    const [note, setnote] = useState("")
    const [datakontrol, setdatakontrol] = useState("")
    const add_nurse_note = () => {
        setspinner(true)
        fetch(global.url + '/kontrol/nurse_note', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id,
                nurse_note: anjuran
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Catatan perawat berhasil diubah!")
                    toggleModal()
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const add_note = () => {
        setspinner(true)
        fetch(global.url + '/kontrol/patient_note', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id,
                note: note
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Catatan tambahan berhasil diubah!")
                    toggleModal()
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const lihatkontrol = () => {
        //setspinner(true)
        fetch(global.url + '/kontrol/show', {
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
                    setdatakontrol(json.data)
                    setanjuran(json.data.nurse_note)
                    setnote(json.data.note)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const lihatresume = () => {
        //setspinner(true)
        fetch(global.url + '/kontrol/resume', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    if (json.data) {
                        setdatakontrol(json.data)
                        setanjuran(json.data.nurse_note)
                    }
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const lihatresume2 = () => {
        //setspinner(true)
        fetch(global.url + '/kontrol/resume', {
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
                    if (json.data) {
                        setdatakontrol(json.data)
                        setanjuran(json.data.nurse_note)
                    }
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
        if (mode == "kontrol") {
            lihatkontrol()
        } else if (mode == "resume") {
            if (global.status == 1) {
                lihatresume()
            } else {
                lihatresume2()
            }
        }
    })

    return (
        <View style={style.main}>

            <StatusBar backgroundColor={colors.primary} />
            <Modal isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}>
                <View style={style.content}>
                    <View>
                        <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={toggleModal}>
                            <FontAwesomeIcon icon={faTimes} size={22} color={"black"}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <View style={{ alignItems: "center" }}>
                            <Image
                                source={require("../../../assets/image/check.png")}
                                style={{ width: 100, height: 100 }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={[style.poppinsbold, { fontSize: 20, textAlign: "center", marginTop: 15, color: colors.grey }]}>{isipesan}</Text>
                        <Text style={[style.nunitosans, { fontSize: 14, textAlign: "center", marginTop: 5, color: colors.grey }]}>Kembali ke <Text style={[style.poppinsbold, { fontSize: 14 }]}>Beranda</Text></Text>
                        <View style={{ marginTop: 15, marginRight: 30, marginLeft: 30 }}>
                            <Button title="Ok" onPress={toggleModal} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: colors.button2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
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
                            <Button onPress={toggleModal2} title="Hapus" titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Batal" titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]} buttonStyle={{ backgroundColor: "white" }}>
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
                            {datakontrol ? (
                                <View>

                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={[style.poppinsbold, style.datapasien, { marginTop: 0 }]}>Foto Bayi</Text>
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <Image
                                            source={{ uri: datakontrol.image }}
                                            style={{ width: "100%", height: DEVICE_WIDTH * 0.7 }}
                                            resizeMode="cover"
                                        ></Image>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={[style.poppinsbold, style.datapasien, { marginTop: 15 }]}>Tanggal Kontrol Selanjutnya</Text>
                                        <Text style={{ marginTop: 15 }}>: </Text>
                                        <Text style={[style.nunitosans, style.datapasien2, { marginTop: 15 }]}>{format(new Date(datakontrol.date),"dd' 'MMMM' 'yyy", { locale: id })}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={[style.poppinsbold, style.datapasien]}>Tempat Kontrol</Text>
                                        <Text style={{ marginTop: 15 }}>: </Text>
                                        <Text style={[style.nunitosans, style.datapasien2]}>{datakontrol.tempat_kontrol}</Text>
                                    </View>

                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={[style.poppinsbold, style.datapasien]}>Berat Badan</Text>
                                        <Text style={{ marginTop: 15 }}>: </Text>
                                        <Text style={[style.nunitosans, style.datapasien2]}>{datakontrol.weight} gram</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={[style.poppinsbold, style.datapasien]}>Panjang Badan</Text>
                                        <Text style={{ marginTop: 15 }}>: </Text>
                                        <Text style={[style.nunitosans, style.datapasien2]}>{datakontrol.length} cm</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={[style.poppinsbold, style.datapasien]}>Lingkar Kepala</Text>
                                        <Text style={{ marginTop: 15 }}>: </Text>
                                        <Text style={[style.nunitosans, style.datapasien2]}>{datakontrol.lingkar_kepala} cm</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={[style.poppinsbold, style.datapasien]}>Suhu</Text>
                                        <Text style={{ marginTop: 15 }}>: </Text>
                                        <Text style={[style.nunitosans, style.datapasien2]}>{datakontrol.temperature} celcius</Text>
                                    </View>

                                    {global.status == 1 ? (<View>


                                        {global.mode == "kontrol" ? (
                                            <View>
                                                <Text style={[style.poppinsbold, { fontSize: 14, marginTop: 20 }]}>Catatan tambahan</Text>
                                                <View>
                                                    <TextInput onChangeText={setnote} value={note} style={[style.card, { elevation: 5, marginTop: 15 }]} multiline={true}></TextInput>
                                                </View>
                                                <View style={{ marginTop: 30 }}>
                                                    <Button title="Simpan" onPress={add_note} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                                </View>
                                            </View>
                                        ) : (<View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.poppinsbold, style.datapasien]}>Hasil Penunjang</Text>

                                            </View>
                                            <View style={[ { marginTop: 10, flexDirection: "row", padding: 0, flex: 0,borderColor:colors.grey,borderWidth:1,borderRadius:10 }]}>
                                                <View
                                                    style={{ height: 65 }}
                                                />
                                                <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                    <Text style={[style.nunitosans, { fontSize: 15 }]}>{datakontrol.hasil_penunjang}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.poppinsbold, style.datapasien]}>Terapi Pulang</Text>

                                            </View>
                                    
                                            <View style={[ { marginTop: 10, flexDirection: "row", padding: 0, flex: 0,borderColor:colors.grey,borderWidth:1,borderRadius:10 }]}>
                                                <View
                                                    style={{ height: 65 }}
                                                />
                                                <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                    <Text style={[style.nunitosans, { fontSize: 15 }]}>{datakontrol.terapi_pulang}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.poppinsbold, style.datapasien]}>Anjuran Pasien</Text>

                                            </View>
                                            {datakontrol.advices ? datakontrol.advices.map((item, index) =>
                                                <View>
                                                    <View style={[{ marginTop: 10, flexDirection: "row", padding: 0, flex: 0,borderColor:colors.grey,borderWidth:1,borderRadius:10 }]}>
                                                        <View
                                                            style={{ height: 65 }}
                                                        />
                                                        <View style={{ justifyContent: "center", marginLeft: 15 }}>
                                                            <View
                                                                style={{ height: 10, width: 10, backgroundColor: colors.grey, borderRadius: 50, resizeMode: "content" }}
                                                            />
                                                        </View>
                                                        <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                            <Text style={[style.nunitosans, { fontSize: 15 }]}>{item.name}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ) : "Anjuran Pasien"}
                                        </View>)}
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.poppinsbold, style.datapasien]}>Catatan dari perawat</Text>

                                        </View>
                                        <View style={[{ marginTop: 10, flexDirection: "row", padding: 0, flex: 0,borderColor:colors.grey,borderWidth:1,borderRadius:10 }]}>
                                            <View
                                                style={{ height: 65 }}
                                            />
                                            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                                                <Text style={[style.nunitosans, { fontSize: 15 }]}>{datakontrol.nurse_note}</Text>
                                            </View>
                                        </View>
                                  
                                    </View>) : (<View>
                                        {global.mode == "kontrol" ? (
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.poppinsbold, style.datapasien]}>Catatan Tambahan</Text>
                                                <Text style={{ marginTop: 15 }}>: </Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>{datakontrol.note}</Text>
                                            </View>
                                        ) : (null)}
                                        {global.mode == "resume" ? (
                                            <View>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={[style.poppinsbold, style.datapasien]}>Catatan dari perawat</Text>
                                                    <Text style={{ marginTop: 15 }}>: </Text>
                                                    <Text style={[style.nunitosans, style.datapasien2]}>{datakontrol.nurse_note}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={[style.poppinsbold, style.datapasien]}>Hasil Penunjang</Text>
                                                    <Text style={{ marginTop: 15 }}>: </Text>
                                                    <Text style={[style.nunitosans, style.datapasien2]}>{datakontrol.hasil_penunjang}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={[style.poppinsbold, style.datapasien]}>Terapi Pulang</Text>
                                                    <Text style={{ marginTop: 15 }}>: </Text>
                                                    <Text style={[style.nunitosans, style.datapasien2]}>{datakontrol.terapi_pulang}</Text>
                                                </View>
                                                {datakontrol.advices ? datakontrol.advices.map((item, index) =>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={[style.poppinsbold, style.datapasien]}>{index == 0 ? "Anjuran Pasien" : ""}</Text>
                                                        <Text style={{ marginTop: 15 }}>: </Text>
                                                        <Text style={[style.nunitosans, style.datapasien2]}>{item.name}</Text>
                                                    </View>
                                                ) : "Anjuran Pasien"}
                                            </View>) : (<View>
                                                <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Catatan dari perawat</Text>
                                                <View>
                                                    <TextInput onChangeText={setanjuran} value={anjuran} style={[style.card, { elevation: 5, marginTop: 15 }]} multiline={true}></TextInput>
                                                </View>
                                                <View style={{ marginTop: 30 }}>
                                                    <Button title="Simpan" onPress={add_nurse_note} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                                                </View>
                                            </View>)}
                                    </View>)}


                                </View>
                            ) : (<Text>Tidak ada Ringkasan Pulang</Text>)}
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};



export default Detailresumepulang;
