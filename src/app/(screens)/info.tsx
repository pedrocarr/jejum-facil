import { Text, ScrollView, View, TouchableOpacity } from "react-native";


export default function Info() {
  return (
    <ScrollView className="flex-1 bg-[#F0F8FF]">
      <ScrollView horizontal className="m-4 p-4">
      </ScrollView>
      <ScrollView className="m-4 p-4 bg-white rounded-lg shadow-md">
        <Text className="text-lg mb-2">
          Este aplicativo foi desenvolvido para ajudar você a monitorar e gerenciar seus jejuns de forma eficaz. Com uma interface simples e intuitiva, você pode iniciar, pausar e encerrar seus jejuns com apenas alguns toques.
        </Text>
        <Text className="text-lg mb-2">
          Além disso, o aplicativo oferece dicas úteis para tornar sua experiência de jejum mais agradável e bem-sucedida. Lembre-se de que o jejum intermitente pode trazer diversos benefícios à saúde, mas é importante ouvir seu corpo e consultar um profissional de saúde antes de iniciar qualquer regime alimentar.
        </Text>
        <Text className="text-lg mb-2">
          Esperamos que este aplicativo seja uma ferramenta valiosa em sua jornada de jejum. Se tiver alguma dúvida ou sugestão, não hesite em entrar em contato conosco. Bom jejum!
        </Text>
      </ScrollView>
    </ScrollView>
  );
}