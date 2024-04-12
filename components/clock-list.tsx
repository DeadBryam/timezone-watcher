import { useAutoAnimate } from "@formkit/auto-animate/react";
import { LocalTimeZone } from "@types";
import { memo } from "react";

import styles from "@/styles/components/clock-list.module.css";

import { ClockCard } from "./clock-card";

interface ClockListProps {
  zones: LocalTimeZone[] | undefined;
  onClick: (_id?: LocalTimeZone) => void;
}

function ClockList(props: ClockListProps): JSX.Element {
  const { zones, onClick } = props;

  const [clockRef] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className={styles.timezoneList} ref={clockRef}>
      {zones?.map((e, i) => (
        <ClockCard key={i} timeZone={e} onClick={onClick} />
      ))}
    </div>
  );
}

const MemoizedClockList = memo(ClockList);

export { ClockList, MemoizedClockList };
