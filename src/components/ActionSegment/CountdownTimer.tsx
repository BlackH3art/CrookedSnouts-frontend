import { FC, ReactNode, useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/AppContext";
import { RemainingTime } from "../../interfaces/RemainingTimeInterface";
import { getRemainingTime } from "../../utils/countdown";

interface Props {
  children: ReactNode;
  additionalClass?: string;
}

const TimeSpan: FC<Props> = ({ children, additionalClass }) => (
  <span className={`${additionalClass ? additionalClass : ''} text-xl font-semibold text-gray-100 md:text-4xl text-center md:pb-12 mx-1`}>
    {children}
  </span>
)


const remainingTimeDefault: RemainingTime = {
  seconds: '00',
  minutes: '00', 
  hours: '00',
  days: '00'
}

interface CounterProps {
  timestamp: number;
}


const CountdownTimer: FC<CounterProps> = ({ timestamp }) => {

  const [remainingTime, setRemainingTime] = useState<RemainingTime>(remainingTimeDefault);
  let whitelistClose = new Date()
  let whitelistOpen = new Date()

  useEffect(() => {

    const updateIntervalId = setInterval(() => {
      updateRemainingTime(timestamp);
    }, 1000);

    return () => clearInterval(updateIntervalId);
  }, [timestamp]);


  function updateRemainingTime(timestamp: number) {

    const time = getRemainingTime(timestamp);

    setRemainingTime(time);
  }


  const { seconds, minutes, hours, days } = remainingTime;

  return(
    <>
      <div className="flex">
        <TimeSpan>
          {days}
        </TimeSpan>
        <TimeSpan>
          <p className="hidden md:block"> days </p>
          <p className="md:hidden"> d </p>
        </TimeSpan>
        <TimeSpan additionalClass="time-span">
          {hours}
        </TimeSpan>
        <TimeSpan>
          <p className="hidden md:block"> hours </p>
          <p className="md:hidden"> h </p>
        </TimeSpan>
        <TimeSpan additionalClass="time-span">
          {minutes}
        </TimeSpan>
        <TimeSpan>
          <p className="hidden md:block"> minutes </p>
          <p className="md:hidden"> min </p>
        </TimeSpan>
        <TimeSpan additionalClass="time-span">
          {seconds}
        </TimeSpan>
        <TimeSpan>
          <p className="hidden md:block"> seconds </p>
          <p className="md:hidden"> sec </p>
        </TimeSpan>
      </div>
    </>
  )
}

export default CountdownTimer;