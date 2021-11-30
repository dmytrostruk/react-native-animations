import { StyleSheet, View } from "react-native";

import ParallaxCarousel from "./components/ParallaxCarousel";
import React from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <ParallaxCarousel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
