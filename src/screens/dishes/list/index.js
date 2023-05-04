import React from "react";
import { ScrollView, StyleSheet, View, VirtualizedList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useModelState } from "src/contexts/modelContext";
import { SafeLayout } from "src/layouts";
import DishTag from "./components/dishTag";

export default ({ navigation }) => {
  const styles = useStyle();
  const { metadata } = useModelState();
  const dishes = metadata?.labels?.filter((e) => !!e?.description);
  return (
    <SafeLayout popback>
      <View style={styles.container}>
        <VirtualizedList
          contentContainerStyle={styles.scrollview}
          data={dishes}
          renderItem={({ item, index }) => {
            return (
              <>
                {index == 0 && (
                  <Text style={styles.title}>Supported Dishes</Text>
                )}
                <DishTag data={item} />
              </>
            );
          }}
          getItemCount={() => dishes.length}
          getItem={(data, index) => dishes[index]}
          keyExtractor={(item, index) => index}
        />
      </View>
    </SafeLayout>
  );
};

export const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollviewContainer: {
      paddingTop: 20,
    },
    title: {
      fontWeight: "bold",
      fontSize: 18,
      marginLeft: 12,
    },
    scrollview: {
      paddingBottom: 80,
    },
  });
};
