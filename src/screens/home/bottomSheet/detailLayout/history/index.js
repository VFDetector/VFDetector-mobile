import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useQuery } from "react-query";
import { useLocalDatabase } from "src/contexts/localDatabase";
import screen from "src/utils/screen";
import HistoryTag from "./components/historyTag";
import EmptyState from "./components/empty";
import { useModelState } from "src/contexts/modelContext";

const LIMIT = parseInt(screen.height / 80);

export default HistoryLayout = () => {
  const styles = useStyle();
  const { database } = useLocalDatabase();
  const { metadata } = useModelState();
  const [history, setHistory] = useState([]);
  const [offset, setOffset] = useState(0);
  const dishes = metadata?.labels;

  const {} = useQuery("get-history-detect", async () => {
    try {
      database.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM detectHistory ORDER BY detect_time DESC LIMIT ? OFFSET ?`,
          [LIMIT, offset],
          (txObj, resultSet) => {
            const rows = resultSet?.rows?._array;
            setHistory(rows);
          },
          (txObj, error) => {
            console.log(error);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {history?.length == 0 ? (
          <EmptyState />
        ) : (
          history?.map((e, index) => (
            <HistoryTag dishes={dishes} key={index} data={e} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      paddingBottom: 40,
      paddingTop: 8,
      alignItems: "center",
    },
  });
};
