import Autocomplete from 'react-native-autocomplete-input';
import * as _ from 'lodash';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    TextInput,
    Keyboard,
} from 'react-native';

import { Button } from 'react-native-uikit';

import firebase from '../utils/firebase';

class AutocompleteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            query: '',
            companyName: '',
            address: '',
            tel: '',
            email: '',
            securityCode: '',
            created: '',
        };
    }

    componentDidMount() {
        firebase.database().ref('users').once('value').then(snapshot => {
            const companies = snapshot.val();
            this.setState({ companies });
        }).catch(console.log);
    }

    findCompany(query) {
        if (query === '') {
            return [];
        }

        const { companies } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return _.filter(companies, company => company.companyName.search(regex) >= 0);
    }

    login() {
        const code = this.state.securityCode.toString();
        const testStr = new RegExp(''.concat(code.slice(0,2), ':', code.slice(2)), 'i');
        testStr.test(this.state.created) ?
            this.props.navigator.push(
                { name: 'submit',
                    company: {
                        companyName: this.state.companyName,
                        address: this.state.address,
                        tel: this.state.tel,
                        email: this.state.email,
                    }
                }) : null;
    }

    handleSelect(companyName, address, created, tel, email) {
        this.setState( { companyName, address, created, tel, email, query: ''} );
        Keyboard.dismiss();
    }
    render() {
        const { query } = this.state;
        const companies = this.findCompany(query);
        const comp = (s, s2) => s.toLowerCase().trim() === s2.toLowerCase().trim();
        return (
            <View>
                <Text style={{textAlign:'center', fontSize: 20, padding: 10, backgroundColor: '#19dd89', marginBottom: 3}}>Green Agency</Text>

                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    data={companies.length === 1 && comp(query, companies[0].companyName) ? [] : companies}
                    defaultValue={query}
                    onChangeText={text => this.setState({ query: text })}
                    placeholder="Введи назву компанії..."
                    renderItem={({ companyName, address, created, tel, email }) => (
                        <TouchableOpacity style={styles.suggestions} onPress={this.handleSelect.bind(this, companyName, address, created, tel, email)}>
                            <Text style={styles.itemText}>
                                {companyName}
                            </Text>
                            <Text style={styles.itemText}>
                                {address}
                            </Text>
                        </TouchableOpacity>
                    )}
                />

                {this.state.companyName ? (
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.itemText}>
                            Компанія: {this.state.companyName}
                        </Text>
                        <Text style={styles.itemText}>
                            Адреса: {this.state.address}
                        </Text>
                        <TextInput
                            keyboardType={'numeric'}
                            placeholder={'Введіть код з кришки контейнера'}
                            style={styles.myInput}
                            onChangeText={(text) => this.setState({securityCode: text})}
                            value={this.state.securityCode}
                        />
                        <Button onPress={this.login.bind(this)}>Логін</Button>
                    </View>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    myInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
    autocompleteContainer: {
        flex: 1,
        height: 200,
    },
    suggestions: {
        zIndex: 5,
    },
    itemText: {
        fontSize: 16,
        paddingLeft: 2,
        paddingRight: 2,
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginLeft: 6,
        marginRight: 6,
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    }
});

export default AutocompleteComponent;