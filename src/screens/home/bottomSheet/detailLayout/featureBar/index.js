import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Button from "./button";

export default ({ bottomSheetRef }) => {
  const styles = useStyle();
  const [hide, setHide] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {!hide && (
        <>
          <TouchableOpacity
            style={styles.scanContainer}
            onPress={() => {
              bottomSheetRef.current.snapToIndex(0);
              setHide(true);
            }}
          >
            <Button
              icon="line-scan"
              onPress={() => {
                bottomSheetRef.current.snapToIndex(0);
                setHide(true);
              }}
            />
            <Text style={styles.title}>Capture</Text>
          </TouchableOpacity>
          <Button
            icon="account"
            onPress={() => navigation.navigate("user-profile")}
          />
        </>
      )}
    </View>
  );
};
export const useStyle = () => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 12,
    },
    scanContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontWeight: "bold",
      marginLeft: 10,
    },
  });
};
