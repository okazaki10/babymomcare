import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../globalstyles';

import style from '../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
function Webview(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);

    return <WebView source={{ uri: "http://192.168.1.6:10/register" }}
     />;
};

export default Webview;
