import { View, Text, Image } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();
const LoginScreen = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/home", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View
      style={{
        marginTop: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/react-logo.png")}
        style={{
          height: 250,
          width: 250,
        }}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Text>Ultimate community</Text>
        <Text
          style={{
            backgroundColor: "green",
            width: 250,
            color: "white",
            fontSize: 20,
            height: 30,
            borderRadius: 15, // Adjusted for a more rounded effect
            textAlign: "center",
            lineHeight: 30, // Same as the height to center the text vertically
          }}
          onPress={onPress}
        >
          Let's Start
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
