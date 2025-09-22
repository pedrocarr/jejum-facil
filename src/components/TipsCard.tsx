import { View, Text } from "react-native";

type TipsProps = {
  id?: number;
  title?: string;
  content?: string;
  emoji?: string;
};

export default function TipsCard(props: TipsProps) {
  return (
    <View className="bg-white m-2 p-4 rounded-lg shadow-md">
      <Text className="text-lg font-bold mb-2">
        {props.emoji} {props.title}:
      </Text>
      <Text>
        {props.content}
      </Text>
    </View>
  );
}