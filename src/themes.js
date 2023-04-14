import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#007FE2",
    accent: "#f1c40f",
    error: "#E20000",
    white: "#FFF",
    lightBackground: "#EFEEF4",
    transparentWhite: (opacity) => `rgba(255, 255, 255, ${opacity})`,
    transparentBlack: (opacity) => `rgba(0, 0, 0, ${opacity})`,
    transparentPrimary: (opacity) => `rgba(0,127,226, ${opacity})`,
    light: "#FFF",
    dark: "#454852",
    gray: "#F8F8F8",
  },
};

export default theme;
