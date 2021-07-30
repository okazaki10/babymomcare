import React, { useState } from 'react';
import { View,  Dimensions, ScrollView,ToastAndroid, StatusBar} from 'react-native';
import {Text} from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';

import Spinner from 'react-native-loading-spinner-overlay';

import {

    PieChart

} from "react-native-chart-kit";
function Chartkuis(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');

    const [spinner, setspinner] = useState(false)




    const [data2, setdata2] = useState([{}])
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const lihatforum = () => {
        //setspinner(true)
        fetch(global.url + '/admin/survey/chart', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.key,
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                if (json.errors) {
                    ToastAndroid.show(json.message, ToastAndroid.SHORT)
                } else {
                    setdata2(json)
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
        lihatforum()
    })
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, padding: 20 }}>

                    <ScrollView>
                        <View style={{ padding: 3, flex: 1 }}>
                
                            {data2.map((item) => item ? (<View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[style.poppinsbold, { flex: 1 }]}>{item.survey}</Text>
                                </View>
                                {item.pertanyaan?.map((item2) => item2 ? (
                                    <View style={[style.card, { padding: 22, marginTop: 15 }]}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={[style.poppinsmedium, { fontSize: 14, flex: 1 }]}>{item2.question}</Text>
                                        </View>
                                        <PieChart
                                            data={item2.jawaban}
                                            width={DEVICE_WIDTH * 0.8}
                                            height={200}
                                            chartConfig={chartConfig}
                                            accessor={"count"}
                                            backgroundColor={"transparent"}
                                            paddingLeft={"15"}
                                        />
                                    </View>
                                ) : (null))}
                            </View>) : (null))}

                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Chartkuis;
