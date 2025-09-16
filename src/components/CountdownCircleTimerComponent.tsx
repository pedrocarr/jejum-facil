import React from 'react'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const children = ({ remainingTime }) => {
  const hours = Math.floor(remainingTime / 3600)
  const minutes = Math.floor((remainingTime % 3600) / 60)
  const seconds = remainingTime % 60

  return `${hours}:${minutes}:${seconds}`
}

const CountdownCircleTimerComponent = () => {
  return (
    <CountdownCircleTimer
    isPlaying
    duration={60}
    initialRemainingTime={15}
    colors="#A30000"
  >{children}</CountdownCircleTimer>
  )
}

export default CountdownCircleTimerComponent