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
    iHealthDeviceManagerModule,
    HS4SModule,
    HSProfileModule
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

export default class HS4SView extends Component {

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
                            HS4SModule.startMeasure(this.props.mac)
                        }}>
                        <Text style={styles.buttonText}>
                            Start Measure
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            HS4SModule.getHistoryData(this.props.mac)
                        }}>
                        <Text style={styles.buttonText}>
                            Get History Data
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            HS4SModule.disconnect(this.props.mac)
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

        this.disconnectListener = DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Disconnect, function (e: Event) {
            // handle event.
            if (e.mac == self.props.mac) {
                self.props.navigator.pop()
            }
        });

        this.notifyListener = DeviceEventEmitter.addListener(HS4SModule.Event_Notify, function (e: Event) {
            let resultText
            let action = e.action
            if (action == HSProfileModule.ACTION_LIVEDATA_HS) {
                resultText = "The live data information:"
                let value = e[HSProfileModule.LIVEDATA_HS]
                resultText += "\nvalue = " + value
            } else if (action == HSProfileModule.ACTION_ONLINE_RESULT_HS) {
                resultText = "The result data information:"
                let dataId = e[HSProfileModule.DATAID]
                resultText += "\ndata id = " + dataId
                let weight = e[HSProfileModule.WEIGHT_HS]
                resultText += "\nweight = " + weight
                // let fat = e[HSProfileModule.FAT_HS]
                // resultText += "\nfat = " + fat
                // let water = e[HSProfileModule.WATER_HS]
                // resultText += "\nwater = " + water
                // let muscle = e[HSProfileModule.MUSCLE_HS]
                // resultText += "\nmuscle = " + muscle
                // let skeleton = e[HSProfileModule.SKELETON_HS]
                // resultText += "\nskeleton = " + skeleton
                // let fateLevel = e[HSProfileModule.FATELEVEL_HS]
                // resultText += "\nfate level = " + fateLevel
                // let DCI = e[HSProfileModule.DCI_HS]
                // resultText += "\nDCI = " + DCI
            } else if (action == HSProfileModule.ACTION_HISTORICAL_DATA_HS) {
                let offlineData = e[HSProfileModule.HISTORDATA__HS]
                resultText = "Get offline data successfully.\nThere is(are) " + offlineData.length
                    + " data(s) in total:\n"
                for (let i = 0; i < offlineData.length; i++) {
                    let dataInfo = offlineData[i]
                    let dataId = dataInfo[HSProfileModule.DATAID]
                    let date = dataInfo[HSProfileModule.MEASUREMENT_DATE_HS]
                    // let weight = dataInfo[HSProfileModule.WEIGHT_HS]
                    // let fat = dataInfo[HSProfileModule.FAT_HS]
                    // let water = dataInfo[HSProfileModule.WATER_HS]
                    // let muscle = dataInfo[HSProfileModule.MUSCLE_HS]
                    // let skeleton = dataInfo[HSProfileModule.SKELETON_HS]
                    // let fateLevel = dataInfo[HSProfileModule.FATELEVEL_HS]
                    // let DCI = dataInfo[HSProfileModule.DCI_HS]
                    resultText += "---------------------------------------------------------------"
                    resultText += "\ndataId = " + dataId
                    resultText += "\ndate = " + date
                    resultText += "\nweight = " + weight
                    // resultText += "\nfat = " + fat
                    // resultText += "\nwater = " + water
                    // resultText += "\nmuscle = " + muscle
                    // resultText += "\nskeleton = " + skeleton
                    // resultText += "\nfate level = " + fateLevel
                    // resultText += "\nDCI = " + DCI
                }
            } else if (action == HSProfileModule.ACTION_NO_HISTORICALDATA) {
                resultText = "No History Data."
            } else if (action == HSProfileModule.ACTION_ERROR_HS) {
                resultText = "Error happens: " + JSON.stringify(e)
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
