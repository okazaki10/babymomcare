import React, { useEffect, useState } from 'react';
import { View, ScrollView, ToastAndroid, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';

import Spinner from 'react-native-loading-spinner-overlay';

import { useIsFocused } from '@react-navigation/native';

function Datanurse(props) {
  
    const [isipesan, setisipesan] = useState("")

    const [spinner, setspinner] = useState(false)

    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [data,setdata] = useState([{}])
    const shownurse = () => {
        //setspinner(true)
        fetch(global.url + '/admin/nurse/show', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
               id:global.nurse_id
            })
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
            shownurse()
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

                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien, { marginTop: 0 }]}>Nama</Text>
                                    <Text style={[style.nunitosans, style.datapasien2, { marginTop: 0 }]}>: {data.name}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Username</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: {data.username}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Password</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: ********</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Alamat Rumah Sakit</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: {data.hospital}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Tingkat Pendidikan</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: {data.education}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Nomor Telepon</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: {data.phone}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.nunitosans, style.datapasien]}>Lama Bekerja</Text>
                                    <Text style={[style.nunitosans, style.datapasien2]}>: {data.working_exp} tahun</Text>
                                </View>
                                
                            </View>
                        </View>
                    </ScrollView>
                </View>


            </View>

        </View>
    );
};



export default Datanurse;
