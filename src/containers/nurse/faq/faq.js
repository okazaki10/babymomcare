import React, { useState } from 'react';
import { View, Image,ScrollView, TouchableOpacity,  StatusBar } from 'react-native';
import {  Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp,faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';


function Faq(props) {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };



    const [spinner, setspinner] = useState(false)

    const [menuswitch, setmenuswitch] = useState(0)
    const [menuswitch2, setmenuswitch2] = useState(0)
    const [menuswitch3, setmenuswitch3] = useState(0)
    const [menuswitch4, setmenuswitch4] = useState(0)
    const [menuswitch5, setmenuswitch5] = useState(0)

    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };


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
                            <Text>Pertanyaan Umum</Text>
                            <Text>Akun</Text>
                            <Text></Text>
                            <View style={[style.card, { flex: 1, marginLeft: 5 }]}>
                                {menuswitch == 1 ? (
                                    <Button icon={
                                        <View style={{ marginRight: 5 }}>
                                            <FontAwesomeIcon icon={faChevronUp} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="1.	Bagaimana cara daftar akun Teman Bunda?" onPress={() => setmenuswitch(0)} buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                ) : (
                                    <Button icon={
                                        <View style={{ marginRight: 5 }}>
                                            <FontAwesomeIcon icon={faChevronDown} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="1.	Bagaimana cara daftar akun Teman Bunda?" onPress={() => setmenuswitch(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                )}

                                {menuswitch == 1 ? (<Text style={{ marginTop: 15 }}>Untuk mendaftar akun Teman bunda, dapat menghubungi perawat yang bersangkutan agar didaftarkan</Text>) : (null)}
                            </View>
                            <View style={[style.card, { flex: 1, marginLeft: 5, marginTop: 20 }]}>
                                {menuswitch2 == 1 ? (
                                    <Button icon={
                                        <View style={{}}>
                                            <FontAwesomeIcon icon={faChevronUp} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="2.	Bagaimana cara saya menggunakan fitur Pengingat?" onPress={() => setmenuswitch2(0)} buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                ) : (
                                    <Button icon={
                                        <View style={{ }}>
                                            <FontAwesomeIcon icon={faChevronDown} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="2.	Bagaimana cara saya menggunakan fitur Pengingat?" onPress={() => setmenuswitch2(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                )}

                                {menuswitch2 == 1 ? (<Text style={{ marginTop: 15 }}>Untuk mengubah profil yang telat dibuat, dapat menguhubungi perawat yang bersangkutan</Text>) : (null)}
                            </View>
                            <View style={[style.card, { flex: 1, marginLeft: 5, marginTop: 20 }]}>
                                {menuswitch3 == 1 ? (
                                    <Button icon={
                                        <View style={{ }}>
                                            <FontAwesomeIcon icon={faChevronUp} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="3.	Apa yang harus dilakukan jika lupa password akun Teman Bunda?" onPress={() => setmenuswitch3(0)} buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                ) : (
                                    <Button icon={
                                        <View style={{ }}>
                                            <FontAwesomeIcon icon={faChevronDown} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="3.	Apa yang harus dilakukan jika lupa password akun Teman Bunda?" onPress={() => setmenuswitch3(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                )}

                                {menuswitch3 == 1 ? (<Text style={{ marginTop: 15 }}>Anda dapat menghubungi perawat yang bersangkutan untuk ganti password lama anda jika lupa</Text>) : (null)}
                            </View>

                            <Text style={{ marginTop: 15 }}>Pengingat</Text>
                            <View style={[style.card, { flex: 1, marginLeft: 5, marginTop: 20 }]}>
                                {menuswitch4 == 1 ? (
                                    <Button icon={
                                        <View style={{marginRight:5}}>
                                            <FontAwesomeIcon icon={faChevronUp} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="1.	Apa itu fitur Pengingat?" onPress={() => setmenuswitch4(0)} buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                ) : (
                                    <Button icon={
                                        <View style={{marginRight:5}}>
                                            <FontAwesomeIcon icon={faChevronDown} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="1.	Apa itu fitur Pengingat?" onPress={() => setmenuswitch4(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                )}

                                {menuswitch4 == 1 ? (<Text style={{ marginTop: 15 }}>Fitur pengingat adalah fitur yang memberikan notifikasi berupa saran anjuran kepada pasien setiap hari</Text>) : (null)}
                            </View>
                            <View style={[style.card, { flex: 1, marginLeft: 5, marginTop: 20 }]}>
                                {menuswitch5 == 1 ? (
                                    <Button icon={
                                        <View style={{ }}>
                                            <FontAwesomeIcon icon={faChevronUp} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="2.	Bagaimana cara saya menggunakan fitur Pengingat?" onPress={() => setmenuswitch5(0)} buttonStyle={[style.button, { backgroundColor: colors.menubutton, borderWidth: 2, borderColor: colors.menubutton,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                ) : (
                                    <Button icon={
                                        <View style={{ }}>
                                            <FontAwesomeIcon icon={faChevronDown} size={16} color={colors.grey}></FontAwesomeIcon>
                                        </View>
                                    }
                                        title="2.	Bagaimana cara saya menggunakan fitur Pengingat?" onPress={() => setmenuswitch5(1)} buttonStyle={[style.button, { backgroundColor: "white", borderColor: colors.menubutton, borderWidth: 2,padding:15 }]} titleStyle={[style.poppinsbutton, { color: colors.grey, fontSize: 12 }]}></Button>
                                )}

                                {menuswitch5 == 1 ? (<Text style={{ marginTop: 15 }}>Anda dapat menekan tombol berbentuk bell pada beranda di sebelah pojok kanan atas atau melihat notifikasi yang ada pada handphone anda</Text>) : (null)}
                            </View>
             
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};



export default Faq;
