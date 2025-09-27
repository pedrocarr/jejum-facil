import { tips } from "@/types/constants";
import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import FastingPlanSelected from "@/components/FastingPlanSelected";
import EnhancedCountdownTimer from "@/components/EnhancedCountdownTimer";
import FlexibleTimer from "@/components/FlexibleTimer";
import TimerControls from "@/components/TimerControls";
import TipsCard from "@/components/TipsCard";
import { Dialog, Portal, Button } from "react-native-paper";
import { useFastingTimer } from "@/hooks/useFastingTimer";
import { FastingSession } from "@/types/fasting";
import { formatDuration } from "@/utils/fasting";

export default function Fasting() {
  const [selectedPlan, setSelectedPlan] = useState({
    id: "flexivel",
    title: "Flexível",
    fastingDescription: "Jejue o tempo que que quiser"
  });
  const [dialogVisible, setDialogVisible] = useState(false);

  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    timerState,
    currentSession,
    isRestored,
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
  } = useFastingTimer({
    planId: selectedPlan.id,
    planTitle: selectedPlan.title,
    onComplete: handleSessionComplete,
    onMilestone: handleMilestone,
  });

  function handleSessionComplete(session: FastingSession) {
    router.push({
      pathname: "/save-plan",
      params: {
        sessionData: JSON.stringify(session)
      }
    });
  }

  function handleMilestone(milestone: number, duration: number) {
    // Show milestone celebration
    const message = timerState.isFlexible
      ? `🎉 ${formatDuration(duration)} de jejum!`
      : `🎯 ${Math.round(milestone * 100)}% concluído!`;

    // Could implement toast or notification here
    console.log('Milestone reached:', message);
  }

  const onPressOpenPlans = () => {
    router.push("/plans");
  };

  const onPressEndFasting = () => {
    setDialogVisible(true);
  };

  const dismissEndFasting = () => {
    setDialogVisible(false);
  };

  const confirmEndFasting = async () => {
    setDialogVisible(false);
    try {
      await stopTimer();
    } catch (error) {
      console.error('Error stopping timer:', error);
      Alert.alert('Erro', 'Erro ao parar o jejum');
    }
  };

  useEffect(() => {
    if (params.selectedPlan) {
      try {
        const planData = JSON.parse(params.selectedPlan as string);
        setSelectedPlan(planData);
        router.setParams({ selectedPlan: undefined });
      } catch (error) {
        console.error('Error parsing selected plan:', error);
        Alert.alert('Erro', 'Erro ao carregar plano selecionado');
      }
    }
  }, [params.selectedPlan, router]);

  const renderTimer = () => {
    if (timerState.isFlexible && timerState.startTime) {
      return (
        <FlexibleTimer
          startTime={timerState.startTime}
          onMilestone={handleMilestone}
          showMilestones={true}
        />
      );
    }

    if (timerState.duration) {
      return (
        <EnhancedCountdownTimer
          duration={timerState.duration}
          isPlaying={timerState.isStarted && !timerState.isPaused}
          onComplete={() => currentSession && handleSessionComplete(currentSession)}
          onMilestone={handleMilestone}
          showMilestones={true}
        />
      );
    }

    return null;
  };

  return (
    <>
      <ScrollView className="flex-1 bg-[#F0F8FF]">
        {!timerState.isStarted && (
          <>
            <View className="mb-4">
              <Text className="text-3xl text-center font-bold">Olá!</Text>
              <Text className="text-xl text-center m-2 p-2">
                Pronto para começar seu jejum 😀?
              </Text>
            </View>
            <FastingPlanSelected
              onPress={onPressOpenPlans}
              planTitle={selectedPlan.title}
            />
          </>
        )}

        {timerState.isStarted && (
          <View className="items-center mt-2">
            <FastingPlanSelected
              onPress={onPressOpenPlans}
              planTitle={selectedPlan.title}
            />
            {renderTimer()}
          </View>
        )}

        <View className="items-center">
          <TimerControls
            isStarted={timerState.isStarted}
            isPaused={timerState.isPaused}
            onStart={async () => {
              try {
                await startTimer();
              } catch (error) {
                console.error('Error starting timer:', error);
                Alert.alert('Erro', 'Erro ao iniciar o jejum');
              }
            }}
            onStop={onPressEndFasting}
            onPause={pauseTimer}
            onResume={resumeTimer}
            showPauseResume={!timerState.isFlexible}
            startLabel="Iniciar Jejum"
            stopLabel="Parar jejum"
            pauseLabel="Pausar"
            resumeLabel="Continuar"
            disabled={!isRestored}
          />
        </View>

        <View className="mt-8">
          <Text className="text-2xl text-center mb-2 mt-12 p-2">
            💡 Dicas
          </Text>
          <Text className="text-lg text-center m-1 p-2">
            Aqui vão algumas dicas para você começar seu jejum com o pé direito!
          </Text>
          {tips.map((tip) => (
            <TipsCard
              key={tip.id}
              title={tip.title}
              content={tip.content}
              emoji={tip.emoji}
            />
          ))}
        </View>
      </ScrollView>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={dismissEndFasting}>
          <Dialog.Content>
            <Text className="text-xl">
              Tem certeza que deseja terminar o jejum atual?
            </Text>
            {currentSession && (
              <Text className="text-base text-gray-600 mt-2">
                Duração atual: {formatDuration(timerState.elapsedTime)}
              </Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dismissEndFasting}>Não</Button>
            <Button
              style={{ width: 80 }}
              onPress={confirmEndFasting}
              mode="contained"
            >
              Sim
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}