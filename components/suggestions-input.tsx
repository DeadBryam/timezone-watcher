import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RiSearch2Line } from "@remixicon/react";
import { debounce } from "lodash";
import { useCallback, useRef, useState } from "react";

import styles from "@/styles/components/suggestions-input.module.css";
import { classNames } from "@/utils/index";

interface SuggestionsInputProps {
  placeholder?: string;
  autoCompleteItems?: string[];
  className?: string;
  onChange?: (searchTerm: string) => void;
}

function SuggestionsInput(props: SuggestionsInputProps): JSX.Element {
  const {
    placeholder = "Search",
    autoCompleteItems,
    onChange,
    className,
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  const [suggestionsRef] = useAutoAnimate<HTMLUListElement>();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onInputChange = useCallback(() => {
    if (!ref.current) return;
    const { value } = ref.current;

    filterAutoCompleteItems(value);
    onChange?.(value);
  }, [onChange]);

  const onBlur = useCallback(() => {
    setSuggestions([]);
  }, []);

  const onFocus = useCallback(() => {
    if (!ref.current) return;

    const { value } = ref.current;
    filterAutoCompleteItems(value);
  }, []);

  const debounceOnBlur = useCallback(debounce(onBlur, 300), [onBlur]);
  const debounceOnChange = useCallback(debounce(onInputChange, 300), [
    onInputChange,
  ]);

  const filterAutoCompleteItems = useCallback(
    (searchTerm: string): void => {
      if (!autoCompleteItems || !searchTerm) return;

      const filteredItems = autoCompleteItems?.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      setSuggestions(filteredItems);
    },
    [autoCompleteItems],
  );

  const onAutoCompleteItemClick = useCallback(
    (item: string) => {
      if (!ref.current) return;

      ref.current.value = item;
      onChange?.(item);
      debounceOnBlur();
    },
    [ref],
  );

  return (
    <div className={classNames(styles.searchBoxContainer, className)}>
      <div className={styles.searchBoxWrapper}>
        <RiSearch2Line className={styles.searchBoxIcon} />
        <input
          ref={ref}
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

export { SuggestionsInput };
