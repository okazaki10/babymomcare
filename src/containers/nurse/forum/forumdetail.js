import React, { useEffect,useState } from 'react';
import { View, Image, ScrollView, ToastAndroid, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';

import Spinner from 'react-native-loading-spinner-overlay';

import { useIsFocused } from '@react-navigation/native';
import Dash from 'react-native-dash';
function Forumdetail(props) {
 
    const [spinner, setspinner] = useState(false)

    const [data, setdata] = useState({ comments: [] })
    const lihatforum = () => {
        //setspinner(true)
        fetch(global.url + '/forum/show', {
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
            lihatforum()
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
                    <View style={{ flex: 1, padding: 23 }}>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={[style.poppinsbold, { fontSize: 20, color: colors.grey, flex: 1 }]}>{data.title}</Text>
                        </View>

                        <View style={[style.card, { marginTop: 15, elevation: 5 }]}>
                            <View style={[{ flexDirection: "row" }]}>
                                <View style={{ marginTop: 5 }}>
                                    {data.role == "patient" ? (<Image
                                        source={require("../../../assets/image/addpeople.png")}
                                        style={{ width: 25, height: 25 }}
                                        resizeMode="contain"
                                    />) : (data.role == "nurse" ? (
                                        <Image
                                            source={require("../../../assets/image/profilcewe.png")}
                                            style={{ width: 25, height: 25 }}
                                            resizeMode="contain"
                                        />
                                    ) : (<Image
                                        source={require("../../../assets/image/admin.png")}
                                        style={{ width: 25, height: 25 }}
                                        resizeMode="contain"
                                    />))}
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={[style.poppinsbold, { fontSize: 17, color: colors.grey, paddingRight: 50 }]}>{data.name}</Text>
                                    <Text style={[style.poppinsmedium, { fontSize: 15, color: colors.grey, paddingRight: 50 }]}>{data.role == "nurse" ? "Perawat" : data.role == "admin"||data.role=="super_admin" ? "Koordinator Perawat" : "Pasien"}</Text>
                                    <Text style={[style.nunitosans, { fontSize: 15, color: colors.grey, marginTop: 5, paddingRight: 50 }]}>{data.question}</Text>
                                </View>
                            </View>

                        </View>
                        <Button title="+ Tambah Komentar" onPress={() => {
                            props.navigation.navigate("Addcomment", { id: data.id })
                            global.add = 1
                        }} buttonStyle={[style.button, { marginTop: 20 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <Text style={[style.poppinsbold, { fontSize: 20, color: colors.grey, flex: 1 }]}>Komentar</Text>
                        </View>

                        <View style={[style.card, { marginTop: 15, elevation: 5 }]}>

                            {data.comments.map((item) => (
                                <View>


                                    <View style={[{ flexDirection: "row" }]}>
                                        <View style={{ marginTop: 5 }}>
                                            {item.role == "patient" ? (<Image
                                                source={require("../../../assets/image/addpeople.png")}
                                                style={{ width: 25, height: 25 }}
                                                resizeMode="contain"
                                            />) : (item.role == "nurse" ? (
                                                <Image
                                                    source={require("../../../assets/image/profilcewe.png")}
                                                    style={{ width: 25, height: 25 }}
                                                    resizeMode="contain"
                                                />
                                            ) : (<Image
                                                source={require("../../../assets/image/admin.png")}
                                                style={{ width: 25, height: 25 }}
                                                resizeMode="contain"
                                            />))}
                                        </View>
                                        <View style={{ marginLeft: 15, flex: 1 }}>
                                            <Text style={[style.poppinsbold, { fontSize: 16, color: colors.grey, paddingRight: 50 }]}>{item.user}</Text>
                                            <Text style={[style.poppinsmedium, { fontSize: 15, color: colors.grey, paddingRight: 50 }]}>{item.role == "nurse" ? "Perawat" : item.role == "admin"||item.role == "super_admin" ? "Koordinator Perawat" : "Ibu"}</Text>
                                            <Dash style={{ width: 100, height: 1, dashColor: 'black' }} />
                                            <Text style={[style.nunitosans, { fontSize: 16, color: colors.grey, marginTop: 5, paddingRight: 50 }]}>{item.text}</Text>
                                        </View>
                                    </View>
                                    <View style={[style.line, { marginBottom: 15 }]}></View>
                                </View>))}
                
                        </View>
                    </View>

                </ScrollView>
            </View>

        </View>
    );
};

export default Forumdetail;
