import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: string;
  };
}

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [product, setProduct] = useState({
    id: 0,
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    rating: {
      rate: "",
    },
  });

  const getProduct = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products/" + id);
      const resResult = res.data;
      setProduct(resResult);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: id,
    });
  }, [navigation, id]);
  return (
    <View>
      <View
        style={{
          padding: 10,
        }}
      >
        <Image
          source={{ uri: product?.image || "https://via.placeholder.com/150" }}
          style={{ height: 400, width: "100%", objectFit: "fill" }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          {product?.title}
        </Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <View>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Price: {product?.price}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
              }}
            >
              <AntDesign name="star" size={16} color="orange" />
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {product?.rating?.rate}
              </Text>
            </View>
          </View>
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Description:
          <Text
            style={{
              fontSize: 16,
              fontWeight: "300",
            }}
          >
            {product?.description}
          </Text>
        </Text>
      </View>
    </View>
  );
}
