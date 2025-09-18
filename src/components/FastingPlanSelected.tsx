import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

type FastingPlanSelectedProps = {
  onPress: () => void;
  planTitle: string
}


const FastingPlanSelected = (props: FastingPlanSelectedProps) => {
  return (
    <View className="items-center mt-4 mb-4">
      <View>
        <Text className="text-lg text-center mb-2">Plano Selecionado:</Text>
      </View>
      <TouchableOpacity onPress={props.onPress} >
        <View className="flex-row items-center gap-2 bg-blue-200 rounded-full p-2 px-4">
          <Text className="text-xl">{props.planTitle}</Text>
          <MaterialCommunityIcons name="circle-edit-outline" color="#000000" size={24} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default FastingPlanSelected