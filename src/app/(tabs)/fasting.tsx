import Tips from "@/components/Tips";
import { tips } from "@/consts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";


const onPressInfo = () => {
  navigate("/info");
}

export default function Fasting() {
  return (
    <ScrollView className="flex-1 bg-[#F0F8FF]">
      <View className="mt-10 mb-4">
        <Text className="text-3xl text-center font-bold">Olá!</Text>
        <Text className="text-lg text-center m-2 p-2">
          Vamos começar seu jejum de hoje 😀?
        </Text>
      </View>
      <View className="items-center m-4">
        <TouchableOpacity onPress={onPressInfo}>
          <MaterialCommunityIcons name="information-outline" color="#c0c0c0" size={40} />
        </TouchableOpacity>
      </View>
      <View className="items-center">
        <TouchableOpacity onPress={() => console.log("I am pressed")}>
          <View className="m-4 p-4 bg-[#6200ee] rounded-3xl items-center">
            <Text className="text-white font-bold text-xl">Iniciar Jejum</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text className="text-2xl text-center mb-2 mt-24 p-2">
          💡 Dicas
        </Text>
      </View>
      <View>
        <Text className="text-lg text-center m-1 p-2">
          Aqui vão algumas dicas para você começar seu jejum com o pé direito!
        </Text>
      </View>
      {tips.map((tip) => (
        Tips({ title: tip.title, content: tip.content, emoji: tip.emoji, index: tip.index })
      ))}
    </ScrollView>
  );
}

