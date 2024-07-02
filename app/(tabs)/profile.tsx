import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
} from "react-native";
import React from "react";
import { useAuth, useClerk } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useClerk();
  const { signOut } = useAuth();

  const logOut = () => {
    signOut();
  };

  const shareApp = () => {
    Share.share({
      message: "Download this app and enjoy",
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: user?.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user?.fullName}</Text>
        <Text style={styles.userEmail}>
          {user?.emailAddresses[0]?.emailAddress}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton} onPress={shareApp}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  userInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  userName: {
    fontSize: 30,
    fontWeight: "800",
  },
  userEmail: {
    fontSize: 20,
    fontStyle: "italic",
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  shareButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "orange",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
