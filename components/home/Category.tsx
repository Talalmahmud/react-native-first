import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";

export default function Category() {
  const [gategorylist, setCategoryList] = useState([]);
  const router = useRouter();
  const getCategory = async () => {
    const res = await axios.get("https://fakestoreapi.com/products/categories");
    const resResult = await res.data;
    setCategoryList(resResult);
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.header}> Categories</Text>
        <Text
          style={{
            fontWeight: "400",
            fontSize: 12,
            fontStyle: "italic",
            textDecorationLine: "underline",
          }}
        >
          view all
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
        }}
      >
        <FlatList
          data={gategorylist}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/category-details/${item}`)}
              style={{
                flex: 1,
                backgroundColor: "green",
                margin: 4,
                padding: 8,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "400",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingLeft: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "800",
    paddingVertical: 4,
  },
  imageContainer: {
    position: "relative",
    height: 200,
    width: 150,
    marginRight: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "fill",
    backgroundColor: "#e1e4e8", // Add a background color for visibility
  },
  activityIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
});
