/**
 * Created by zhangxu on 16/11/11.
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
    iHealthDeviceManagerModule,
    BP5Module,
    BPProfileModule
} from 'ihealthlibrary-react-native'

import Log from './Log'

let log = new Log;

var styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: 50
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
        };
    }

    render() {
        log.info('TipView', 'render()', null);
        return (
            <View>
                <Text> Tip: {this.state.tip} </Text>
            </View>
        )
    }

}

export default class HS4SView extends Component {

    constructor(props) {
        super(props);

        var error_Listener = null;
        var connectionListener = null;
        var notifyListener = null;
    }

    componentWillMount() {
        log.info('HS4SView', 'componentWillMount', null);
        this._addListener();

    }

    componentWillUnmount() {
        log.info('HS4SView', 'componentWillUnmount', null);
        this._removeListener();
    }



    _addListener() {
        let self = this;

        this.error_Listener = DeviceEventEmitter.addListener(POProfileModule.ACTION_ERROR_PO, function (e: Error) {
            log.info('HS4SView', 'addListener_ACTION_ERROR_HS', JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)});
        });
        this.connectionListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.DeviceDisconnect, function (e: Event) {
            // handle event.
            log.info('HS4SView', 'addListener_DeviceDisconnect', JSON.stringify(e));
            self.props.navigator.pop();
        });
        this.notifyListener = DeviceEventEmitter.addListener(PO3Module.Event_Notify, function (e: Event) {
            log.info('HS4SView', e.action, JSON.stringify(e));
            self.refs.TipView.setState({tip: JSON.stringify(e)});
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

    render() {

        return (
            <View style={styles.container}>

                <ScrollView style={styles.contentContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._measureOnline()}>
                        <Text style={styles.buttonText}>
                            开始测量
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._getOfflineData()}>
                        <Text style={styles.buttonText}>
                            获得离线数据
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._disconnect()}>
                        <Text style={styles.buttonText}>
                            断开连接
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                <TipView ref="TipView"/>
            </View>
        )
    }

    _measureOnline() {
        HS4SModule.measureOnline(this.props.mac, 1, 1)
    }
    _getOfflineData() {
        HS4SModule.getOfflineData(this.props.mac)
    }
    _disconnect() {
        HS4SModule.disconnect(this.props.mac)
    }
}
