import { RiEmotionHappyLine, RiEmotionSadLine } from "@remixicon/react";
import { Else, If, Then } from "react-if";

import styles from "@/styles/components/empty-card.module.css";

import { classNames } from "../utils";

interface EmptyCardProps {
  title: string;
  description?: string;
  isSad?: boolean;
  className?: string;
}

function EmptyCard(props: EmptyCardProps): JSX.Element {
  const { title, description, isSad, className } = props;
  return (
    <div className={classNames(styles.emptyCard, className)}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <If condition={isSad}>
        <Then>
          <RiEmotionSadLine size={72} />
        </Then>
        <Else>
          <RiEmotionHappyLine size={72} />
        </Else>
      </If>
    </div>
  );
}

export { EmptyCard };
