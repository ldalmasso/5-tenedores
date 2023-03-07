import React, { useState } from "react";
import { View, Text } from "react-native";
import { Image } from "react-native-elements";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";
import { styles } from "./CarouselImagesStyle";

export function CarouselImages(props) {
  const { arrayImages, width, height, hideDot } = props;
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(arrayImages)}
        activeDotIndex={activeDotIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotContainer}
        dotStyle={styles.dot}
      ></Pagination>
    );
  };

  const renderItem = ({ item }) => {
    return <Image source={{ uri: item }} style={{ height, width }}></Image>;
  };

  return (
    <View style={styles.content}>
      <Carousel
        layaout="default"
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => {
          setActiveDotIndex(index);
        }}
      />
      {!hideDot && pagination()}
    </View>
  );
}
