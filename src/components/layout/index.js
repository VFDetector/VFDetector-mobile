import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../header';

const SafeLayout = ({children, style, edges}) => {
  return (
    <SafeAreaView
      style={{
        ...style,
        flex: 1,
        backgroundColor: style?.backgroundColor || 'white',
      }}
      edges={edges || ['top']}>
      {children}
    </SafeAreaView>
  );
};

const SafeHeaderLayout = ({children, title, backgroundColor, contentStyle}) => (
  <SafeAreaView
    style={{flex: 1, backgroundColor: backgroundColor}}
    edges={['top']}>
    {/* <Header.transparent name={title} navigation={navigation} /> */}
    <View style={{...contentStyle, flex: 1}}>{children}</View>
  </SafeAreaView>
);

const SafeAbsoluteLayout = ({
  children,
  title,
  backgroundColor,
  contentStyle,
  zIndex,
  edges,
  right,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        zIndex,
        // position: 'absolute',
        top: 0,
      }}
      edges={edges || ['top']}>
      <Header.transparent name={title} right={right} />
      <View style={{...contentStyle, flex: 1}}>{children}</View>
    </SafeAreaView>
  );
};

const ColorHeaderLayout = ({children, title, color, navigation}) => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: color || 'white'}}
      edges={['top']}>
      {/* <Header.colored name={title} color={color} navigation={navigation} /> */}
      {children}
    </SafeAreaView>
  );
};

export {SafeLayout, SafeHeaderLayout, ColorHeaderLayout, SafeAbsoluteLayout};
