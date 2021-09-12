import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, ToastAndroid, StatusBar, Linking, AppState } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { colors } from '../../../globalstyles';
import style from '../../../globalstyles';

import Spinner from 'react-native-loading-spinner-overlay';

import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import HyperLink from 'react-native-hyperlink';
import { useIsFocused } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";
function Detailmateri(props) {


    const [spinner, setspinner] = useState(false)

    const [selesai, setselesai] = useState(false)
    const [data, setdata] = useState({})
    const lihatdetailmateri = () => {
        //setspinner(true)
        fetch(global.url + '/materi/show', {
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
                    setdata(json.data)
                    var a = json.data.video_url
                    if (a != null) {
                        var b = a.indexOf("youtu.be/")
                        var sub = a.substring(b + 9)
                        setvideo_url(sub)
                        console.log(sub)
                    } else {
                        sethidevideo(false)
                    }
                }
                //setspinner(false)
            })
            .catch((error) => {
                console.error(error)
                ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                setspinner(false)
            });
    }

    const [data2, setdata2] = useState()

    const showquiz = () => {
        setspinner(true)
        fetch(global.url + '/quiz/status', {
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
                    if (json.status == 1) {
                        setselesai(true)
                    }
                    setdata2(json)
                }
                lihatdetailmateri()
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
            showquiz()
        }
    }, [isFocused])

    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);


    const [video_url, setvideo_url] = useState("")
    const [hidevideo, sethidevideo] = useState(true)
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    const _handleAppStateChange = (nextAppState) => {

        appState.current = nextAppState
        console.log(nextAppState)
    };
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <ScrollView>
                <View style={{ flex: 1, padding: 23 }}>

                    {data.quiz ? (global.status == 1 ? (
                        selesai == true ?
                            (<TouchableOpacity onPress={() => {
                                props.navigation.navigate("Historykuis", { id: data.quiz.id, mode: "review", materi_id: data.id })

                            }} style={[style.card, { marginTop: 0, elevation: 5, padding: 20 }]}>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={[style.poppinsbold, style.datapasien, { marginTop: 0 }]}>Review Kuis</Text>
                                    <View>
                                        <Text style={[style.poppinsbold, style.datapasien2, { marginTop: 0, textAlign: "right" }]}>{data2 ? data2.total_point : ""}/{data2 ? data2.total_question : ""}</Text>


                                    </View>
                                </View>
                                <Text style={[style.poppinsbold, style.datapasien2, { marginTop: 0, textAlign: "right" }]}>Nilai = {(100 * (data2.total_point / data2.total_question)).toString().substr(0, 4)}</Text>
                            </TouchableOpacity>
                            ) : (
                                <Button title="Kerjakan Kuis" onPress={() => { props.navigation.navigate("Kerjakankuis", { id: data.quiz.id }) }} buttonStyle={[style.button, { marginTop: 0 }]} titleStyle={[style.poppinsbutton, { color: "white", fontSize: 15 }]}></Button>)
                    ) : (null)) : (null)}
                    <View style={[style.card, { elevation: 10, padding: 19, marginTop: 15 }]}>
                        <Text style={[style.poppinsbold, { fontSize: 17 }]}>{data.title}</Text>
                        <Text style={[style.nunitosans, { fontSize: 12 }]}>{data.date ? format(new Date(data.date), "iii', 'dd' 'MMM', 'yyyy'", { locale: id }) : ""}</Text>
                        <View style={[style.line]}></View>
                        {data.image ? (<Image
                            source={{ uri: data.image ? data.image : "https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg" }}
                            style={{ width: "100%", height: 170, marginTop: 15, marginBottom: 15 }}
                            resizeMode="contain"
                        />) : (null)}

                        <HyperLink onPress={(url, text) => Linking.openURL(url)} linkStyle={{ color: '#2980b9' }}>
                            <Text style={[style.nunitomateri, { fontSize: 14, marginTop: 15, flex: 1 }]}>{data.content}</Text>
                        </HyperLink>
                    </View>
                    {appState.current == "active" ? (hidevideo ? (<View style={[style.card, { elevation: 10, padding: 19, marginTop: 15 }]}>
                        <YoutubePlayer
                            height={170}
                            play={playing}
                            videoId={video_url}
                            onChangeState={onStateChange}
                        />
                    </View>) : (null)) : (null)}


                    {data.forum ? (
                        <View>
                            <Text style={[style.poppinsbold, { fontSize: 17, marginTop: 15 }]}>Tanya jawab Terkait</Text>
                            <View style={[style.card, { elevation: 10, padding: 19, marginTop: 15 }]}>
                                <View>
                                    <TouchableOpacity style={[{ flexDirection: "row" }]} onPress={() => { props.navigation.navigate("Forumdetail", { id: data.forum.id }) }}>
                                        <View style={{ marginLeft: 15 }}>
                                            <Text style={[style.poppinsbold, { fontSize: 12 }]}>{data.forum.title}</Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ) : (null)}
                </View>
            </ScrollView >
        </View >
    );
};

export default Detailmateri;
