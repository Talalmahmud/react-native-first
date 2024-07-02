import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import ProductCard from "@/components/home/ProductCard";
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
export default function CategoryDetailScreen() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const [productList, setProductList] = useState<Product[]>([]);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.com/products/category/" + category
      );
      const resResult: Product[] = res.data;
      setProductList(resResult);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [category]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category?.toString().toUpperCase(),
    });
  }, [navigation]);
  return (
    <>
      <View
        style={{
          paddingHorizontal: 10,
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
    </>
  );
}
