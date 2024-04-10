import { useCallback, useEffect, useMemo, useState } from "react";

import styles from "@/styles/components/analog-clock.module.css";
import { classNames } from "@/utils/index";

interface AnalogClockProps {
  time: Date;
  className?: string;
  size?: number;
  onChange?: (_arg0: Date) => void;
}

function AnalogClock(props: AnalogClockProps) {
  const { time: initial, className, size = 150, onChange } = props;
  const [time, setTime] = useState<Date>(initial);
  const [ready, setReady] = useState<boolean>(false);

  const updateClock = useCallback(() => {
    setTime((prev) => new Date(prev.getTime() + 1000));
    onChange?.(time);
  }, []);

  const initialClock = useCallback(() => {
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const getAngle = (value: number, max: number) => (value % max) * (360 / max);

  const angles = useMemo(() => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const seconds = time.getSeconds();

    return {
      hour: getAngle(hour, 12) + minute / 2,
      minute: getAngle(minute, 60),
      second: getAngle(seconds, 60),
    };
  }, [time]);

  const hourHandStyle = { transform: `rotate(${angles.hour}deg)` };
  const minuteHandStyle = { transform: `rotate(${angles.minute}deg)` };
  const secondHandStyle = { transform: `rotate(${angles.second}deg)` };
  const hideHansStyle = { display: "none" };

  const clockStyle = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${6 * (size / 100)}px`,
  };

  useEffect(() => {
    setTime(initial);
  }, [initial]);

  useEffect(() => {
    setReady(true);
    return initialClock();
  }, []);

  return (
    <div
      id="analog-clock"
      data-testid="analog-clock"
      className={classNames(styles.clock, className)}
      style={clockStyle}
    >
      <div
        className={classNames(styles.hand, styles.hourHand)}
        style={ready ? hourHandStyle : hideHansStyle}
        id="analog-clock-hour-hand"
        data-testid="analog-clock-hour-hand"
      />
      <div
        className={classNames(styles.hand, styles.minuteHand)}
        style={ready ? minuteHandStyle : hideHansStyle}
        id="analog-clock-minute-hand"
        data-testid="analog-clock-minute-hand"
      />
      <div
        className={classNames(styles.hand, styles.secondHand)}
        id="analog-clock-second-hand"
        data-testid="analog-clock-second-hand"
        style={ready ? secondHandStyle : hideHansStyle}
      />
      <div
        className={styles.centerDot}
        id="analog-clock-center-dot"
        data-testid="analog-clock-center-dot"
      />
      <span className={classNames(styles.hour, styles.hour12)}>12</span>
      <span className={classNames(styles.hour, styles.hour1)}>1</span>
      <span className={classNames(styles.hour, styles.hour2)}>2</span>
      <span className={classNames(styles.hour, styles.hour3)}>3</span>
      <span className={classNames(styles.hour, styles.hour4)}>4</span>
      <span className={classNames(styles.hour, styles.hour5)}>5</span>
      <span className={classNames(styles.hour, styles.hour6)}>6</span>
      <span className={classNames(styles.hour, styles.hour7)}>7</span>
      <span className={classNames(styles.hour, styles.hour8)}>8</span>
      <span className={classNames(styles.hour, styles.hour9)}>9</span>
      <span className={classNames(styles.hour, styles.hour10)}>10</span>
      <span className={classNames(styles.hour, styles.hour11)}>11</span>
      <span className={classNames(styles.hour, styles.hour12)}>12</span>
    </div>
  );
}

export { AnalogClock };
