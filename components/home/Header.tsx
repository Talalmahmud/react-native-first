import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useClerk } from "@clerk/clerk-expo";
import { EvilIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Header() {
  const { user } = useClerk();
  return (
    <View
      style={{
        paddingTop: 50,
        backgroundColor: "green",

        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        padding: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
            }}
          />
        </View>
        <View style={{}}>
          <Text style={{ color: "white", fontSize: 12 }}>Welcome,</Text>
          <Text style={{ color: "white", fontSize: 20 }}>{user?.fullName}</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 10,
          marginTop: 15,
          height: 40,
          marginVertical: 10,
          paddingLeft: 10,
        }}
      >
        <EvilIcons name="search" size={24} color="black" />

        <TextInput
          caretHidden={false}
          placeholder="Search..."
          style={{
            fontSize: 20,
          }}
        />
      </View>
    </View>
  );
}
