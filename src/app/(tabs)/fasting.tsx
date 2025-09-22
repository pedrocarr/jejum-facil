import { tips } from "@/consts";
import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import FastingPlanSelected from "@/components/FastingPlanSelected";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Dialog, Portal, Button } from "react-native-paper";
import TipsCard from "@/components/TipsCard";

export default function Fasting() {
  const [selectedPlan, setSelectedPlan] = useState({
    id: "flexivel",
    title: "Flexível",
    fastingDescription: "Jejue o tempo que que quiser"
  });
  const [isStarted, setIsStarted] = useState(false);
  const [fastingDuration, setFastingDuration] = useState(null);
  const [isFlexible, setIsFlexible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const router = useRouter();
  const params = useLocalSearchParams();

  const parsePlanDuration = (planTitle: string) => {
    if (planTitle === 'Flexível') {
      return { isFlexible: true, duration: null };
    } else if (planTitle.includes(':')) {
      const [fastingHours] = planTitle.split(':');
      return { isFlexible: false, duration: Number(fastingHours) * 3600 };
    } else if (planTitle.includes('h')) {
      const [fastingHours] = planTitle.split('h');
      return { isFlexible: false, duration: Number(fastingHours) * 3600 };
    } else {
      const hours = parseInt(planTitle);
      if (!isNaN(hours)) {
        return { isFlexible: false, duration: hours * 3600 };
      }
    }
    return { isFlexible: true, duration: null };
  };

  const FlexibleTimerComponent = () => {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
      if (!startTime) return;

      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }, [startTime]);

    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
      <View className="items-center p-8">
        <Text className="text-6xl font-bold text-[#663399] mb-2">
          {formatTime(elapsedTime)}
        </Text>
        <Text className="text-lg text-gray-600">Tempo de jejum</Text>
      </View>
    );
  };

  const FixedTimerComponent = () => (
    <CountdownCircleTimer
      isPlaying={isStarted}
      duration={fastingDuration}
      colors={['#00C9FF', '#92FE9D', '#FCEE09', '#FF0099']}
      colorsTime={[fastingDuration * 0.6, fastingDuration * 0.4, fastingDuration * 0.2, 0]}
      strokeWidth={16}
      size={250}
      onComplete={() => {
        console.log('Fasting completed!');
        return { shouldRepeat: false };
      }}
    >
      {({ remainingTime }) => {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;

        return (
          <View className="items-center">
            <Text className="text-4xl font-bold text-[#663399]">
              {String(hours).padStart(2, '0')}:
              {String(minutes).padStart(2, '0')}:
              {String(seconds).padStart(2, '0')}
            </Text>
            <Text className="text-sm text-gray-600">restante</Text>
          </View>
        );
      }}
    </CountdownCircleTimer>
  );

  const onPressOpenPlans = () => {
    router.push("/plans");
  };

  const onPressEndFasting = () => {
    setDialogVisible(true);
  };

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
    const { isFlexible: planIsFlexible, duration } = parsePlanDuration(selectedPlan.title);

    setIsStarted(true);
    setIsFlexible(planIsFlexible);

    if (planIsFlexible) {
      setStartTime(Date.now());
      setFastingDuration(null);
    } else {
      setFastingDuration(duration);
      setStartTime(null);
    }
  };

  const dismissEndFasting = () => {
    setDialogVisible(false);
  };

  const confirmEndFasting = () => {
    setDialogVisible(false);
    setIsStarted(false);
    setFastingDuration(null);
    setIsFlexible(false);
    setStartTime(null);
    router.push("/save-plan")
  };

  return (
    <>
      <ScrollView className="flex-1 bg-[#F0F8FF]">
        {!isStarted && (
          <>
            <View className="mb-4">
              <Text className="text-3xl text-center font-bold">Olá!</Text>
              <Text className="text-xl text-center m-2 p-2">
                Pronto para começar seu jejum 😀?
              </Text>
            </View>
            <FastingPlanSelected onPress={onPressOpenPlans} planTitle={selectedPlan.title} />
            <View className="mt-24 items-center">
              <TouchableOpacity onPress={handleStartFasting}>
                <View className="m-4 p-4 bg-[#663399] rounded-full">
                  <Text className="text-white font-bold text-xl">Iniciar Jejum</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
        {isStarted && (
          <View className="items-center mt-2">
            <FastingPlanSelected onPress={onPressOpenPlans} planTitle={selectedPlan.title} />
            {isFlexible ? <FlexibleTimerComponent /> : <FixedTimerComponent />}
            <TouchableOpacity onPress={onPressEndFasting}>
              <View className="m-4 p-4 bg-[#663399]  rounded-full">
                <Text className="text-white font-bold text-xl">Parar jejum</Text>
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
          <TipsCard
            key={tip.id}
            title={tip.title}
            content={tip.content}
            emoji={tip.emoji}
          />
        ))}
      </ScrollView>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={dismissEndFasting}>
          <Dialog.Content>
            <Text className="text-xl">
              Tem certeza que deseja terminar o jejum atual?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dismissEndFasting}>Não</Button>
            <Button style={{width: 80}} onPress={confirmEndFasting} mode="contained">
              Sim
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}