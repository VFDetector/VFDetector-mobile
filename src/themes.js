import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#02B166",
    accent: "#f1c40f",
    error: "#E20000",
    white: "#FFF",
    lightBackground: "#EFEEF4",
    transparentWhite: (opacity) => `rgba(255, 255, 255, ${opacity})`,
    transparentBlack: (opacity) => `rgba(0, 0, 0, ${opacity})`,
    transparentPrimary: (opacity) => `rgba(2,177,102, ${opacity})`,
    transparentError: (opacity) => `rgba(255,0,0, ${opacity})`,
    light: "#FFF",
    dark: "#454852",
    gray: "#444545",
    black: "#181A18",
  },
};

export default theme;
