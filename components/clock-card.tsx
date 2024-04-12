import { RiMoonFill, RiSunFill } from "@remixicon/react";
import { LocalTimeZone } from "@types";
import { memo, useCallback, useMemo, useState } from "react";

import styles from "@/styles/components/clock-card.module.css";

import { classNames } from "../utils";
import { AnalogClock } from "./analog-clock";
import { Card } from "./card";

interface ClockCardProps {
  className?: string;
  timeZone?: LocalTimeZone;
  onClick?: (_id?: LocalTimeZone) => void;
}

function ClockCard(props: ClockCardProps): JSX.Element {
  const { timeZone, className, onClick } = props;
  const MemoizedAnalogClock = memo(AnalogClock);
  const time = useMemo(() => {
    const { offset } = timeZone || { offset: 0 };
    const now = new Date();
    const diff = now.getTimezoneOffset();
    const offsetInMinutes = offset / 1000 / 60;
    const newDate = new Date(
      now.getTime() + (offsetInMinutes + diff) * 60 * 1000,
    );
    return newDate;
  }, [timeZone?.offset]);

  const [isNight, setIsNight] = useState<boolean>(false);

  const updateNight = useCallback((date: Date) => {
    const hour = date.getHours();
    setIsNight(hour < 6 || hour > 18);
  }, []);

  const handleClick = useCallback(() => {
    onClick?.(timeZone);
  }, [onClick]);

  return (
    <Card
      onClick={handleClick}
      className={classNames(
        className,
        styles.card,
        isNight ? styles.darkCard : styles.lightCard,
      )}
    >
      {isNight ? (
        <RiMoonFill
          size={18}
          className={classNames(
            styles.icon,
            isNight ? styles.darkIcon : styles.lightIcon,
          )}
        />
      ) : (
        <RiSunFill
          size={18}
          className={classNames(
            styles.icon,
            isNight ? styles.darkIcon : styles.lightIcon,
          )}
        />
      )}
      <p
        id="clock-card-title"
        data-testid="title"
        className={classNames(
          styles.title,
          isNight ? styles.darkTitle : styles.lightTitle,
        )}
      >
        {timeZone?.region}
      </p>
      <MemoizedAnalogClock time={time} onChange={updateNight} />
    </Card>
  );
}

const MemiozedClockCard = memo(ClockCard);

export { ClockCard, MemiozedClockCard };
