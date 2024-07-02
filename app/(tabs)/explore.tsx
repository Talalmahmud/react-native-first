import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/home/ProductCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
export default function ExploreScreen() {
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
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 40,
      }}
    >
      <FlatList
        data={productList}
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
  );
}
