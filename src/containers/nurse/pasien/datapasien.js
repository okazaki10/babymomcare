import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp, } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';

import format from 'date-fns/format';
import { id } from 'date-fns/locale';
import { parseISO } from 'date-fns';

function Datapasien(props) {

    const [isipesan, setisipesan] = useState("")




    const [spinner, setspinner] = useState(false)

    const ubahpasien = (index) => {
        if (global.status != 1) {
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
            else if (index == 3) {
                props.navigation.navigate("Daftarakun", { nama: "Ubah Akun", id: props.route.params.id, mode: "materi" })
                global.add = 0
            }
        }
    }



    const [menuswitch2, setmenuswitch2] = useState(0)
    const [menuswitch3, setmenuswitch3] = useState(0)
    const [menuswitch4, setmenuswitch4] = useState(0)
    const [menuswitch5, setmenuswitch5] = useState(0)


    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [data, setdata] = useState([{}])
    const lihatpasien = () => {
        setspinner(true)
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

    const lihatpasien2 = () => {
        setspinner(true)
        fetch(global.url + '/patient/data', {
            method: 'GET',
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
            if (global.status == 1) {
                lihatpasien2()
            } else {
                lihatpasien()
            }
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

                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                                    {menuswitch2 == 0 ? (
                                        <View>
                                            <Button icon={
                                                <View style={{ marginRight: 5 }}>
                                                    <FontAwesomeIcon icon={faChevronUp} size={16} color={colors.grey}></FontAwesomeIcon>
                                                </View>
                                            } title="Data Bayi" onPress={() => setmenuswitch2(1)} buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                        </View>
                                    ) : (
                                        <Button icon={
                                            <View style={{ marginRight: 5 }}>
                                                <FontAwesomeIcon icon={faChevronDown} size={16} color={colors.grey}></FontAwesomeIcon>
                                            </View>
                                        } title="Data Bayi" onPress={() => setmenuswitch2(0)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                    )}
                                </View>
                                {menuswitch2 == 0 ? (<View>
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
                                            <Text style={[style.nunitosans, style.datapasien]}>Tanggal pengkajian</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data.created_at ? format(new Date(data.created_at), "dd' 'MMMM' 'yyy", { locale: id }) : ""}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Tanggal masuk rumah sakit</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data.hospital_entry ? format(parseISO(data.hospital_entry), "dd' 'MMMM' 'yyy", { locale: id }) : ''}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Tanggal pulang dari rumah sakit</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data.return_date ? format(parseISO(data.return_date), "dd' 'MMMM' 'yyy", { locale: id }) : ''}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Tanggal lahir</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data.baby_birthday ? format(new Date(data.baby_birthday), "dd' 'MMMM' 'yyy", { locale: id }) : ""}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Jenis kelamin</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.baby_gender == "male" ? "Laki-laki" : "Perempuan" : ""}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Panjang badan lahir</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.born_length : ""} cm</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Panjang badan sekarang</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.current_length : ""} cm</Text>
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
                                            <Text style={[style.nunitosans, style.datapasien]}>Berat badan lahir</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.born_weight : ""} gram</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Berat badan sekarang</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.current_weight : ""} gram</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Usia gestasi</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.usia_gestas : ""} Minggu</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Apakah diharapkan orang tua?</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.harapan_orangtua == 1 ? "Iya" : "Tidak" : ""}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.nunitosans, style.datapasien]}>Diagnosa medis</Text>
                                            <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.diagnosa_medis : ""}</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>) : (null)}
                                <View style={{ flex: 1, marginLeft: 5, marginRight: 5, marginTop: 20 }}>
                                    {menuswitch3 == 1 ? (
                                        <Button icon={
                                            <View style={{ marginRight: 5 }}>
                                                <FontAwesomeIcon icon={faChevronUp} size={16} color={colors.grey}></FontAwesomeIcon>
                                            </View>
                                        } title="Data Ortu" onPress={() => setmenuswitch3(0)} buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                    ) : (
                                        <Button icon={
                                            <View style={{ marginRight: 5 }}>
                                                <FontAwesomeIcon icon={faChevronDown} size={16} color={colors.grey}></FontAwesomeIcon>
                                            </View>
                                        } title="Data Ortu" onPress={() => setmenuswitch3(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                    )}
                                </View>
                                {menuswitch3 == 1 ? (<View>
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
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data.mother_birthday ? format(new Date(data.mother_birthday), "dd' 'MMMM' 'yyy", { locale: id }) : ""}</Text>
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
                                                <Text style={[style.nunitosans, style.datapasien]}>Suku</Text>
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
                                                <Text style={[style.nunitosans, style.datapasien]}>Pendapatan keluarga</Text>
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
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data.father_birthday ? format(new Date(data.father_birthday), "dd' 'MMMM' 'yyy", { locale: id }) : ""}</Text>
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
                                                <Text style={[style.nunitosans, style.datapasien]}>Suku</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.father_religion : ""}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>) : (null)}
                                <View style={{ flex: 1, marginLeft: 5, marginTop: 20 }}>
                                    {menuswitch4 == 1 ? (
                                        <Button icon={
                                            <View style={{ marginRight: 5 }}>
                                                <FontAwesomeIcon icon={faChevronUp} size={16} color={colors.grey}></FontAwesomeIcon>
                                            </View>
                                        }
                                            title="Data Akun" onPress={() => setmenuswitch4(0)} buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                    ) : (
                                        <Button icon={
                                            <View style={{ marginRight: 5 }}>
                                                <FontAwesomeIcon icon={faChevronDown} size={16} color={colors.grey}></FontAwesomeIcon>
                                            </View>
                                        }
                                            title="Data Akun" onPress={() => setmenuswitch4(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                    )}
                                </View>

                                {menuswitch4 == 1 ? (<View>
                                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>Data Akun</Text>
                                        <Ionicons name={'pencil-outline'} size={24} color={colors.grey} />
                                    </View>
                                    <TouchableOpacity onPress={() => { ubahpasien(2) }} style={[style.card, { marginTop: 15, elevation: 5, padding: 20 }]}>
                                        <View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien, { marginTop: 0 }]}>Rumah sakit</Text>
                                                <Text style={[style.nunitosans, style.datapasien2, { marginTop: 0 }]}>: {data ? data.hospital : ""}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={[style.nunitosans, style.datapasien]}>Email</Text>
                                                <Text style={[style.nunitosans, style.datapasien2]}>: {data ? data.email : ""}</Text>
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
                                        </View>
                                    </TouchableOpacity>
                                </View>) : (null)}
                                <View style={{ flex: 1, marginLeft: 5, marginTop: 20 }}>
                                    {menuswitch5 == 1 ? (
                                        <Button icon={
                                            <View style={{ marginRight: 5 }}>
                                                <FontAwesomeIcon icon={faChevronUp} size={16} color={colors.grey}></FontAwesomeIcon>
                                            </View>
                                        }
                                            title="Rekomendasi materi" onPress={() => setmenuswitch5(0)} buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                    ) : (
                                        <Button icon={
                                            <View style={{ marginRight: 5 }}>
                                                <FontAwesomeIcon icon={faChevronDown} size={16} color={colors.grey}></FontAwesomeIcon>
                                            </View>
                                        }
                                            title="Rekomendasi materi" onPress={() => setmenuswitch5(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                                    )}
                                </View>
                                {menuswitch5 == 1 ? (<View>
                                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15, color: colors.grey, flex: 1 }]}>Rekomendasi materi</Text>
                                        <Ionicons name={'pencil-outline'} size={24} color={colors.grey} />
                                    </View>
                                    <TouchableOpacity onPress={() => { ubahpasien(3) }} style={[style.card, { marginTop: 15, elevation: 5, padding: 20 }]}>
                                        <View>
                                            {data.materi != "" ? data.materi.map((item, index) =>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={[style.nunitosans, style.datapasien]}>{index == 0 ? "Rekomendasi Materi" : ""}</Text>
                                                    <Text style={[style.nunitosans, style.datapasien2]}>: {item.title}</Text>
                                                </View>
                                            ) :
                                                <View>
                                                    <Text>Anda belum mengisi rekomendasi materi</Text>
                                                    <Text>Tekan untuk mengisi rekomendasi materi</Text>
                                                </View>}
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
