import Tips from "@/components/Tips";
import { tips } from "@/consts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";




export default function Fasting() {
  const [plan, setPlan] = useState("Flexível");
  const [isStarted, setIsStarted] = useState(false);
  const router = useRouter();


  const onPressPlan = () => {
  router.push("/plans");
}


const onPressStart = () => {
  setIsStarted(!isStarted);
}

const onPressEnd = () => {
  setIsStarted(!isStarted);
}


  return (
    <ScrollView className="flex-1 bg-[#F0F8FF]">
      {!isStarted && (
        <>
          <View className="mb-4">
            <Text className="text-3xl text-center font-bold">Olá!</Text>
            <Text className="text-xl text-center m-2 p-2">
              Vamos começar seu jejum de hoje 😀?
            </Text>
          </View>
          <View className="items-center mt-4 mb-4">
            <TouchableOpacity onPress={onPressPlan} >
              <View className="flex-row items-center gap-2 bg-blue-200 rounded-full p-2 px-4">
                <Text className="text-xl">{plan}</Text>
                <MaterialCommunityIcons name="circle-edit-outline" color="#000000" size={24} />
              </View>
            </TouchableOpacity>
          </View>
          <View className="items-center mt-10">
            <TouchableOpacity onPress={onPressStart}>
              <View className="m-4 p-4 bg-[#6200ee] rounded-full text-center">
                <Text className="text-white font-bold text-xl">Iniciar Jejum</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
      {isStarted && (
        <View className="items-center mt-10">
          <TouchableOpacity onPress={onPressEnd}>
            <View className="m-4 p-4 bg-[#6200ee] rounded-full text-center">
              <Text className="text-white font-bold text-xl">Jejum em andamento</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
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
        <Tips
          key={tip.id}
          title={tip.title}
          content={tip.content}
          emoji={tip.emoji}
        />
      ))}
    </ScrollView>
  );
}

