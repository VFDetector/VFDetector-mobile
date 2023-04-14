import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import Navigation from "src/navigation";
import theme from "src/themes";
const queryClient = new QueryClient();
import { LocalDBProvider } from "src/contexts/localDatabase";

export default App = () => {
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <LocalDBProvider>
          <Navigation />
        </LocalDBProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
