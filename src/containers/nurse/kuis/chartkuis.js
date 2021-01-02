import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar, processColor } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../../../globalstyles';

import style from '../../../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BarChart } from 'react-native-charts-wrapper';
import {

    PieChart

} from "react-native-chart-kit";
function Chartkuis(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [cari, setcari] = useState("")

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [spinner, setspinner] = useState(false)
    const [kosong, setkosong] = useState(false)
    const tambahanjuran = () => {
        props.navigation.navigate("Tambahanjuran")
    }
    const kontakperawat = () => {
        props.navigation.navigate("Kontakperawat")

    }
    const tindakananjuran = () => {
        setisipesan("Pilih tindakan untuk reminder ini")
        toggleModal2()
    }
    const hapusanjuran = () => {
        toggleModal2()
        setisipesan("Apakah anda yakin untuk menghapus reminder ini")
        toggleModal3()
    }
    const [title2, settitle2] = useState("")
    const [description2, setdescription2] = useState("")
    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [isModalVisible3, setModalVisible3] = useState(false);
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    const legend = {
        enabled: true,
        textSize: 14,
        form: "SQUARE",
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true
    }
    const data = {
        dataSets: [{
            values: [5, 40, 77, 81, 43],
            label: 'Company A',
            config: {
                drawValues: false,
                colors: [processColor('red')],
            }
        }, {
            values: [40, 5, 50, 23, 79],
            label: 'Company B',
            config: {
                drawValues: false,
                colors: [processColor('blue')],
            }
        }, {
            values: [10, 55, 35, 90, 82],
            label: 'Company C',
            config: {
                drawValues: false,
                colors: [processColor('green')],
            }
        }],
        config: {
            barWidth: 0.2,
            group: {
                fromX: 0,
                groupSpace: 0.1,
                barSpace: 0.1,
            },
        }
    }
    const xAxis = {
        valueFormatter: ['1990', '1991', '1992', '1993', '1994'],
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 5,
        axisMinimum: 0,
        centerAxisLabels: true
    }

    const marker = {
        enabled: true,
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
        markerFontSize: 14,
    }
    const highlights = [{ x: 1, y: 40 }, { x: 2, y: 50 }]
    const [selectedEntry, setselectedEntry] = useState()
    const handleSelect = (event) => {
        let entry = event.nativeEvent
        if (entry == null) {
            setselectedEntry(null)
        } else {
            setselectedEntry(JSON.stringify(entry))
        }
        console.log(event.nativeEvent)
    }
    const data2 = [
        {
            name: "Seoul",
            population: 21500000,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Toronto",
            population: 2800000,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Beijing",
            population: 527612,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "New York",
            population: 8538000,
            color: "#ffffff",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Moscow",
            population: 11920000,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];
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
                            <View style={{ flex: 1 }}>
                                <BarChart
                                    style={{
                                        flex: 1,
                                        height: 200,
                                        width: DEVICE_WIDTH * 0.8
                                    }}
                                    xAxis={xAxis}
                                    data={data}
                                    legend={legend}
                                    drawValueAboveBar={false}
                                    onSelect={handleSelect}
                                    onChange={(event) => console.log(event.nativeEvent)}
                                    highlights={highlights}
                                    marker={marker}
                                />

                            </View>
                            <View>
                                <PieChart
                                    data={data2}
                                    width={DEVICE_WIDTH * 0.8}
                                    height={200}
                                    chartConfig={chartConfig}
                                    accessor={"population"}
                                    backgroundColor={"transparent"}
                                    paddingLeft={"15"}

                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Chartkuis;