import React, { useEffect, useRef, useState } from 'react';
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
import { useIsFocused } from '@react-navigation/native';

function Datapasien(props) {
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
    const ubahpasien = (index) => {
        if (index == 0) {
            props.navigation.navigate("Daftarbayi", { nama: "Edit Data Bayi", id: props.route.params.id })
            global.add = 0
        } else if (index == 1) {
            props.navigation.navigate("Daftarortu", { nama: "Ubah Ortu", id: props.route.params.id })
            global.add = 0
        }
        else if (index == 2) {
            props.navigation.navigate("Daftarakun", { nama: "Ubah Akun", id: props.route.params.id })
            global.add = 0
        }
    }

    const addpasien = () => {
        props.navigation.navigate("Addforum", { nama: "Buat Forum" })
    }
    const forumdetail = () => {
        props.navigation.navigate("Forumdetail")
    }
    const [menuswitch, setmenuswitch] = useState(0)
    const gantidata = (index) => {
        setmenuswitch(index)
    }
    const [title2, settitle2] = useState("")
    const [description2, setdescription2] = useState("")
    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [data, setdata] = useState([{}])
    const lihatpasien = () => {
        //setspinner(true)
        fetch(global.url + '/nurse/show', {
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
            lihatpasien()
        }
    }, [isFocused])
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Modal isVisible={isModalVisible2}
                onBackdropPress={toggleModal2}
                onBackButtonPress={toggleModal2}>
                <View style={style.content}>
                    <Text style={[style.nunitosans, { textAlign: "center" }]}>{isipesan}</Text>
                    <View style={{ flexDirection: "row", marginTop: 40 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
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
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, marginRight: 5 }}>
                            {menuswitch == 0 ? (
                                <Button title="Data Bayi" buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                            ) : (
                                    <Button title="Data Bayi" onPress={() => gantidata(0)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                )}
                        </View>
                        <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                            {menuswitch == 1 ? (
                                <Button title="Data Ortu" buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                            ) : (
                                    <Button title="Data Ortu" onPress={() => gantidata(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                )}
                        </View>
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            {menuswitch == 2 ? (
                                <Button title="Data Akun" buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                            ) : (
                                    <Button title="Data Akun" onPress={() => gantidata(2)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                )}
                        </View>
                    </View>
                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>

                                {menuswitch == 0 ? (<View>
                                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>Data Bayi</Text>
                                        <Ionicons name={'pencil-outline'} size={24} color={colors.grey} />
                                    </View>

                                    <TouchableOpacity onPress={() => { ubahpasien(0) }} style={[style.card, { marginTop: 15, elevation: 5, padding: 20 }]}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien, { marginTop: 0 }]}>Nama</Text>
                                            <Text style={[style.nunitosans, style.datapasien2, { marginTop: 0 }]}>: {data ? data.baby_name : ""}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Tanggal Lahir</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.baby_birthday : ""}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Jenis Kelamin</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.baby_gender : ""}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Panjang bayi lahir</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.born_length : ""} cm</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Lingkar kepala lahir</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.lingkar_kepala_lahir : ""} cm</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Lingkar kepala sekarang</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.lingkar_kepala_sekarang : ""} cm</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>BB Lahir</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.born_weight : ""} gram</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Usia gestas</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.usia_gestas : ""} Minggu</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Apakah diharapkan orang tua?</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.harapan_orangtua == 1 ? "Iya" : "Tidak" : ""}</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>) : (null)}
                                {menuswitch == 1 ? (<View>
                                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>Data Ortu</Text>
                                        <Ionicons name={'pencil-outline'} size={24} color={colors.grey} />
                                    </View>
                                    <TouchableOpacity onPress={() => { ubahpasien(1) }} style={[style.card, { marginTop: 15, elevation: 5, padding: 20 }]}>
                                        <View>
                                            <Text style={[style.poppinsbold, { fontSize: 14, color: colors.grey, paddingRight: 50 }]}>Data Ibu</Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Nama</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.mother_name : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Tanggal Lahir</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.mother_birthday : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Pekerjaan</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.mother_job : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Tingkat pendidikan</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.mother_education : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Agama</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.mother_religion : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Paritas</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.paritas : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Jumlah anak</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.jumlah_anak == "kds2" ? "Kurang dari sama dengan 2" : "Lebih dari sama dengan 2" : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Pendapatan keluaraga</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.pendapatan_keluarga == "kd3" ? "Kurang dari 3 jt" : "Lebih dari sama dengan 3 jt" : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Pengalaman merawat bayi</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.pengalaman_merawat == "1" ? "Pernah" : "Tidak pernah" : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Apakah ibu tinggal dengan suami?</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.tinggal_dengan_suami == "1" ? "Iya" : "Tidak" : ""}</Text>
                                            </View>

                                            <Text style={[style.poppinsbold, { fontSize: 14, color: colors.grey, marginTop: 22, paddingRight: 50 }]}>Data Ayah</Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Nama</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.father_name : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Tanggal Lahir</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.father_birthday : ""}</Text>
                                            </View>

                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Pekerjaan</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.father_job : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Tingkat pendidikan</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.father_education : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Agama</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.father_religion : ""}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>) : (null)}
                                {menuswitch == 2 ? (<View>
                                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>Data Akun</Text>
                                        <Ionicons name={'pencil-outline'} size={24} color={colors.grey} />
                                    </View>
                                    <TouchableOpacity onPress={() => { ubahpasien(2) }} style={[style.card, { marginTop: 15, elevation: 5, padding: 20 }]}>
                                        <View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien, { marginTop: 0 }]}>Email</Text>
                                                <Text style={[style.nunitosans, style.datapasien2, { marginTop: 0 }]}>: {data ? data.email : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>No Hp</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.phone : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Username</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.username : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Password</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: *******</Text>
                                            </View>
                                            {data ? data.materi.map((item,index) =>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={[style.nunitosans, style.datapasien]}>{index==0?"Rekomendasi Materi":""}</Text>
                                                    <Text style={[style.nunitosans, style.datapasien2]}>: {item.title}</Text>
                                                </View>
                                            ) : ""}
                                        </View>
                                    </TouchableOpacity>
                                </View>) : (null)}

                            </View>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};



export default Datapasien;
