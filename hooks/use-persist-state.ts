import { Dispatch, SetStateAction, useEffect, useState } from "react";
import store from "store2";

type StorageType = "local" | "session";

interface UsePersistStateProps<S> {
  storageKey: string;
  initialState?: S;
  storageType?: StorageType;
}

const usePersistState = <S>(
  props: UsePersistStateProps<S>,
): [S | undefined, Dispatch<SetStateAction<S>>] => {
  const { storageKey, initialState, storageType = "local" } = props;
  const [data, setData] = useState<S | undefined>(initialState);
  useEffect(() => processState(), []);

  /**
   * @returns void
   * @description
   * This function is used to process state from storage
   * and set it to state
   *
   */
  const processState = (): void => {
    const storageInBrowser = store[storageType].get(storageKey);
    if (Boolean(storageInBrowser)) setData(storageInBrowser);
  };

  /**
   * @param newState
   * @returns void
   *
   * @description
   * This function is used to set state to storage
   * and update the state
   *
   */
  const setState: Dispatch<SetStateAction<S>> = (
    newState: SetStateAction<S> | ((prevState: S | undefined) => S),
  ) => {
    const value =
      typeof newState === "function"
        ? (newState as (prevState: S | undefined) => S)(data)
        : newState;
    store[storageType].set(storageKey, value);
    setData(value);
  };

  return [data, setState];
};

export { usePersistState };
