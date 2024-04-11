import { RiLoader2Line } from "@remixicon/react";

import styles from "@/styles/components/custom-button.module.css";

import { classNames } from "../utils";

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  secondary?: boolean;
}

function CustomButton(props: CustomButtonProps): JSX.Element {
  const { children, className, onClick, isDisabled, isLoading, secondary } =
    props;

  return (
    <button
      className={classNames(
        styles.button,
        className,
        secondary ? styles.secondary : null,
        isLoading ? styles.loading : null,
      )}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading && <RiLoader2Line className={styles.loader} />}
      {isLoading ? "Loading..." : children}
    </button>
  );
}

export { CustomButton };
