import * as _ from 'lodash';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import CheckBox from 'react-native-checkbox';

import firebase from '../utils/firebase';
import { Button } from 'react-native-uikit';

class SubmitComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plastic: false,
            glass: false,
            paper: false,
        };
    }

    submit() {
        firebase.database().ref('todo').push(_.extend({}, this.props.company, {containers: this.state}))
            .then(() => this.props.navigator.push({name: 'thankyou'}))
            .catch(console.log);
    }

    goBack(){
        this.props.navigator.push({name: 'search'});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{textAlign:'left', fontSize: 20, padding: 10, backgroundColor: '#19dd89', marginBottom: 3}}
                      onPress={this.goBack.bind(this)}>Назад</Text>

                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        label='Пластик'
                        checked={this.state.plastic}
                        onChange={(checked) => this.setState({plastic: !this.state.plastic})}
                    />
                    <CheckBox
                        label='Скло'
                        checked={this.state.glass}
                        onChange={(checked) => this.setState({glass: !this.state.glass})}
                    />
                    <CheckBox
                        label='Папір'
                        checked={this.state.paper}
                        onChange={(checked) => this.setState({paper: !this.state.paper})}
                    />
                    <Button onPress={this.submit.bind(this)}>Відправити</Button>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    checkBoxContainer: {
        padding: 10,
        justifyContent: 'center',
        paddingTop: 150,
    },

});

export default SubmitComponent;