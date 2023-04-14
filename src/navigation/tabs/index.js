import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Home from 'src/screens/home';
import Profile from 'src/screens/user/profile';
import BottomBar from './bottomBar';

export default ({route, navigation}) => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {tabIndex == 0 ? <Home setTabIndex={setTabIndex} /> : <Profile />}
      </View>
      <BottomBar tabIndex={tabIndex} setTabIndex={setTabIndex} />
    </View>
  );
};

const styles = StyleSheet.create({
  shadowLv1: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
