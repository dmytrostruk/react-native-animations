import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React from "react";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

// Insert some images
const images = [""];

const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
}));

export default function ParallaxCarousel() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  return (
    <View>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });

          return (
            <View style={styles.imageContainer}>
              <View style={styles.imageBorder}>
                <View style={styles.imageWrapper}>
                  <Animated.Image
                    style={{
                      width: ITEM_WIDTH * 1.4,
                      height: ITEM_HEIGHT,
                      resizeMode: "cover",
                      transform: [{translateX}]
                    }}
                    source={{ uri: item.photo }}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBorder: {
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 30,
    padding: 12,
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  imageWrapper: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: "hidden",
    alignItems: "center",
    borderRadius: 14,
  }
});
