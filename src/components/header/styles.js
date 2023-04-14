import {StyleSheet} from 'react-native';

export default {
  general: StyleSheet.create({
    container: {
      height: 60,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
    },
    containerTransparent: transparent => ({
      height: 60,
      borderBottomWidth: transparent ? null : 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
    }),
    transparentContainer: {
      height: 60,
      justifyContent: 'center',
    },
    coloredContainer: color => ({
      height: 60,
      justifyContent: 'center',
      backgroundColor: color,
    }),

    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: 'rgba(180, 180, 180, 0.2)',
    },
  }),
  standard: StyleSheet.create({
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    secondButton: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 60,
    },
    secondBtnText: visible => ({
      fontWeight: 'bold',
      color: visible ? visible : '#007FE2',
    }),
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      position: 'absolute',
      alignSelf: 'center',
    },
  }),
  url: StyleSheet.create({
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    addressText: {
      fontWeight: 'bold',
      fontSize: 14,
      marginLeft: 4,
      backgroundColor: 'rgba(100, 100, 100, 0.2)',
      flex: 1,
      paddingVertical: 4,
      paddingHorizontal: 4,
      borderRadius: 4,
    },
  }),
  left: StyleSheet.create({
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      marginLeft: 10,
    },
  }),
};
