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
    BG1Module
} from 'ihealthlibrary-react-native'


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
        console.info('TipView', 'render()', null);
        return (
            <View>
                <Text> Tip: {this.state.tip} </Text>
            </View>
        )
    }

}

export default class BG1View extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        console.info('BG1View', 'componentWillMount', null);

    }

    componentDidMount() {
        console.info('BG1View', 'componentDidMount', null);
    }


    componentWillReceiveProps() {
        console.info('BG1View', 'componentWillReceiveProps', null);
    }

    shouldComponentUpdate() {
        console.info('BG1View', 'shouldComponentUpdate', null);
    }

    componentWillUpdate() {
        console.info('BG1View', 'componentWillUpdate', null);
    }

    componentDidUpdate() {
        console.info('BG1View', 'componentDidUpdate', null);
    }

    componentWillUnmount() {
        console.info('BG1View', 'componentWillUnmount', null);
    }

    render() {

        return (
            <View style={styles.container}>

                <ScrollView style={styles.contentContainer}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._getDeviceIDPS()}>
                        <Text style={styles.buttonText}>
                            连接设备
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._startMeasure()}>
                        <Text style={styles.buttonText}>
                            发送Code
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._stopMeasure()}>
                        <Text style={styles.buttonText}>
                            断开设备
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._getCodeInfoFromQR()}>
                        <Text style={styles.buttonText}>
                            解析Code信息
                        </Text>
                    </TouchableOpacity>
                </ScrollView>


                <TipView ref="TipView"/>
            </View>
        )
    }


    _getCodeInfoFromQR() {
       
    }
}
