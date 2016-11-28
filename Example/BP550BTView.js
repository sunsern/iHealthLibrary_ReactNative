/**
 * Created by zhangxu on 16/11/20.
 */
/**
 * Created by zhangxu on 16/11/11.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableNativeFeedback,
    DeviceEventEmitter,
    ScrollView
} from 'react-native';


import {
    iHealthDeviceManagerModule,
    BP550BTModule,
    BPProfileModule
} from 'ihealthlibrary-react-native'



var styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: 60
    },
    contentContainer: {
        height: 400,
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

class TipView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tip: ''
        }

    }

    render() {
        return (
            <View>
                <Text>
                    Tip: {this.state.tip}
                </Text>
            </View>
        )
    }


}



export default class BP550BTView extends Component {

    constructor(props) {
        super(props);



    }

    componentWillMount() {
        console.info('BP550BTView', 'componentWillMount()', "mac = " + this.props.mac + " type = " + this.props.type);
        this._addListener();
    }

    componentDidMount() {
        console.info('BP550BTView', 'componentDidMount()');
    }


    componentWillReceiveProps() {
        console.info('BP550BTView', 'componentWillReceiveProps()');
    }

    shouldComponentUpdate() {
        console.info('BP550BTView', 'shouldComponentUpdate()');
    }

    componentWillUpdate() {
        console.info('BP550BTView', 'componentWillUpdate()');
    }

    componentDidUpdate() {
        console.info('BP550BTView', 'componentDidUpdate()');
    }

    componentWillUnmount() {
        console.info('BP550BTView', 'componentWillUnmount()');

        this._removeListener();

    }

    render() {

        console.info('BP550BTView', 'render()');

        return (
            <View style={styles.container}>

                <ScrollView style={styles.contentContainer}>
                    <TouchableNativeFeedback

                        onPress={() => this._getDeviceIDPS()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                获得IDPS
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback

                        onPress={() => this._getFunctionInfo()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                获得下位机信息
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback

                        onPress={() => this._getBattery()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                获得电量
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                        onPress={() => this._startMeasure()}>

                        <View style={styles.button}>

                            <Text style={styles.buttonText}>
                                获得离线数据数量
                            </Text>
                        </View>


                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback

                        onPress={() => this._stopMeasure()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                获得离线数据
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback

                        onPress={() => this._disConnect()}>

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                断开连接
                            </Text>
                        </View>


                    </TouchableNativeFeedback>

                </ScrollView>

                <TipView ref='tipView'/>

            </View>


        );


    }


    _addListener() {


        let self = this;

        this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.DeviceDisconnect, function (e: Event) {
            // handle event.
            console.info('BP5View', 'addListener_DeviceDisconnect', JSON.stringify(e));
            self.props.navigator.pop();
        });
        this.notifyListener = DeviceEventEmitter.addListener(BP550BTModule.Event_Notify, function (e: Event) {
            console.info('BP5View', 'addListener_DeviceDisconnect',"Action = " +  e.action + '\n' + "Message = " +  JSON.stringify(e));
            if (e.action === BPProfileModule.Action_Battery) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_getOffLineDataNum) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_getOffLineData) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }
            else if (e.action === BPProfileModule.Action_getFunctionInfo) {
                self.refs.tipView.setState({tip: JSON.stringify(e)});
            }

        });



    }

    _removeListener() {
        //Unregister  event
        if (this.connectionListener) {
            this.connectionListener.remove()
        }
        if (this.notifyListener) {
            this.notifyListener.remove()
        }
    }


    _getDeviceIDPS() {
        iHealthDeviceManagerModule.getDevicesIDPS(this.props.mac, (e) => {
            console.info('deviceInfo:' + JSON.stringify(e));
            this.refs.tipView.setState({tip: JSON.stringify(e)})
        })
    }

    _getFunctionInfo() {

        BP550BTModule.getFunctionInfo(this.props.mac);
    }

    _startMeasure() {

        BP550BTModule.getOffLineNum(this.props.mac);
    }

    _stopMeasure() {
        BP550BTModule.getOffLineData(this.props.mac);
    }

    _getBattery() {
        BP550BTModule.getBattery(this.props.mac);
    }

    _disConnect() {
        BP550BTModule.disconnect(this.props.mac);
    }
}