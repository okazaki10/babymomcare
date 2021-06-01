import React, { createRef, Fragment, useState } from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';
import { actions, defaultActions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { Platform } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { SafeAreaView } from 'react-native';
import { Alert } from 'react-native';


function Addcomment(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [judul, setjudul] = useState("")
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

    const login = () => {
        props.navigation.navigate("Mainpage")
        /*
        setspinner(true)
        fetch(global.url + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                device_name: "xavier"
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.role == "colleger") {
                    global.status = 0
                    storeData(json.token)
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Menu_bar' }],
                    });
                } else if (json.role == "admin") {
                    global.status = 1
                    storeData(json.token)
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Menu_bar' }],
                    });
                } else {
                    toggleModal()
                    setisipesan("Email atau password salah")
                }
                setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
            */
    };
    const [spinner, setspinner] = useState(false)
    const [nilai, setnilai] = useState("")
    const forumdiubah = () => {
        setisipesan("Tanya jawab berhasil diubah!")
        toggleModal()
    }
    const forumdibuat = () => {
        setspinner(true)
        fetch(global.url + '/forum/comment/store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
                forum_id: props.route.params.id,
                text: pertanyaan
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setisipesan("Komentar berhasil dibuat!")
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
    const items = [
        //name key is must.It is to show the text in front
        { id: 1, name: 'angellist' },
        { id: 2, name: 'codepen' },
        { id: 3, name: 'envelope' },
        { id: 4, name: 'etsy' },
        { id: 5, name: 'facebook' },
        { id: 6, name: 'foursquare' },
        { id: 7, name: 'github-alt' },
        { id: 8, name: 'github' },
        { id: 9, name: 'gitlab' },
        { id: 10, name: 'instagram' },
    ];

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
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={{ flex: 1, padding: 22 }}>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop:0, color: colors.judulforum }]}>Pertanyaan/Komentar</Text>
                        {/*
                        <View style={[style.card]}>
                            <RichEditor
                                ref={textref}
                                onChange={setpertanyaan}
                            />
                        </View>
                         */}
                        <TextInput onChangeText={setpertanyaan} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 10 }]} multiline={true}></TextInput>
                        {/*
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20, color: colors.judulforum }]}>Pilih Topik</Text>
                        <View style={[style.card, { elevation: 5, padding: 0 }]}>
                            <Picker
                                selectedValue={topik}
                                onValueChange={(itemValue, itemIndex) =>
                                    settopik(itemValue)
                                }
                                mode="dropdown">
                                <Picker.Item label="Makanan" value="makanan" />
                                <Picker.Item label="Makanan" value="makanan" />
                                <Picker.Item label="Makanan" value="makanan" />
                            </Picker>
                        </View>
                        <Text style={[style.poppinsmedium, { fontSize: 14, marginTop: 20, color: colors.judulforum }]}>Kategori yang berhubungan</Text>
                        <SafeAreaView>
                            <View>
                                <SearchableDropdown
                                    onTextChange={(text) => console.log(text)}
                                    //On text change listner on the searchable input
                                    onItemSelect={(item) => console.log(item.name)}
                                    //onItemSelect called after the selection from the dropdown
                                    containerStyle={{ maxHeight: 200, }}
                                    //suggestion container style
                                    textInputStyle={{
                                        //inserted text style
                                        padding: 12,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        backgroundColor: '#FAF7F6',
                                    }}
                                    itemStyle={{
                                        //single dropdown item style
                                        padding: 10,
                                        marginTop: 2,
                                        backgroundColor: '#FAF9F8',
                                        borderColor: '#bbb',
                                        borderWidth: 1,
                                    }}
                                    itemTextStyle={{
                                        //text style of a single dropdown item
                                        color: '#222',
                                    }}
                                    itemsContainerStyle={{
                                        //items container style you can pass maxHeight
                                        //to restrict the items dropdown hieght
                                        maxHeight: 200,
                                    }}
                                    items={items}
                                    //mapping of item array
                                    defaultIndex={2}
                                    //default selected item index
                                    placeholder="Pilih Kategori"
                                    //place holder for the search input
                                    resetValue={false}
                                    //reset textInput Value with true and false state
                                    underlineColorAndroid="transparent"
                                    listProps={{ nestedScrollEnabled: true }}
                                //To remove the underline from the android input
                                />
                            </View>
                        </SafeAreaView>
                                */}
                    </View>
                </ScrollView>
                {/*
                <RichToolbar
                    editor={textref}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                    ]}
                />
                */}
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

export default Addcomment;
