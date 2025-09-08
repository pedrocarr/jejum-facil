import { View, Text } from "react-native";

type TipsProps = {
  title?: string;
  content?: string;
  emoji?: string;
  index?: number;
};

export default function Tips(props: TipsProps) {
  return (
    <View key={props.index} className="bg-white m-2 p-4 rounded-lg shadow-md">
      <Text className="text-lg font-bold mb-2">
        {props.emoji} {props.title}:
      </Text>
      <Text>
        {props.content}
      </Text>
    </View>
  );
}