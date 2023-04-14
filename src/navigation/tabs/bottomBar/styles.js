import {StyleSheet} from 'react-native';
import screen from 'helper/screen';
import {useTheme} from 'react-native-paper';

export const useStyle = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
  });
};
