import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type PlanosCardsProps = {
  id: string;
  title: string;
  fastingDescription: string;
  feedingDescription?: string;
  onPress?: () => void;
};

export default function PlansCards(props: PlanosCardsProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      className="bg-white m-2 p-2 rounded-lg shadow-md"
      activeOpacity={0.7}
      key={props.id}
    >
      <View className="flex flex-row gap-1 items-start">
        <MaterialCommunityIcons name="clock-outline" color="#c0c0c0" size={20} />
        <Text className="text-xl mb-2 font-bold">{props.title}</Text>
      </View>
      <View className="flex flex-row gap-1 items-start">
        <MaterialCommunityIcons name="timer-sand-full" color="#6200ee" size={20} />
        <Text className="text-sm">{props.fastingDescription}</Text>
      </View>
      {props.feedingDescription && (
        <View className="flex flex-row gap-1 items-start">
          <MaterialCommunityIcons name="food" size={20} />
          <Text className="text-sm">{props.feedingDescription}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}