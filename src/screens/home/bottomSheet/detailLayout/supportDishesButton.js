import { Button, Text, useTheme } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useModelState } from "src/contexts/modelContext";
import screen from "src/utils/screen";

export default () => {
  const styles = useStyle();
  const navigation = useNavigation();
  const { metadata } = useModelState();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("dish-list")}
    >
      <Text style={styles.label}>Support Dishes</Text>
      <View style={styles.countLayout}>
        <Text style={styles.label}>{metadata?.labels?.length || 0}</Text>
        <Icon name="chevron-right" size={24} color="white" />
      </View>
    </TouchableOpacity>
  );
};

const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      backgroundColor: colors.primary,
      padding: 8,
      borderRadius: 4,
      width: screen.width - 24,
      alignSelf: "center",
    },
    label: {
      fontWeight: "bold",
      color: colors.white,
    },
    countLayout: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
};
