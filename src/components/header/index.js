import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, IconButton, useTheme} from 'react-native-paper';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const transparent = props => {
  const {name, right} = props;
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.general.transparentContainer}>
      <View style={styles.standard.buttonContainer}>
        <IconButton
          icon={() => (
            <Icon name="chevron-left" size={40} color={colors.primary} />
          )}
          size={30}
          color={colors.primary}
          style={{backgroundColor: colors.transparentWhite(0.2)}}
          onPress={() => navigation.goBack()}
        />
        {right}
      </View>
      {name && <Text style={styles.standard.title}>{name}</Text>}
    </View>
  );
};

const colored = props => {
  const {name, color, callback, functionLabel, functionColor} = props;

  const navigation = useNavigation();
  return (
    <View style={styles.general.coloredContainer(color)}>
      <View style={styles.standard.buttonContainer}>
        <TouchableOpacity
          style={styles.general.backButton}
          onPress={() => {
            navigation?.goBack();
          }}>
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        {functionLabel ? (
          <TouchableOpacity
            style={styles.standard.secondButton}
            onPress={() => {
              callback ? callback() : null;
            }}>
            <Text style={styles.standard.secondBtnText(functionColor)}>
              {functionLabel}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {name ? (
        <Text
          style={{
            ...styles.standard.title,
            color: 'white',
          }}>
          {name}
        </Text>
      ) : null}
    </View>
  );
};

export default {transparent, colored};
