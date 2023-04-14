import { useNavigation } from "@react-navigation/native";
import screen from "src/utils/screen";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default (props) => {
  const { tabIndex, setTabIndex } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Shadow startColor={"rgba(180, 180, 180, 0.1)"} containerViewStyle={{}}>
      <View
        style={{
          backgroundColor: colors.white,
          height: 48 + insets.bottom,
          width: screen.width,
          paddingBottom: insets.bottom / 2,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <IconButton
          icon={() => (
            <Icon
              name="home-variant"
              size={40}
              color={
                tabIndex == 0 ? colors.transparentPrimary(0.8) : colors.disabled
              }
            />
          )}
          size={40}
          color={colors.primary}
          style={{
            backgroundColor: colors.transparentWhite(0.2),
            margin: 0,
          }}
          onPress={() => setTabIndex(0)}
        />
        <IconButton
          icon={() => (
            <Icon name="cube-scan" size={40} color={colors.primary} />
          )}
          size={40}
          color={colors.primary}
          style={{
            backgroundColor: colors.transparentWhite(0.2),
            margin: 0,
          }}
          onPress={() => navigation.navigate("detection-scan")}
        />
        <IconButton
          icon={() => (
            <Icon
              name="account"
              size={40}
              color={
                tabIndex == 1 ? colors.transparentPrimary(0.8) : colors.disabled
              }
            />
          )}
          size={40}
          color={colors.primary}
          style={{
            backgroundColor: colors.transparentWhite(0.2),
            margin: 0,
          }}
          onPress={() => setTabIndex(1)}
        />
      </View>
    </Shadow>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
