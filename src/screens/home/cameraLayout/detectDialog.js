import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useModelState } from "src/contexts/modelContext";
import screen from "src/utils/screen";
import modelConfig from "src/utils/models/config";
import { useNavigation } from "@react-navigation/native";

const LoadingState = () => {
  const styles = useStyle();
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator style={styles.indicator} />
      <View
        style={{ flex: 1, paddingHorizontal: 10, justifyContent: "center" }}
      >
        <Text style={{ fontWeight: "bold" }}>Detecting...</Text>
      </View>
    </View>
  );
};

export default ({ isLoading, predictValue }) => {
  const styles = useStyle();
  const { metadata } = useModelState();
  const dishes = metadata?.labels;
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <Shadow
      startColor={`rgba(180, 180, 180, 0.2)`}
      containerStyle={styles.container}
    >
      <View style={styles.buttonContainer}>
        {isLoading && <LoadingState />}
        {predictValue?.prediction && (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              paddingHorizontal: 8,
            }}
            onPress={() => {
              navigation.navigate("dish-detail", {
                data: dishes[predictValue?.prediction],
              });
            }}
          >
            <Image
              style={{
                width: (screen.width - 20) / 4 - 6,
                height: (screen.width - 20) / 4 - 6,
                borderRadius: 8,
                alignSelf: "center",
                borderWidth: 2,
                borderColor: colors.primary,
              }}
              source={{
                uri: modelConfig.localDir.asset(
                  dishes[predictValue?.prediction]?.type[0]?.name
                ),
              }}
            />
            <View style={{ flex: 1, padding: 8 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {dishes[predictValue?.prediction]?.name}
              </Text>
              <Text style={{ color: "gray" }}>Vietnamese traditional dish</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </Shadow>
  );
};

const useStyle = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      position: "absolute",
      zIndex: 2,
      bottom: insets.bottom + 20,
      alignSelf: "center",
    },
    buttonContainer: {
      width: screen.width - 20,
      height: (screen.width - 20) / 4 + 8,
      backgroundColor: colors.white,
      borderRadius: 8,
    },
    loadingContainer: {
      flex: 1,
      flexDirection: "row",
    },
    indicator: {
      width: (screen.width - 20) / 4,
      height: (screen.width - 20) / 4,
    },
  });
};
