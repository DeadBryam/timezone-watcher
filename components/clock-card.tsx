import { RiMoonFill, RiSunFill } from "@remixicon/react";
import { memo, useCallback, useState } from "react";

import styles from "@/styles/components/clock-card.module.css";

import { classNames } from "../utils";
import { AnalogClock } from "./analog-clock";
import { Card } from "./card";

interface ClockCardProps {
  time: Date;
  title: string;
  className?: string;
  onClick?: () => void;
}

function ClockCard(props: ClockCardProps): JSX.Element {
  const { time, title, className, onClick } = props;
  const MemoizedAnalogClock = memo(AnalogClock);

  const [isNight, setIsNight] = useState<boolean>(false);

  const updateNight = useCallback((date: Date) => {
    const hour = date.getHours();
    setIsNight(hour < 6 || hour > 18);
  }, []);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
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
        {title}
      </p>
      <MemoizedAnalogClock time={time} onChange={updateNight} />
    </Card>
  );
}

export { ClockCard };
