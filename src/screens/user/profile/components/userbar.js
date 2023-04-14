import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, IconButton, Text, useTheme} from 'react-native-paper';

const Userbar = ({}) => {
  const styles = useStyle();
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.avatarContainer}></View>
      <View style={styles.usernameContainer}>
        <Text>Admin</Text>
      </View>
      <Button labelStyle={styles.editButton}>Edit</Button>
    </TouchableOpacity>
  );
};
export default Userbar;

const useStyle = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    avatarContainer: {
      width: 60,
      height: 60,
      borderRadius: 60,
      backgroundColor: colors.transparentBlack(0.2),
      marginLeft: 14,
    },
    usernameContainer: {
      flex: 1,
      paddingLeft: 10,
    },
    editButton: {
      fontWeight: 'bold',
    },
  });
};
