import React, {Component} from 'react';
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';

/**
 * Created by Jeepend on 13/12/2016.
 */
export class AlertDialog extends Component {
    BUTTON_INDEX_LEFT = 0
    BUTTON_INDEX_RIGHT = 1
    state = {
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    onLeftButtonClick() {
        this.onButtonClick(this.BUTTON_INDEX_LEFT)
    }

    onRightButtonClick() {
        this.onButtonClick(this.BUTTON_INDEX_RIGHT)
    }

    onButtonClick(index) {
        this.setState({
            modalVisible: false
        })
        this.props.onClick(index)
    }

    render() {
        var Platform = require('Platform');
        if (Platform.OS === 'android') {
            return (
                <Modal
                    style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }}>
                    <View style={styles.modalStyle}>
                        <View style={styles.subView}>
                            <Text style={styles.titleText}>{this.props.title}</Text>
                            {this.props.getView()}
                            <View style={styles.horizontalLine}/>
                            <View style={styles.buttonView}>
                                <TouchableOpacity underlayColor='transparent'
                                                  style={styles.buttonStyle}
                                                  onPress={this.onLeftButtonClick.bind(this)}>
                                    <Text style={styles.buttonText}>{this.props.leftButtonText}</Text>
                                </TouchableOpacity>
                                <View style={styles.verticalLine}/>
                                <TouchableOpacity underlayColor='transparent'
                                                  style={styles.buttonStyle}
                                                  onPress={this.onRightButtonClick.bind(this)}>
                                    <Text style={styles.buttonText}>{this.props.rightButtonText}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        } else {
            return (
                <Modal
                    style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }}>
                    <View style={styles.modalStyle}>
                        <View style={styles.subView}>
                            <Text style={styles.titleText}>{this.props.title}</Text>
                            {this.props.getView()}
                            <View style={styles.horizontalLineIOS}/>
                            <View style={styles.buttonView}>
                                <TouchableOpacity underlayColor='transparent'
                                                  style={styles.buttonStyle}
                                                  onPress={this.onLeftButtonClick.bind(this)}>
                                    <Text style={styles.buttonText}>{this.props.leftButtonText}</Text>
                                </TouchableOpacity>
                                <View style={styles.verticalLine}/>
                                <TouchableOpacity underlayColor='transparent'
                                                  style={styles.buttonStyle}
                                                  onPress={this.onRightButtonClick.bind(this)}>
                                    <Text style={styles.buttonText}>{this.props.rightButtonText}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }

    }
}
;
var styles = StyleSheet.create({
    modalStyle: {
        // backgroundColor:'#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    subView: {
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    titleText: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentText: {
        margin: 8,
        fontSize: 14,
        textAlign: 'center',
    },
    horizontalLine: {
        marginTop: 5,
        height: 0.5,
        backgroundColor: '#ccc',
    },
    horizontalLineIOS: {
        marginTop: 221,
        height: 0.5,
        backgroundColor: '#ccc',
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle: {
        flex: 1,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verticalLine: {
        width: 0.5,
        height: 44,
        backgroundColor: '#ccc',
    },
    buttonText: {
        fontSize: 16,
        color: '#3393F2',
        textAlign: 'center',
    },
})