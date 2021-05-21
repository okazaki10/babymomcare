import React, { useRef, useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { colors } from '../../../globalstyles';
import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRoute, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import MultiSelect from 'react-native-multiple-select';
function Tambahresume(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [tempatkontrol, settempatkontrol] = useState("")
    const [bb, setbb] = useState("")
    const [pb, setpb] = useState("")
    const [lk, setlk] = useState("")
    const [suhu, setsuhu] = useState("")
    const [ayd, setayd] = useState([""])
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [hasil_penunjang,sethasil_penunjang] = useState("")
    const [terapi_pulang,setterapi_pulang] = useState("")

    const [items, setitems] = useState([{}])
    const [selectedItems, setselectedItems] = useState([])

    const onSelectedItemsChange = (selectedItems) => {
        setselectedItems(selectedItems)
        console.log(selectedItems)
    };

    const referensi = useRef()
    
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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = (tipe) => {
        setMode(tipe);
        setShow(true);
    };

    const [spinner, setspinner] = useState(false)
    const [gambar, setgambar] = useState("")
    const [gambar2, setgambar2] = useState("")
    const [hide, sethide] = useState(true)
    const [options, setoptions] = useState({
        title: 'Pilih Foto',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        quality: 0.5
    })
    const tambahanjuran = () => {
        setayd(index => [...index, ""])
    }
    const [anjuran, setanjuran] = useState("")
    const [id_resume, setid_resume] = useState("")
    const resumediubah = () => {
        setspinner(true)
        fetch(global.url + '/kontrol/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: id_resume,
                title: "Data Resume",
                date: format(date, "yyyy-MM-dd HH:mm:ss"),
                tempat_kontrol: tempatkontrol,
                weight: bb,
                length: pb,
                lingkar_kepala: lk,
                temperature: suhu,
                base64_img: gambar2,
                note: anjuran,
                mode: "resume",
                patient_id: props.route.params.id
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Resume Pulang berhasil diubah!")
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
    const resumedibuat = () => {
        setspinner(true)
        fetch(global.url + '/kontrol/store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                title: "Data Resume",
                date: format(date, "yyyy-MM-dd HH:mm:ss"),
                tempat_kontrol: tempatkontrol,
                weight: bb,
                length: pb,
                lingkar_kepala: lk,
                temperature: suhu,
                base64_img: gambar2,
                note: anjuran,
        
                mode: "resume",
                patient_id: props.route.params.id
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Resume Pulang berhasil dibuat!")
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
    const resumedibuat2 = () => {
        setspinner(true)
        fetch(global.url + '/kontrol/store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                title: "Data Resume",
                date: format(date, "yyyy-MM-dd HH:mm:ss"),
                tempat_kontrol: tempatkontrol,
                weight: bb,
                length: pb,
                lingkar_kepala: lk,
                temperature: suhu,
                base64_img: gambar2,
                nurse_note: anjuran,
                hasil_penunjang:hasil_penunjang,
                terapi_pulang:terapi_pulang,
                advices:selectedItems,
                mode: "resume",
                patient_id: props.route.params.id
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Resume Pulang berhasil dibuat!")
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
    const kontroldiubah = () => {
        setspinner(true)
        fetch(global.url + '/kontrol/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id: props.route.params.id,
                order: 1,
                date: format(date, "yyyy-MM-dd HH:mm:ss"),
                tempat_kontrol: tempatkontrol,
                weight: bb,
                length: pb,
                lingkar_kepala: lk,
                temperature: suhu,
                base64_img: gambar2,
                note: anjuran,
                mode: "kontrol"
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Data Kontrol berhasil diubah!")
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
    const kontroldibuat = () => {
        setspinner(true)
        fetch(global.url + '/kontrol/store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                title: "Data Kontrol",
                date: format(date, "yyyy-MM-dd HH:mm:ss"),
                tempat_kontrol: tempatkontrol,
                weight: bb,
                length: pb,
                lingkar_kepala: lk,
                temperature: suhu,
                base64_img: gambar2,
                note: anjuran,
                mode: "kontrol"
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Data Kontrol berhasil dibuat!")
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
        props.navigation.goBack()
        toggleModal()
    }
    const gantiprofil = () => {

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                if (response.uri) {
                    sethide(false)
                    setgambar(response.uri)
                    setgambar2(response.data)
                }

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

            }
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
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    sethide(false)
                    setid_resume(json.data.id)
                    settempatkontrol(json.data.tempat_kontrol)
                    setbb(json.data.weight.toString())
                    setlk(json.data.lingkar_kepala.toString())
                    setpb(json.data.length.toString())
                    setsuhu(json.data.temperature.toString())
                    setgambar(json.data.image)
                    setanjuran(json.data.nurse_note)
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
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    if (json.data) {
                        sethide(false)
                        setid_resume(json.data.id)
                        settempatkontrol(json.data.tempat_kontrol)
                        setbb(json.data.weight.toString())
                        setlk(json.data.lingkar_kepala.toString())
                        setpb(json.data.length.toString())
                        setsuhu(json.data.temperature.toString())
                        setgambar(json.data.image)
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
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    if (json.data) {
                        sethide(false)
                        setid_resume(json.data.id)
                        settempatkontrol(json.data.tempat_kontrol)
                        setbb(json.data.weight.toString())
                        setlk(json.data.lingkar_kepala.toString())
                        setpb(json.data.length.toString())
                        setsuhu(json.data.temperature.toString())
                        setgambar(json.data.image)
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
    const [isModalVisible4, setModalVisible4] = useState(false);
    const toggleModal4 = () => {
        setModalVisible4(!isModalVisible4);
    };
    const lihatadvice = () => {
        //setspinner(true)
        fetch(global.url + '/advice/list', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setitems(json.data)
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
        lihatadvice()
        if (global.add == 0) {
            if (global.mode == "kontrol") {
                lihatkontrol()
            } else if (global.mode == "resume") {
                if (global.status == 1) {
                    lihatresume()
                } else {
                    lihatresume2()
                }
            }
        }
    })

    return (
        <View style={style.main}>

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
                        <Text style={[style.poppinsmedium, { fontSize: 14 }]}>Tanggal Kontrol Selanjutnya</Text>
                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity onPress={toggleModal4} style={[style.card, { flexDirection: "row", alignItems: "center", marginTop: 20, elevation: 5 }]}>
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

                        <View>
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Tempat Kontrol</Text>
                            <TextInput value={tempatkontrol} onChangeText={settempatkontrol} style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Berat Badan</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput value={bb} onChangeText={setbb} style={{ padding: 0, marginLeft: 10 }} keyboardType="numeric"></TextInput>
                            <Text style={{ marginLeft: 5 }}>gram</Text>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Panjang Badan</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput value={pb} onChangeText={setpb} style={{ padding: 0, marginLeft: 10 }} keyboardType="numeric"></TextInput>
                            <Text style={{ marginLeft: 5 }}>cm</Text>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Lingkar Kepala</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput value={lk} onChangeText={setlk} style={{ padding: 0, marginLeft: 10 }} keyboardType="numeric"></TextInput>
                            <Text style={{ marginLeft: 5 }}>cm</Text>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Suhu</Text>
                        <View style={[style.card, { flexDirection: "row", alignItems: "center", elevation: 5 }]}>
                            <TextInput value={suhu} onChangeText={setsuhu} style={{ padding: 0, marginLeft: 10 }} keyboardType="numeric"></TextInput>
                            <Text style={{ marginLeft: 5 }}>celcius</Text>
                        </View>
                        {global.status == 1 ? (<View>
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Catatan tambahan</Text>
                            <TextInput value={anjuran} onChangeText={setanjuran} style={[style.card, { elevation: 5, marginTop: 15 }]} multiline={true}></TextInput>
                        </View>) : (<View>
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Catatan dari perawat</Text>
                            <TextInput value={anjuran} onChangeText={setanjuran} style={[style.card, { elevation: 5, marginTop: 15 }]} multiline={true}></TextInput>
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Hasil Penunjang</Text>
                            <TextInput value={hasil_penunjang} onChangeText={sethasil_penunjang} style={[style.card, { elevation: 5, marginTop: 15 }]} multiline={true}></TextInput>
                            <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Terapi Pulang</Text>
                            <TextInput value={terapi_pulang} onChangeText={setterapi_pulang} style={[style.card, { elevation: 5, marginTop: 15,marginBottom:22 }]} multiline={true}></TextInput>
                            <MultiSelect
                                hideTags
                                items={items}
                                uniqueKey="id"
                                ref={referensi}
                                onSelectedItemsChange={onSelectedItemsChange}
                                selectedItems={selectedItems}
                                selectText="Pilih Saran Anjuran"
                                searchInputPlaceholderText="Pilih Anjuran..."
                                onChangeInput={(text) => console.log(text)}
                                submitButtonText="Submit"
                            />
                        </View>)}
                        <View>

                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20 }]}>Upload Foto Bayi</Text>
                        {gambar ? (<Image
                            source={{ uri: gambar == "" ? "https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg" : gambar }}
                            style={{ width: "100%", height: DEVICE_WIDTH * 0.7 }}
                            resizeMode="cover"
                        ></Image>) : (null)}


                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Button title="Upload Foto" onPress={gantiprofil} buttonStyle={[style.button, { backgroundColor: "#C4C4C4" }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                            </View>
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: "center" }}>
                                <Text style={[style.poppinsmedium, { fontSize: 14 }]}>Pilih Foto</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ padding: 22, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        {global.mode == "resume" ? (<View>
                            {global.add == 1 ? (
                                <Button title="Simpan" onPress={() => {
                                    if (global.status == 1) {
                                        resumedibuat()
                                    } else {
                                        resumedibuat2()
                                    }
                                }} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>) : (
                                <Button title="Simpan" onPress={resumediubah} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>)}
                        </View>) : (<View>
                            {global.add == 1 ? (
                                <Button title="Simpan" onPress={kontroldibuat} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>) : (
                                <Button title="Simpan" onPress={kontroldiubah} buttonStyle={[style.button, { backgroundColor: "#92B1CD" }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>)}
                        </View>)}

                    </View>
                </View>
            </View>
        </View>
    );
};

export default Tambahresume;
