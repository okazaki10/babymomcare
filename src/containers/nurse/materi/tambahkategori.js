import React, { createRef, useState } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker';
import { actions, defaultActions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
function Tambahkategori(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [judul, setjudul] = useState(props.route.params?props.route.params.judul:"")
    const [pertanyaan, setpertanyaan] = useState("")
    const [topik, settopik] = useState("")
    const textref = createRef()
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

    const [gambar, setgambar] = useState(props.route.params?props.route.params.gambar:"")
    const [gambar2, setgambar2] = useState("")
    const [spinner, setspinner] = useState(false)
    const [nilai, setnilai] = useState("")
    const forumdiubah = () => {
        setspinner(true)
        fetch(global.url + '/materi/category/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                id:props.route.params.id,
                name: judul,
                base64_image:gambar2
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Materi berhasil diubah!")
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
    const forumdibuat = () => {
        setspinner(true)
        fetch(global.url + '/materi/category/store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                name: judul,
                base64_image:gambar2
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Kategori berhasil dibuat!")
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

    const [hide, sethide] = useState(true)
    const [options, setoptions] = useState({
        title: 'Pilih Foto',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        quality: 0.5
    })
    const gantiprofil = () => {

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                ToastAndroid.show(response.error == "Permissions weren't granted"?"Anda harus mengizinkan/permission pada aplikasi di pengaturan":"", ToastAndroid.SHORT)
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
    const nursedibuat = () => {

    }
    const kembali = () => {
        props.navigation.goBack()
        toggleModal()
    }
    
    return (
        <View style={style.main}>

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
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{ flex: 1, padding: 22 }}>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 5, color: colors.judulforum }]}>Judul Materi</Text>
                        <TextInput value={judul} onChangeText={setjudul} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]}></TextInput>
                        
                        {gambar ? (
                            <View style={{ marginTop: 15 }}><Image
                                source={{ uri: gambar == "" ? "https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg" : gambar }}
                                style={{ width: "100%", height: DEVICE_WIDTH * 0.7 }}
                                resizeMode="cover"
                            ></Image></View>):(null)}


                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Button title="Upload Foto Kecil" onPress={gantiprofil} buttonStyle={[style.button, { backgroundColor: "#C4C4C4" }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                            </View>
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: "center" }}>
                                <Text style={[style.poppinsmedium, { fontSize: 14 }]}>Pilih Foto Kecil</Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>
             
                <View style={{ padding: 22, flexDirection: "row" }}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Button title="Batal" onPress={() => props.navigation.goBack()} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.button2, borderWidth: 2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                    </View>
                    {global.add == 1 ? (<View style={{ flex: 1, marginLeft: 10 }}>
                        <Button title="Kirim" onPress={forumdibuat} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: colors.button2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                    </View>) : (<View style={{ flex: 1, marginLeft: 10 }}>
                        <Button title="Kirim" onPress={forumdiubah} buttonStyle={[style.button, { backgroundColor: colors.button2, borderWidth: 2, borderColor: colors.button2 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 15 }]}></Button>
                    </View>)}

                </View>
            </View>

        </View>
    );
};

export default Tambahkategori;
