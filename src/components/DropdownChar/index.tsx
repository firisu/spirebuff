import React from "react";
import { Dropdown, DropdownItemProps, DropdownProps } from "semantic-ui-react";

import { charNameMap, charImageMap } from "modules/chars";

// キャラ選択
const charOptions: DropdownItemProps[] = [];
Object.keys(charNameMap).forEach(char => {
  const name = charNameMap[char];
  charOptions.push({
    key: `char-${char}`,
    text: name,
    value: char,
    image: charImageMap[char]
  });
});

interface Props {
  value: string;
  setFunction: (newValue: string) => void;
}

const DropdownChar = (props: Props) => {
  const { value, setFunction } = props;

  const changeHandler = (_: any, data: DropdownProps) => {
    setFunction(data.value as string);
  };

  return (
    <Dropdown
      options={charOptions}
      defaultValue={value}
      onChange={changeHandler}
    />
  );
};

export default DropdownChar;
