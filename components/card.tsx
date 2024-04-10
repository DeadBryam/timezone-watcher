import styles from "@/styles/components/card.module.css";

import { classNames } from "../utils";

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function Card(props: CardProps): JSX.Element {
  const { children, className } = props;

  return (
    <div
      id="card"
      data-testid="card"
      onClick={props.onClick}
      className={classNames(styles.cardContainer, className)}
    >
      {children}
    </div>
  );
}

export { Card };
