import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RiSearch2Line } from "@remixicon/react";
import { debounce } from "lodash";
import {
  forwardRef,
  Ref,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import styles from "@/styles/components/suggestions-input.module.css";
import { classNames } from "@/utils/index";

interface SuggestionsInputProps {
  placeholder?: string;
  autoCompleteItems?: string[];
  className?: string;
  innerRef?: RefObject<HTMLInputElement>;
}

interface HTMLInputElementWithClearInput extends HTMLInputElement {
  clearInput: () => void;
}

const MAX_SUGGESTIONS = 20;

function SuggestionsInput(
  props: SuggestionsInputProps,
  ref: Ref<HTMLInputElement>,
) {
  const {
    placeholder = "Search",
    autoCompleteItems,
    className,
    innerRef,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [suggestionsRef] = useAutoAnimate<HTMLUListElement>();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onInputChange = useCallback(() => {
    if (!inputRef.current) return;
    const { value } = inputRef.current;

    filterAutoCompleteItems(value);
  }, [inputRef.current?.value]);

  const onBlur = useCallback(() => {
    setSuggestions([]);
  }, []);

  const onFocus = useCallback(() => {
    if (!inputRef.current) return;

    const { value } = inputRef.current;
    filterAutoCompleteItems(value);
  }, []);

  const debounceOnBlur = useCallback(debounce(onBlur, 150), [onBlur]);
  const debounceOnChange = useCallback(debounce(onInputChange, 300), [
    onInputChange,
  ]);

  const filterSuggestions = useCallback((list: string[], value: string) => {
    const items = [];

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (
        item.toLowerCase().includes(value.toLowerCase()) ||
        item.replace("_", " ").toLowerCase().includes(value.toLowerCase())
      ) {
        items.push(item);
      }

      if (items.length >= MAX_SUGGESTIONS) break;
    }

    return items;
  }, []);

  const filterAutoCompleteItems = useCallback(
    (searchTerm: string): void => {
      if (!autoCompleteItems) return;
      setSuggestions(filterSuggestions(autoCompleteItems, searchTerm));
    },
    [autoCompleteItems],
  );

  const onAutoCompleteItemClick = useCallback(
    (item: string) => {
      if (!inputRef.current) return;

      inputRef.current.value = item;
      debounceOnBlur();
    },
    [inputRef],
  );

  const clearInput = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.value = "";
  }, [inputRef]);

  useImperativeHandle<unknown, unknown>(innerRef, () => ({
    ...inputRef.current,
    clearInput,
  }));

  return (
    <div ref={ref} className={classNames(styles.searchBoxContainer, className)}>
      <div className={styles.searchBoxWrapper}>
        <RiSearch2Line className={styles.searchBoxIcon} />
        <input
          ref={inputRef}
          type="text"
          id="suggestions-input"
          onFocus={onFocus}
          onBlur={debounceOnBlur}
          placeholder={placeholder}
          className={styles.searchBox}
          onChange={debounceOnChange}
        />
      </div>
      <ul
        ref={suggestionsRef}
        className={classNames(
          styles.autoCompleteList,
          suggestions.length > 0 ? styles.showAutoCompleteList : null,
        )}
      >
        {suggestions.map((item) => (
          <li
            key={item}
            onClick={() => onAutoCompleteItemClick(item)}
            className={styles.autoCompleteItem}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const SuggestionsInputRef = forwardRef(SuggestionsInput);

export { SuggestionsInputRef as SuggestionsInput };
export type { HTMLInputElementWithClearInput };
