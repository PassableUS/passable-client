import React from 'react';
import { Text } from '@ui-kitten/components';

const Timer = ({ targetTime, timerTextStyle }: { targetTime: Date; timerTextStyle: any }) => {
  // initialize timeLeft with the seconds prop
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    // exit early when we reach 0
    if (currentTime > targetTime) return <Text>Expired</Text>;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [currentTime]);

  const timeRemainingInSeconds = Math.floor((targetTime.getTime() - currentTime.getTime()) / 1000);
  const minutesRemaining = Math.floor(timeRemainingInSeconds / 60);
  let secondsRemaining: string | number = timeRemainingInSeconds - minutesRemaining * 60;
  secondsRemaining = secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining;

  return (
    <Text style={timerTextStyle}>
      {minutesRemaining}:{secondsRemaining} remaining
    </Text>
  );
};

export default Timer;
