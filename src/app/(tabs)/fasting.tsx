import Tips from "@/components/Tips";
import { tips } from "@/consts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'



export default function Fasting() {
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [selectedPlan, setSelectedPlan] = useState({
    id: "flexivel",
    title: "Flexível",
    fastingDescription: "Jejue o tempo que que quiser"
  });
  const [isStarted, setIsStarted] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const [timer, setTimer] = useState("00:00:00");

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const secondsRef = useRef(0);


  const handleTimerPress = () => {
    if (selectedPlan.id === "flexivel") {
      setIsStarted((prev) => {
        const next = !prev;
        if (next) {
          secondsRef.current = 0;
          timerRef.current = setInterval(() => {
            secondsRef.current += 1;
            const hours = Math.floor(secondsRef.current / 3600);
            const minutes = Math.floor((secondsRef.current % 3600) / 60);
            const seconds = secondsRef.current % 60;
            setTimer(
              `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
          }, 1000);
        } else {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
        return next;
      });
    } else {
      // Lógica para planos com tempo definido
      console.log(`Iniciar/Parar timer para o plano ${selectedPlan.title}`);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);


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
            {/* <CountdownCircleTimer
              isPlaying={isPlaying}
              duration={1200}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[10, 6, 3, 0]}
              onComplete={() => ({ shouldRepeat: true, delay: 2 })}
              updateInterval={1}
            >
              {({ remainingTime, color }) => (
                <Text style={{ color, fontSize: 40 }}>
                  {remainingTime}
                </Text>
              )}
            </CountdownCircleTimer>
            <Button title="Toggle Playing" onPress={() => setIsPlaying(prev => !prev)} /> */}
            <TouchableOpacity onPress={handleTimerPress}>
              <View className="m-4 p-4 bg-[#663399] rounded-full">
                <Text className="text-white font-bold text-xl">Iniciar Jejum</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
      {isStarted && (
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

