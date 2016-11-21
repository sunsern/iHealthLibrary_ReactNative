import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    DeviceEventEmitter
} from 'react-native';

import {
    iHealthDeviceManagerModule,
    AM4Module
} from 'ihealthlibrary-react-native'
/**
 * Created by Jeepend on 16/11/2016.
 */
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
        height: 60,
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

export default class AMView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultText: ""
        }
    }
    render() {
        console.log("AMView render() type = " + this.props.type)
        if (this.props.type == 'AM4') {
            return (
                <View
                    style={styles.container}>
                    <Text>{this.state.resultText}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=> {
                            AM4Module.disconnect(this.props.mac)
                        }}>
                        <Text style={styles.buttonText}>
                            Disconnect
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=> {
                            AM4Module.getUserInfo(this.props.mac)
                        }}>
                        <Text style={styles.buttonText}>
                            GetUserInfo
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View
                    style={styles.container}>
                    <Text>{this.state.resultText}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=> {
                            AM4Module.disconnect(this.props.mac)
                        }}>
                        <Text style={styles.buttonText}>
                            Disconnect
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=> {
                            AM4Module.getUserInfo(this.props.mac)
                        }}>
                        <Text style={styles.buttonText}>
                            GetUserInfo
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

    }
    componentDidMount() {
        let self = this
        this.disconnectListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.DeviceDisconnect, function (e: Event) {
            // handle event.
            if (e.mac == self.props.mac) {
                self.props.navigator.pop()
            }
        });
        this.notifyListener = DeviceEventEmitter.addListener(AM4Module.NOTIFY_EVENT_AM4, function (e: Event) {
            self.setState({resultText: "event: " + JSON.stringify(e)})
        });
    }
    componentWillUnmount() {
        this.disconnectListener.remove()
        this.notifyListener.remove()
    }
}