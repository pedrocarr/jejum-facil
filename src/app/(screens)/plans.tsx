import PlansCards from "@/components/PlansCards";
import { advancedPlans, beginnerPlans, intermediatePlans, pronlongedFastingPlans } from "@/consts";
import { useState } from "react";
import { ScrollView, View, SafeAreaView, Text } from "react-native";
import { Divider, SegmentedButtons } from "react-native-paper";

export default function Plans() {
  const [segmentendButtonsvalue, setsegmentendButtonsValue] = useState('planos');
  return (
  <ScrollView className="flex-1 bg-[#F0F8FF] mb-8">
    <Divider />
    <View className="p-4 items-center">
      <Text className="text-2xl font-bold">
        Alterar Plano
      </Text>
    </View>
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
        <Text className="text-lg font-bold mb-4 ml-2">Flexível</Text>
        <View className="mb-4">
          <PlansCards
            id="flexivel"
            title="Flexível"
            fastingDescription="Jejue o tempo que que quiser"
          />
        </View>
        <Text className="text-lg font-bold mb-4 ml-2">Planos para iniciantes</Text>
        <View className="flex flex-row flex-wrap justify-between">
          {beginnerPlans.map((plan) => (
            <View key={plan.id} className="w-[50%] mb-4">
              <PlansCards
                id={plan.id}
                title={plan.title}
                fastingDescription={plan.fastingDescription}
                feedingDescription={plan.feedingDescription}
              />
            </View>
          ))}
        </View>
        <Text className="text-lg font-bold mb-4 ml-2">Planos intermediários</Text>
        <View className="flex flex-row flex-wrap justify-between">
          {intermediatePlans.map((plan) => (
            <View key={plan.id} className="w-[50%] mb-4">
              <PlansCards
                id={plan.id}
                title={plan.title}
                fastingDescription={plan.fastingDescription}
                feedingDescription={plan.feedingDescription}
              />
            </View>
          ))}
        </View>
        <Text className="text-lg font-bold mb-4 ml-2">Planos avançados</Text>
        <View className="flex flex-row flex-wrap justify-between">
          {advancedPlans.map((plan) => (
            <View key={plan.id} className="w-[50%] mb-4">
              <PlansCards
                id={plan.id}
                title={plan.title}
                fastingDescription={plan.fastingDescription}
                feedingDescription={plan.feedingDescription}
              />
            </View>
          ))}
        </View>
        <Text className="text-lg font-bold mb-4 ml-2">Jejum pronlogado</Text>
        <View className="flex flex-row flex-wrap justify-between">
          {pronlongedFastingPlans.map((plan) => (
            <View key={plan.id} className="w-[50%] mb-4">
              <PlansCards
                id={plan.id}
                title={plan.title}
                fastingDescription={plan.fastingDescription}
              />
            </View>
          ))}
        </View>
      </View>
    )}
  </ScrollView>);
}