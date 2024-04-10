import styles from "@/styles/components/card.module.css";

import { classNames } from "../utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card(props: CardProps): JSX.Element {
  const { children, className } = props;

  return (
    <div
      id="card"
      data-testid="card"
      className={classNames(styles.cardContainer, className)}
    >
      {children}
    </div>
  );
}

export { Card };
