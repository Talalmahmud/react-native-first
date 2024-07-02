import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "@/config/FireBaseConfig";
import axios from "axios";

const Slider = () => {
  const [listData, setListData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>(
    {}
  );

  const fetchData = async () => {
    try {
      // const q = query(collection(db, "my"));
      // const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      // const documents = querySnapshot.docs.map((doc) => ({
      //   ...doc.data(),
      //   id: doc.id,
      // }));
      const res = await axios.get("https://fakestoreapi.com/products");
      const documents = await res.data;
      // console.log("Fetched data:", documents); // Log the fetched data
      setListData(documents);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageLoadStart = (id: string) => {
    setImageLoading((prevState) => ({ ...prevState, [id]: true }));
  };

  const handleImageLoadEnd = (id: string) => {
    setImageLoading((prevState) => ({ ...prevState, [id]: false }));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>#Special for you</Text>
      <FlatList
        data={listData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // console.log("Rendering item:", item); // Log each item being rendered
          const imageUrl = item?.image || "https://via.placeholder.com/150"; // Placeholder image URL
          return (
            <View style={styles.imageContainer}>
              {imageLoading[item.id] && (
                <ActivityIndicator
                  style={styles.activityIndicator}
                  size="small"
                  color="#0000ff"
                />
              )}
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                onLoadStart={() => handleImageLoadStart(item.id)}
                onLoadEnd={() => handleImageLoadEnd(item.id)}
                onError={() => handleImageLoadEnd(item.id)} // Hide loader if image fails to load
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    //
  },
  header: {
    fontSize: 18,
    fontWeight: "800",
    paddingVertical: 4,
    paddingLeft: 20,
  },
  imageContainer: {
    position: "relative",
    height: 200,
    width: 150,

    marginLeft: 20,
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "fill",
    backgroundColor: "#e1e4e8", // Add a background color for visibility

    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,

    elevation: 5,
  },
  activityIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
});

export default Slider;
