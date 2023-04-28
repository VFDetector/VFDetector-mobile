import { Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeModules } from "react-native";
import Navigation from "src/navigation";
import theme from "src/themes";

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const queryClient = new QueryClient();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </PaperProvider>
  );
}
