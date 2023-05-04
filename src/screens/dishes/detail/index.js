import React, { useEffect, useState } from "react";
import { Text, useTheme } from "react-native-paper";
import { SafeLayout } from "src/layouts";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import modelConfig from "src/utils/models/config";
import screen from "src/utils/screen";
import ExpandTag from "./expandTag";
import { Shadow } from "react-native-shadow-2";
import LocationButton from "./locationButton";

const Card = ({ children }) => {
  return (
    <Shadow
      startColor={`rgba(100, 100, 100, 0.1)`}
      containerStyle={{
        marginTop: 8,
      }}
    >
      <View
        style={{
          width: screen.width - 20,
          backgroundColor: "white",
          borderRadius: 4,
          padding: 8,
        }}
      >
        {children}
      </View>
    </Shadow>
  );
};

export default ({ route }) => {
  const { data } = route.params;
  const { colors } = useTheme();
  const styles = useStyle();
  const images = data?.type;
  const locations = data?.location;
  const [nutritionImageHeight, setNutritionImageHeight] = useState(0);
  useEffect(() => {
    Image.getSize(
      modelConfig.localDir.asset(data?.nutrition[0]?.name),
      (width, height) => {
        setNutritionImageHeight(((screen.width - 40) * height) / width);
      },
      (error) => {
        console.error(`Failed to get image size: ${error}`);
      }
    );
  }, []);
  return (
    <SafeLayout popback style={styles.container} popbackColor={colors.white}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Shadow
          startColor={`rgba(100, 100, 100, 0.2)`}
          containerStyle={{ marginVertical: 20 }}
        >
          <Image
            source={{ uri: modelConfig.localDir.asset(images[0]?.name) }}
            style={styles.avatar}
          />
        </Shadow>
        <Card>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{data?.name}</Text>
          <Text style={{ color: "gray" }}>Vietnamese traditional food</Text>
        </Card>
        <Card>
          <Text>{data?.description[0]?.text}</Text>
        </Card>
        <Card>
          <ExpandTag label="Nutrition fact">
            <Image
              source={{
                uri: modelConfig.localDir.asset(data?.nutrition[0]?.name),
              }}
              style={{ width: screen.width - 40, height: nutritionImageHeight }}
            />
          </ExpandTag>
        </Card>
        <Card>
          <ExpandTag label={`Location (${locations?.length || 0})`}>
            {locations?.length > 0 &&
              locations?.map((e, index) => (
                <LocationButton key={index} title={e?.name} url={e?.url} />
              ))}
          </ExpandTag>
        </Card>
        <Card>
          {images?.length > 0 &&
            images?.map((e, index) => {
              return (
                <View key={index}>
                  <Image
                    source={{ uri: modelConfig.localDir.asset(e?.name) }}
                    style={styles.image}
                  />
                  <Text style={styles.imageTitle}>{e?.title}</Text>
                </View>
              );
            })}
        </Card>
      </ScrollView>
    </SafeLayout>
  );
};

export const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
    },
    avatar: {
      width: screen.width / 3,
      height: screen.width / 3,
      borderRadius: screen.width / 3,
    },
    image: {
      width: screen.width - 40,
      height: screen.width - 40,
      alignSelf: "center",
      borderRadius: 4,
    },
    scrollview: {
      paddingBottom: 40,
      paddingHorizontal: 10,
      alignItems: "center",
    },
    countTitle: {
      fontWeight: "bold",
      color: colors.primary,
    },
    imageTitle: {
      textAlign: "center",
      marginVertical: 8,
      fontWeight: "bold",
      color: colors.primary,
    },
  });
};
