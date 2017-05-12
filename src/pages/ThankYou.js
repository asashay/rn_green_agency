import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';

import { Button, ImageCustom } from 'react-native-uikit';

class ThankYou extends Component {
    constructor(props) {
        super(props);
    }

    goBack() {
        this.props.navigator.push({name: 'search'});
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageCustom
                    src={'http://esq.h-cdn.co/assets/16/03/1600x800/landscape-1453327694-esq-bill-murray.jpg'}
                    height={200}
                />
                <Text style={{textAlign:'center', fontSize: 20, padding: 10,}}
                      onPress={this.goBack.bind(this)}>Дякуємо за повідомлення!</Text>
                <Button onPress={this.goBack.bind(this)}>На головну</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
        padding: 2,
    },
});

export default ThankYou;