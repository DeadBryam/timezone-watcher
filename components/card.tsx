import { Ref } from "react";

import styles from "@/styles/components/card.module.css";

import { classNames } from "../utils";

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  styleRef?: Ref<HTMLDivElement>;
  className?: string;
}

function Card(props: CardProps): JSX.Element {
  const { children, className, styleRef } = props;

  return (
    <div
      ref={styleRef}
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
