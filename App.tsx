import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import GameBoard from "@/components/GameBoard";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <GameBoard />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
