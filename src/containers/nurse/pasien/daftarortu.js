import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView,  TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import {Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { TextInput } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'
function Daftarortu(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [namaibu, setnamaibu] = useState("")
    const [agamaibu, setagamaibu] = useState("jawa")
    const [pendidikanibu, setpendidikanibu] = useState("SMA")
    const [pengalamanibu, setpengalamanibu] = useState("1")
    const [pekerjaanibu, setpekerjaanibu] = useState("")
    const [paritas, setparitas] = useState("")
    const [namaayah, setnamaayah] = useState("")
    const [agamaayah, setagamaayah] = useState("jawa")
    const [pendidikanayah, setpendidikanayah] = useState("SMA")

    const [pekerjaanayah, setpekerjaanayah] = useState("")
    const [jumlah_anak, setjumlah_anak] = useState("")
    const [pendapatan, setpendapatan] = useState("kd3")
    const [suami, setsuami] = useState("1")

    const [date, setDate] = useState(new Date());

    const [date2, setDate2] = useState(new Date());
 
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };




    const showDatepicker = (tipe) => {
        toggleModal4()
    };


    const showDatepicker2 = (tipe) => {
        toggleModal5()
    };
    const [spinner, setspinner] = useState(false)
    const [nilai, setnilai] = useState("")
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
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
               
                    setnamaibu(json.data.mother_name)

                    setagamaibu(json.data.mother_religion)
                    setpendidikanibu(json.data.mother_education)
                    setpekerjaanibu(json.data.mother_job)
                    setparitas(json.data.paritas)
                    setnamaayah(json.data.father_name)

                    setagamaayah(json.data.father_religion)
                    setpendidikanayah(json.data.father_job)
                    setpekerjaanayah(json.data.father_job)
                    setjumlah_anak(json.data.jumlah_anak.toString())
                    setpendapatan(json.data.pendapatan_keluarga)
                    setpengalamanibu(json.data.pengalaman_merawat)
                    setsuami(json.data.tinggal_dengan_suami)
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }
    const pasiendiubah = () => {
        setspinner(true)
        fetch(global.url + '/patient/data/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id,
                role: "patient",
                mother_name: namaibu,
                mother_birthday: format(date, "yyyy-MM-dd HH:mm:ss"),
                mother_religion: agamaibu,
                mother_education: pendidikanibu,
                mother_job: pekerjaanibu,
                paritas: paritas,
                father_name: namaayah,
                father_birthday: format(date2, "yyyy-MM-dd HH:mm:ss"),
                father_religion: agamaayah,
                father_education: pendidikanayah,
                father_job: pekerjaanayah,
                jumlah_anak: jumlah_anak,
                pendapatan_keluarga: pendapatan,
                pengalaman_merawat: pengalamanibu,
                tinggal_dengan_suami: suami,
                hospital_entry: global.hospital_entry

            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    if (json.errors.username) {
                        ToastAndroid.show(json.errors.username[0], ToastAndroid.SHORT)
                    } else {
                        ToastAndroid.show(json.message, ToastAndroid.SHORT)
                    }
                } else {
                    if (props.route.params.selectedItems) {
                        assignmateri(json.id)
                    } else {
                        setisipesan("Data ortu berhasil diubah!")
                        toggleModal()
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
        if (global.add == 0) {
            lihatpasien()
        }
    })
    const pasiendibuat = () => {
        setspinner(true)
        fetch(global.url + '/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                role: "patient",
                email: global.emaild,
                phone: global.nohpd,
                username: props.route.params.username,
                password: props.route.params.password,
                baby_name: global.baby_name,
                baby_birthday: global.baby_birthday,
                born_weight: global.born_weight,
                born_length: global.born_length,
                baby_gender: global.baby_gender,
                diagnosa_medis: global.diagnosa_medis,
                hospital_entry: global.hospital_entry,
                mother_name: namaibu,
                mother_birthday: format(date, "yyyy-MM-dd HH:mm:ss"),
                mother_religion: agamaibu,
                mother_education: pendidikanibu,
                mother_job: pekerjaanibu,
                paritas: paritas,
                father_name: namaayah,
                father_birthday: format(date2, "yyyy-MM-dd HH:mm:ss"),
                father_religion: agamaayah,
                father_education: pendidikanayah,
                father_job: pekerjaanayah,
                usia_gestas: global.gestas,
                harapan_orangtua: global.diharapkan,
                lingkar_kepala: global.lk,
                jumlah_anak: jumlah_anak,
                pendapatan_keluarga: pendapatan,
                pengalaman_merawat: pengalamanibu,
                tinggal_dengan_suami: suami

            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    if (json.errors.username) {
                        ToastAndroid.show(json.errors.username[0], ToastAndroid.SHORT)
                    } else {
                        ToastAndroid.show(json.message, ToastAndroid.SHORT)
                    }
                } else {
                    setisipesan("Data pasien berhasil dibuat!")
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

    const kembali = () => {
        props.navigation.navigate("Listpasien")
        toggleModal()
    }
    const [isModalVisible4, setModalVisible4] = useState(false);
    const toggleModal4 = () => {
        setModalVisible4(!isModalVisible4);
    };
    const [isModalVisible5, setModalVisible5] = useState(false);
    const toggleModal5 = () => {
        setModalVisible5(!isModalVisible5);
    };
    return (
        <View style={style.main}>

            <Modal isVisible={isModalVisible5}
                onBackdropPress={toggleModal5}
                onBackButtonPress={toggleModal5}>
                <View style={style.content}>
                    <View>
                        <DatePicker
                            date={date2}
                            onDateChange={setDate2}
                            mode="date"
                        />
                    </View>
                </View>
            </Modal>

            <Modal isVisible={isModalVisible4}
                onBackdropPress={toggleModal4}
                onBackButtonPress={toggleModal4}>
                <View style={style.content}>
                    <View>
                        <DatePicker
                            date={date}
                            onDateChange={setDate}
                            mode="date"
                        />
                    </View>
                </View>
            </Modal>

            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
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
                            <Button title="Ok" onPress={kembali} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: colors.button2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1 }}>

                <ScrollView>
                    <View style={{ flex: 1, padding: 22 }}>
                        {global.add == 1 ? (<View style={{ alignItems: "center" }}>
                            <Image
                                source={require("../../../assets/image/register-pasien-3.png")}
                                style={{ width: "100%", height: DEVICE_WIDTH * 0.15 }}
                                resizeMode="stretch"
                            />
                        </View>) : (null)}
                        <Text style={[style.poppinsbold, { fontSize: 17, marginTop: 15 }]}>Data Keluarga</Text>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Pendapatan Keluarga</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={pendapatan}
                                onValueChange={(itemValue, itemIndex) => {
                                    setpendapatan(itemValue)
                                    console.log(itemValue)
                                }
                                }
                                mode="dropdown">
                                <Picker.Item label="<= 3 juta rupiah" value="kds3" />
                                <Picker.Item label="> 3 juta rupiah" value="lds3" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsbold, { fontSize: 17, marginTop: 15 }]}>Data Ibu</Text>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 5 }]}>Nama Ibu</Text>
                        <TextInput value={namaibu} onChangeText={setnamaibu} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Tanggal lahir ibu</Text>
                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity onPress={() => showDatepicker('date')} style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={[style.nunitosansemi, { fontSize: 15, color: "black", textDecorationLine: "underline" }]}>{format(date, "dd'/'MM'/'yyyy'", { locale: id })}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-end" }}>
                                    <Ionicons name={'calendar-outline'} size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                            <View style={{ justifyContent: "flex-end", marginLeft: 10 }}>
                                <TouchableOpacity onPress={() => setDate(new Date())}>
                                    <Text style={[style.nunitosans, { fontSize: 12, textDecorationLine: "underline" }]}>Set as Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Pekerjaan</Text>
                        <TextInput value={pekerjaanibu} onChangeText={setpekerjaanibu} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>

                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tingkat Pendidikan</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={pendidikanibu}
                                onValueChange={(itemValue, itemIndex) => {
                                    setpendidikanibu(itemValue)
                                    console.log(itemValue)
                                }
                                }
                                mode="dropdown">
                                <Picker.Item label="SD" value="SD" />
                                <Picker.Item label="SMP" value="SMP" />
                                <Picker.Item label="SMA" value="SMA" />
                                <Picker.Item label="DIPLOMA/PERGURUAN TINGGI" value="DIPLOMA/PERGURUAN TINGGI" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Suku</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={agamaibu}
                                onValueChange={(itemValue, itemIndex) => {
                                    setagamaibu(itemValue)
                                    console.log(itemValue)
                                }
                                }
                                mode="dropdown">
                                <Picker.Item label="Batak" value="batak" />
                                <Picker.Item label="Jawa" value="jawa" />
                                <Picker.Item label="Sunda" value="sunda" />
                                <Picker.Item label="Betawi" value="betawi" />
                                <Picker.Item label="Lainnya" value="lainnya" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Paritas</Text>
                        <TextInput value={paritas} onChangeText={setparitas} style={[style.card, { elevation: 5, marginTop: 10 }]} keyboardType="numeric"></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Jumlah Anak</Text>
                        <TextInput value={jumlah_anak} onChangeText={setjumlah_anak} style={[style.card, { elevation: 5, marginTop: 10 }]} keyboardType={"numeric"}></TextInput>

                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Pengalaman Merawat Bayi</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={pengalamanibu}
                                onValueChange={(itemValue, itemIndex) => {
                                    setpengalamanibu(itemValue)
                                    console.log(itemValue)
                                }
                                }
                                mode="dropdown">
                                <Picker.Item label="Pernah" value="1" />
                                <Picker.Item label="Belum Pernah" value="0" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Apakah Tinggal Dengan Suami?</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={suami}
                                onValueChange={(itemValue, itemIndex) => {
                                    setsuami(itemValue)
                                    console.log(itemValue)
                                }
                                }
                                mode="dropdown">
                                <Picker.Item label="Iya" value="1" />
                                <Picker.Item label="Tidak" value="0" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsbold, { fontSize: 17, marginTop: 15 }]}>Data Ayah</Text>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 5 }]}>Nama Ayah</Text>
                        <TextInput value={namaayah} onChangeText={setnamaayah} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 15 }]}>Tanggal lahir ayah</Text>
                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity onPress={() => showDatepicker2('date')} style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={[style.nunitosansemi, { fontSize: 15, color: "black", textDecorationLine: "underline" }]}>{format(date2, "dd'/'MM'/'yyyy'", { locale: id })}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-end" }}>
                                    <Ionicons name={'calendar-outline'} size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                            <View style={{ justifyContent: "flex-end", marginLeft: 10 }}>
                                <TouchableOpacity onPress={() => setDate2(new Date())}>
                                    <Text style={[style.nunitosans, { fontSize: 12, textDecorationLine: "underline" }]}>Set as Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Pekerjaan</Text>
                        <TextInput value={pekerjaanayah} onChangeText={setpekerjaanayah} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tingkat Pendidikan</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={pendidikanayah}
                                onValueChange={(itemValue, itemIndex) => {
                                    setpendidikanayah(itemValue)
                                    console.log(itemValue)
                                }
                                }
                                mode="dropdown">
                                <Picker.Item label="SD" value="SD" />
                                <Picker.Item label="SMP" value="SMP" />
                                <Picker.Item label="SMA" value="SMA" />
                                <Picker.Item label="DIPLOMA/PERGURUAN TINGGI" value="DIPLOMA/PERGURUAN TINGGI" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Suku</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={agamaayah}
                                onValueChange={(itemValue, itemIndex) => {
                                    setagamaayah(itemValue)
                                    console.log(itemValue)
                                }
                                }
                                mode="dropdown">
                                <Picker.Item label="Batak" value="batak" />
                                <Picker.Item label="Jawa" value="jawa" />
                                <Picker.Item label="Sunda" value="sunda" />
                                <Picker.Item label="Betawi" value="betawi" />
                                <Picker.Item label="Lainnya" value="lainnya" />
                            </Picker>
                        </View>
                  
                      

                    </View>
                </ScrollView>

                {global.add == 1 ? (
                    <View style={{ padding: 22, flexDirection: "row" }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Button title="Kembali" onPress={() => props.navigation.goBack()} buttonStyle={[style.button, { backgroundColor: "#EFF3F7" }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Button title="Simpan" onPress={pasiendibuat} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                        </View>
                    </View>) : (
                    <View style={{ padding: 22 }}>
                        <Button title="Simpan" onPress={pasiendiubah} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                    </View>)}


            </View>

        </View>
    );
};

export default Daftarortu;
