import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
type Props = {
  imgUrl?: string;
  title?: string;
  price?: number;
  rating?: number;
  pId?: number;
};
export default function ProductCard({
  pId,
  imgUrl,
  title,
  price,
  rating,
}: Props) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/product/${pId}`)}
      style={{
        padding: 10,
        borderColor: "gray",
        borderWidth: 1,

        margin: 4,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Image
        source={{ uri: imgUrl || "https://via.placeholder.com/150" }}
        style={{ height: 150, width: "100%", objectFit: "fill" }}
      />
      <Text
        style={{
          paddingVertical: 2,
        }}
      >
        {title?.slice(0, 20)}...
      </Text>
      <View
        style={{
          paddingVertical: 4,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text>
          <Text style={{ fontWeight: "600" }}>Price:</Text>
          {price}tk
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign name="star" size={10} color="orange" />
          <Text style={{ fontSize: 10 }}> {rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
