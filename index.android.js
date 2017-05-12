/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    Navigator,
} from 'react-native';

import Search from './src/pages/Search';
import Submit from './src/pages/Submit';
import ThankYou from './src/pages/ThankYou';

export default class rn_green_agency extends Component {
    renderScene(route, navigator) {
        switch(route.name) {
            case 'submit':
                return <Submit navigator={navigator} company={route.company}/>;
                break;
            case 'search':
                return <Search navigator={navigator}/>;
                break;
            case 'thankyou':
                return <ThankYou navigator={navigator}/>;
                break;
            default:
                return <Search navigator={navigator}/>;
                break;
        }
    }
    render() {
        return (
            <Navigator
                initialRoute={{name: 'search'}}
                renderScene={this.renderScene}
            />
        );
    }
}

AppRegistry.registerComponent('rn_green_agency', () => rn_green_agency);
