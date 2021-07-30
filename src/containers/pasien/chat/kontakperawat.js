import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView,  TouchableOpacity, ToastAndroid, StatusBar, Linking } from 'react-native';
import {  Text} from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faComments } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { useIsFocused } from '@react-navigation/native';
function Kontakperawat(props) {


    const [spinner, setspinner] = useState(false)

    const openWhatsApp = (msg, mobile) => {
        let url =
            "whatsapp://send?text=" +
            msg +
            "&phone=62" +
            mobile;
        Linking.openURL(url)
            .then(data => {
                console.log("WhatsApp Opened successfully " + data);
            })
            .catch(() => {
                alert("Make sure WhatsApp installed on your device");
            });
    };
 
    const openMaps = (address) => {
        Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + address);
    }
 
    const [data,setdata] = useState([{}])
    const shownurse = () => {
      
        fetch(global.url + '/patient/show', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            },
            body: JSON.stringify({
               id:props.route.params.id_kontak
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
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />


            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', marginTop: 50 }}>
                        <Image
                            source={require("../../../assets/image/profilcewe.png")}
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={[style.poppinsbold, { textAlign: "center", fontSize: 18, marginTop: 15 }]}>{data.name}</Text>
                    <View style={{ marginRight: 15, marginLeft: 15, marginTop: 20 }}>
                        <TouchableOpacity onPress={()=>{props.navigation.navigate("Chat",{id:props.route.params.id})}} style={[style.button, { backgroundColor: "#92B1CD", alignItems: "center", justifyContent: "center", height: 40 }]}>
                            <View style={{ flexDirection: "row" }}>
                                <FontAwesomeIcon icon={faComments} size={18} color={"white"}></FontAwesomeIcon>
                                <Text style={[style.poppinsbutton, { color: "white", fontSize: 15, marginLeft: 5 }]}>Kontak Perawat</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, padding: 20 }}>

                        <View style={{ padding: 3 }}>
                            <View>
                                <TouchableOpacity onPress={() => { openWhatsApp("", data.phone) }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0 }]}>
                                    <Image
                                        source={{ uri: "https://image.flaticon.com/icons/png/512/124/124034.png" }}
                                        style={{ width:40, height: 65,borderRadius:50,marginRight:15,marginLeft:15}}
                                        resizeMode="contain"
                                    />
                                    <View style={{ marginLeft: 0, justifyContent: "center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15 }]}>{data.phone}</Text>
                                    </View>
                                </TouchableOpacity>
                        
                                <TouchableOpacity onPress={() => { openMaps(data.hospital) }} style={[style.card, { marginTop: 15, flexDirection: "row", padding: 0 }]}>
                                    <View style={{ width: 70, height: 65, justifyContent: "center", alignItems: "center" }}>
                                        <Image
                                            source={{ uri: "https://logos-download.com/wp-content/uploads/2016/05/Google_Maps_logo_icon.png" }}
                                            style={{ width: 50, height: 65 }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={{ marginLeft: 0, justifyContent: "center" }}>
                                        <Text style={[style.poppinsbold, { fontSize: 15, marginRight: 50 }]}>{data.hospital}</Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={[style.poppinsmedium, { fontSize: 14, textAlign:"center",marginTop:25 }]}>Perawat tidak menjawab?</Text>
                                <TouchableOpacity onPress={()=>{props.navigation.goBack()}} style={{ alignItems: "center" }}>
                                    <Text style={[style.poppinsmedium, { fontSize: 14, textDecorationLine: "underline",color:colors.button }]}>Kontak perawat lainnya disini</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>

            </View>

        </View>
    );
};

export default Kontakperawat;
