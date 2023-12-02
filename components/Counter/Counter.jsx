import { useState, useEffect, useContext } from "react";
import { getRemainingTimeUntilMsTimestamp } from "./utils/CountdownTimerUtils";
import { SetTimerContext } from "./CounterCountext";
import Skeleton from "@mui/material/Skeleton";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

export const CountdownTimer = ({ countdownTimestampMs, finish, width }) => {
  const finishing = finish * 24 * 60 * 60 * 1000;
  countdownTimestampMs = countdownTimestampMs + finishing;
  const [end, setEnd] = useState(false);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [loading, setshowloading] = useState();
  const set_timer = useContext(SetTimerContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  useEffect(() => {
    setshowloading(true);

    const time = setTimeout(() => {
      setshowloading(false);
    }, 2000);

    console.log('countdownTimestampMs ===> ', countdownTimestampMs);

    return () => {
      time;
    };
  }, []);

  function updateRemainingTime(countdown) {
    if (
      getRemainingTimeUntilMsTimestamp(countdown).days == "00" &&
      getRemainingTimeUntilMsTimestamp(countdown).seconds == "00" &&
      getRemainingTimeUntilMsTimestamp(countdown).hours == "00" &&
      getRemainingTimeUntilMsTimestamp(countdown).minutes == "00"
    ) {
      set_timer(true);
      setEnd(true);
    } else {
      setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }
  }

  return (
    <div>
      {!loading ? (
        !end ? (
          <div className="flex">
            {/* <span>{remainingTime.days}</span> */}
            {/* <span>::</span> */}
            {/* <div onClick={() => 
       { set_timer()
        (timer)}
        }> timer </div> */}
            <div className="mx-[2px]">{remainingTime.hours}h</div>
            <div className="mx-[2px]">:</div>
            <div className="mx-[2px]">{remainingTime.minutes}m</div>
            <div className="mx-[2px]">:</div>
            <div className="mx-[2px]" style={{ width: width }}>
              {remainingTime.seconds}
            </div>
            <div>s</div>
          </div>
        ) : (
          <div>FINISHED</div>
        )
      ) : (
        <div className="flex justify-center">
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: "grey.880" }}
            animation="pulse"
            width={80}
            height={20}
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
};
