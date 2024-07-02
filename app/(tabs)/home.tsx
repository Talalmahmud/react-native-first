import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/home/Header";
import Slider from "@/components/home/Slider";
import Category from "@/components/home/Category";
import axios from "axios";
import ProductCard from "@/components/home/ProductCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Define the Product type
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function HomeScreen() {
  const [productList, setProductList] = useState<Product[]>([]);

  const getProduct = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      const resResult: Product[] = res.data;
      setProductList(resResult);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Category */}
      <Category />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          paddingHorizontal: 20,
        }}
      >
        <MaterialCommunityIcons name="flower-poppy" size={24} color="red" />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            paddingVertical: 10,
          }}
        >
          Popular Products
        </Text>
      </View>
      <View style={styles.productList}>
        <FlatList
          data={productList?.slice(0, 10)}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              pId={item?.id}
              imgUrl={item.image}
              title={item.title}
              price={item?.price}
              rating={item?.rating?.rate}
            />
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  productList: {
    paddingHorizontal: 20,
  },
});
