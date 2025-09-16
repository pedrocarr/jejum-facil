import Tips from "@/components/Tips";
import { tips } from "@/consts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams, UnknownOutputParams } from "expo-router";


export default function Fasting() {
  const [selectedPlan, setSelectedPlan] = useState({
    id: "flexivel",
    title: "Flexível",
    fastingDescription: "Jejue o tempo que que quiser"
  });
  const [isStarted, setIsStarted] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const [flexibleTime, setFlexibleTime] = useState(null)
  const [customTime, setCustomTime] = useState(null)
  const [freePlanTime, setFreePlanTime] = useState(null)


  const onPressOpenPlans = () => {
    router.push("/plans");
  }

  const onPressEndFasting = () => {
    setIsStarted(!isStarted);
  }

  useEffect(() => {
    if (params.selectedPlan) {
      try {
        const planData = JSON.parse(params.selectedPlan as string);
        setSelectedPlan(planData);
        router.setParams({ selectedPlan: undefined });
      } catch (error) {
        console.error('Error parsing selected plan:', error);
      }
    }
  }, [params.selectedPlan]);


  const handleStartFasting = () => {
    if (selectedPlan.title === 'Flexível') {
      // setFlexibleTime()
    } else if (selectedPlan.title.includes(':')) {
      const [fastingHours, feedingHours] = selectedPlan.title.split(':')
      const fastingHoursSeconds = Number(fastingHours) * 3600
      setCustomTime(fastingHoursSeconds)
    } else {
      const [fastingHours, _] = selectedPlan.title.split('h')
      console.log("🚀 ~ handleStartFasting ~ _:", _)
      console.log("🚀 ~ handleStartFasting ~ fastingHours:", fastingHours)
    }
  }


  return (
    <ScrollView className="flex-1 bg-[#F0F8FF]">
      {!isStarted && (
        <>
          <View className="mb-4">
            <Text className="text-3xl text-center font-bold">Olá!</Text>
            <Text className="text-xl text-center m-2 p-2">
              Pronto para começar seu jejum 😀?
            </Text>
          </View>
          <View className="items-center mt-4 mb-4">
            <View>
              <Text className="text-lg text-center mb-2">Plano Selecionado:</Text>
            </View>
            <TouchableOpacity onPress={onPressOpenPlans} >
              <View className="flex-row items-center gap-2 bg-blue-200 rounded-full p-2 px-4">
                <Text className="text-xl">{selectedPlan.title}</Text>
                <MaterialCommunityIcons name="circle-edit-outline" color="#000000" size={24} />
              </View>
            </TouchableOpacity>
          </View>
          <View className="mt-24 items-center">
            <TouchableOpacity onPress={handleStartFasting}>
              <View className="m-4 p-4 bg-[#663399] rounded-full">
                <Text className="text-white font-bold text-xl">Iniciar Jejum</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
      {isStarted && customTime !== null && (
        <View className="items-center mt-10">
          <TouchableOpacity onPress={onPressEndFasting}>
            <View className="m-4 p-4 bg-[#663399] rounded-full text-center">
              <Text className="text-white font-bold text-xl">Jejum em andamento</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View className="fixed">
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

