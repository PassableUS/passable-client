import React from 'react';
import { Text } from '@ui-kitten/components';

const Timer = ({
  targetTime,
  timerTextStyle,
  setActiveStatus,
}: {
  targetTime: Date;
  timerTextStyle: any;
  setActiveStatus: any;
}) => {
  // initialize timeLeft with the seconds prop
  const [currentTime, setCurrentTime] = React.useState(new Date());

  // TODO: Address potential TypeScript error
  //@ts-ignore
  React.useEffect(() => {
    // exit early when we reach 0
    if (currentTime > targetTime) {
      setActiveStatus(false);
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    const returnFunction = () => clearInterval(intervalId);
    return returnFunction;
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
