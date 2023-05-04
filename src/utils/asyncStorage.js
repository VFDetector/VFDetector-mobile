import AsyncStorage from "@react-native-async-storage/async-storage";

export const get_storage_data = async (keyValue) => {
  try {
    const value = await AsyncStorage.getItem(keyValue);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.log(e);
  }
};

export const set_storage_data = async (keyValue, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(keyValue, jsonValue);
  } catch (e) {
    console.log(e);
  }
};
export const clear_storage_data = async () => {
  try {
    AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};
