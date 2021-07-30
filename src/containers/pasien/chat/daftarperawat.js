import React, { useEffect, useState } from 'react';
import { View, Image,  ScrollView, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Text} from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';

import Spinner from 'react-native-loading-spinner-overlay';

import { useIsFocused } from '@react-navigation/native';
function Daftarperawat(props) {



    const [spinner, setspinner] = useState(false)


    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [isModalVisible3, setModalVisible3] = useState(false);
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    const [data, setdata] = useState([{}])
    const lihatnurse = () => {
      
        fetch(global.url + '/patient/related-nurse', {
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
    const lihatpasien = () => {
      
        fetch(global.url + '/nurse/index', {
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
                lihatnurse()
            } else {
                lihatpasien()
            }
        }
    }, [isFocused])
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: "white", height: 69, justifyContent: "center" }}>
                    <Text style={[style.poppinsbold, { fontSize: 20, textAlign: "center", marginTop: 5 }]}>{global.status == 1 ? "Daftar Perawat" : "Daftar Pasien"}</Text>
                </View>

                <View style={[style.line, { height: 3, backgroundColor: '#ECECEC', marginTop: 0 }]}></View>
                <View style={{ flex: 1, padding: 20 }}>

                    <ScrollView>
                        <View style={{ padding: 3 }}>
                            <View>
                                {data.map((item) => item.id ? (
                                    <TouchableOpacity onPress={() => {
                                        if (global.status == 1) {
                                            props.navigation.navigate("Kontakperawat", { id: item.user_id, id_kontak: item.id })
                                        } else {
                                            props.navigation.navigate("Chat", { nama: "Kontak Pasien", id: item.user_id })
                                        }
                                    }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0 }]}>
                                        {global.status == 1 ? (<Image
                                            source={require("../../../assets/image/profilcewe.png")}
                                            style={{ width: 45, height: 65, marginLeft: 15 }}
                                            resizeMode="contain"
                                        />) : (global.status == 2 ? (<Image
                                            source={require("../../../assets/image/addpeople.png")}
                                            style={{ width: 45, height: 65, marginLeft: 15 }}
                                            resizeMode="contain"
                                        />) : (<Image
                                            source={require("../../../assets/image/admin.png")}
                                            style={{ width: 45, height: 65, marginLeft: 15 }}
                                            resizeMode="contain"
                                        />))}

                                        <View style={{ marginLeft: 15, justifyContent: "center", flex: 1 }}>
                                            <Text style={[style.poppinsbold, { fontSize: 15 }]}>{item.name ? item.name : item.mother_name}</Text>
                                        </View>

                                    </TouchableOpacity>
                                ) : (null))}



                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Daftarperawat;
