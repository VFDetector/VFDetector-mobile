import { Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeModules } from "react-native";
import Navigation from "src/navigation";
import theme from "src/themes";
import { LocalDBProvider } from "src/contexts/localDatabase";
import { ModelProvider } from "src/contexts/modelContext";
import { EditImageProvider } from "src/contexts/editImageContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "src/contexts/userContext";
import { SnackbarProvider } from "src/contexts/snackBar";

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <EditImageProvider>
            <UserProvider>
              <LocalDBProvider>
                <ModelProvider>
                  <SnackbarProvider>
                    <Navigation />
                  </SnackbarProvider>
                </ModelProvider>
              </LocalDBProvider>
            </UserProvider>
          </EditImageProvider>
        </QueryClientProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
