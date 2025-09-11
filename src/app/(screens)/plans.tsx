import PlansCards from "@/components/PlansCards";
import { advancedPlans, beginnerPlans, intermediatePlans, pronlongedFastingPlans } from "@/consts";
import { useState } from "react";
import { ScrollView, View, SafeAreaView } from "react-native";
import { SegmentedButtons, Dialog, Portal, Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";



export default function Plans() {
  const [segmentendButtonsvalue, setsegmentendButtonsValue] = useState('planos');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [pendingPlan, setPendingPlan] = useState(null);
  const router = useRouter();

  const handlePlanPress = (plan) => {
    setPendingPlan(plan);
    setDialogVisible(true);
  };

  const confirmPlanSelection = () => {
    if (pendingPlan) {
      router.back();
      setTimeout(() => {
        router.setParams({
          selectedPlan: JSON.stringify(pendingPlan)
        });
      }, 100);
    }
    setDialogVisible(false);
    setPendingPlan(null);
  };

  const cancelPlanSelection = () => {
    setDialogVisible(false);
    setPendingPlan(null);
  };

  return (
    <>
      <ScrollView className="flex-1 bg-[#F0F8FF] mb-8">
        <SafeAreaView className="flex-1 p-4 items-center">
          <SegmentedButtons
            value={segmentendButtonsvalue}
            onValueChange={setsegmentendButtonsValue}
            theme={{ colors: { primary: '#6200ee' } }}
            buttons={[
              {
                value: 'planos',
                label: 'Planos',
                icon: 'view-list',
                checkedColor: '#6200ee',
                onPress: () => setsegmentendButtonsValue('planos'),
              },
              {
                value: 'personalizado',
                label: 'Personalizado',
                icon: 'account-cog',
                checkedColor: '#6200ee',
                onPress: () => setsegmentendButtonsValue('personalizado'),
              },
            ]}
          />
        </SafeAreaView>
        {segmentendButtonsvalue === 'planos' && (
          <View className="p-2">
            <Text className="text-lg mb-4 ml-2">Flexível</Text>
            <View className="mb-4">
              <PlansCards
                id="flexivel"
                title="Flexível"
                fastingDescription="Jejue o tempo que que quiser"
                onPress={() => handlePlanPress({
                  id: "flexivel",
                  title: "Flexível",
                  fastingDescription: "Jejue o tempo que que quiser"
                })}
              />
            </View>
            <Text className="text-lg mb-4 ml-2">Planos para iniciantes</Text>
            <View className="flex flex-row flex-wrap justify-between">
              {beginnerPlans.map((plan) => (
                <View key={plan.id} className="w-[50%] mb-4">
                  <PlansCards
                    id={plan.id}
                    title={plan.title}
                    fastingDescription={plan.fastingDescription}
                    feedingDescription={plan.feedingDescription}
                    onPress={() => handlePlanPress(plan)}
                  />
                </View>
              ))}
            </View>
            <Text className="text-lg mb-4 ml-2">Planos intermediários</Text>
            <View className="flex flex-row flex-wrap justify-between">
              {intermediatePlans.map((plan) => (
                <View key={plan.id} className="w-[50%] mb-4">
                  <PlansCards
                    id={plan.id}
                    title={plan.title}
                    fastingDescription={plan.fastingDescription}
                    feedingDescription={plan.feedingDescription}
                    onPress={() => handlePlanPress(plan)}
                  />
                </View>
              ))}
            </View>
            <Text className="text-lg mb-4 ml-2">Planos avançados</Text>
            <View className="flex flex-row flex-wrap justify-between">
              {advancedPlans.map((plan) => (
                <View key={plan.id} className="w-[50%] mb-4">
                  <PlansCards
                    id={plan.id}
                    title={plan.title}
                    fastingDescription={plan.fastingDescription}
                    feedingDescription={plan.feedingDescription}
                    onPress={() => handlePlanPress(plan)}
                  />
                </View>
              ))}
            </View>
            <Text className="text-lg mb-4 ml-2">Jejum pronlogado</Text>
            <View className="flex flex-row flex-wrap justify-between">
              {pronlongedFastingPlans.map((plan) => (
                <View key={plan.id} className="w-[50%] mb-4">
                  <PlansCards
                    id={plan.id}
                    title={plan.title}
                    fastingDescription={plan.fastingDescription}
                    onPress={() => handlePlanPress(plan)}
                  />
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={cancelPlanSelection}>
          <Dialog.Title>Confirmar Seleção de Plano</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Tem certeza de que deseja selecionar o plano "<Text style={{ fontWeight: "bold"}}>{pendingPlan?.title}</Text>"?
            </Text>
            {pendingPlan?.fastingDescription && (
              <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                {pendingPlan.fastingDescription}
              </Text>
            )}
            {pendingPlan?.feedingDescription && (
              <Text variant="bodyMedium" style={{ marginTop: 4 }}>
                {pendingPlan.feedingDescription}
              </Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={cancelPlanSelection}>Cancelar</Button>
            <Button onPress={confirmPlanSelection} mode="contained">
              Confirmar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}