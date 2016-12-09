/**
 * Created by lixuesong on 16/11/11.
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    DeviceEventEmitter,
    ScrollView
} from 'react-native';

import {
    HS6Module,
    HS6ProfileModule
} from 'ihealthlibrary-react-native'

var styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        marginTop: 60
    },
    // 导航栏
    heading: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center', // 内容居中显示
        marginBottom: 10
    },
    // 导航栏文字
    headText: {
        color: '#ff5555',
        fontSize: 22
    },
    // 按钮
    button: {
        height: 45,
        marginTop: 10,
        justifyContent: 'center', // 内容居中显示
        backgroundColor: '#eedddd',
        alignItems: 'center'
    },
    // 按钮文字
    buttonText: {
        fontSize: 18
    },
    cell: {
        marginTop: 10,
        height: 25,
        alignItems: 'flex-start',
        justifyContent: 'center', // 内容居中显示
        marginBottom: 5
    },
});

export default class HS6View extends Component {

    constructor(props) {
        super(props)
        this.state = {
            resultText: ""
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={{height: 100, paddingBottom: 10}}>
                    <Text>{this.state.resultText}</Text>
                </ScrollView>
                <ScrollView style={styles.contentContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            HS6Module.init("anudroid.apk06@gmail.com")
                        }}>
                        <Text style={styles.buttonText}>
                            Set User
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            HS6Module.setWifi("TP_LINK_3019", "nicaiba!")
                        }}>
                        <Text style={styles.buttonText}>
                            Set Wifi
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            HS6Module.bindDeviceHS6("1999-11-12 11:29:10", 46.7, 160, 2, 1, "ACCF2337A94E")
                        }}>
                        <Text style={styles.buttonText}>
                            Disconnect
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            HS6Module.unBindDeviceHS6("ACCF2337A94E")
                        }}>
                        <Text style={styles.buttonText}>
                            Disconnect
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            HS6Module.getToken("708bde5b65884f8d9e579e33e66e8e80", "38ff62374a0d4aacadaf0e4fb4ed1931", "anudroid.apk06@gmail.com", "random_str")
                        }}>
                        <Text style={styles.buttonText}>
                            Disconnect
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            HS6Module.setUnit("anudroid.apk06@gmail.com", 0)
                        }}>
                        <Text style={styles.buttonText}>
                            Disconnect
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    componentDidMount() {
        let self = this

        this.notifyListener = DeviceEventEmitter.addListener(HS6Module.Event_Notify, function (e: Event) {
            let resultText
            let action = e.action
            if (action == HS6ProfileModule.ACTION_HS6_SETWIFI) {
                resultText = "The set wifi result information:"
                let result = e[HS6ProfileModule.SETWIFI_RESULT]
                resultText += "\nset wifi result = " + result
            } else if (action == HS6ProfileModule.ACTION_HS6_BIND) {
                let bindExtra = e[HS6ProfileModule.HS6_BIND_EXTRA]
                resultText = "Get bind extra successfully.\nThere is(are) " + bindExtra.length
                    + " data(s) in total:\n"
                for (let i = 0; i < bindExtra.length; i++) {
                    let dataInfo = bindExtra[i]
                    let result = dataInfo[HS6ProfileModule.BIND_HS6_RESULT]
                    let model = dataInfo[HS6ProfileModule.HS6_MODEL]
                    let position = dataInfo[HS6ProfileModule.HS6_POSITION]
                    let settedWifi = dataInfo[HS6ProfileModule.HS6_SETTED_WIFI]
                    resultText += "---------------------------------------------------------------"
                    resultText += "\nresult = " + result
                    resultText += "\nmodel = " + model
                    resultText += "\nposition = " + position
                    resultText += "\nsettedWifi = " + settedWifi
                }
            } else if (action == HS6ProfileModule.ACTION_HS6_UNBIND) {
                resultText = "The unbind information:"
                let result = e[HS6ProfileModule.HS6_UNBIND_RESULT]
                resultText += "\nunbind result = " + result
            } else if (action == HS6ProfileModule.ACTION_HS6_GET_TOKEN) {
                resultText = "The get token information:"
                let result = e[HS6ProfileModule.GET_TOKEN_RESULT]
                resultText += "\nget token result = " + JSON.stringify(e)
            } else if (action == HS6ProfileModule.ACTION_HS6_SET_UNIT) {
                resultText = "The set unit information:"
                let result = e[HS6ProfileModule.SET_UNIT_RESULT]
                resultText += "\nset unit result = " + result
            } else if (action == HS6ProfileModule.ACTION_HS6_ERROR) {
                resultText = "The error information:"
                let result = e[HS6ProfileModule.HS6_ERROR]
                resultText += "\nerror = " + JSON.stringify(e)
            } else {
                resultText = JSON.stringify(e)
            }
            self.setState({resultText: resultText})
        });
    }

    componentWillUnmount() {
        this.disconnectListener.remove()
        this.notifyListener.remove()
    }
}
