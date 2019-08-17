import React from "react";
import { Dropdown, DropdownItemProps, DropdownProps } from "semantic-ui-react";

// レベル選択
const levelOptions: DropdownItemProps[] = [];
for (let i = 0; i <= 20; i++) {
  levelOptions.push({
    key: `level-${i}`,
    text: `アセンション ${i}`,
    value: i
  });
}

interface Props {
  value: number;
  setFunction: (newValue: number) => void;
}

const DropdownLevel = (props: Props) => {
  const { value, setFunction } = props;

  const changeHandler = (_: any, data: DropdownProps) => {
    setFunction(Number(data.value as string));
  };

  return (
    <Dropdown
      options={levelOptions}
      defaultValue={value}
      onChange={changeHandler}
    />
  );
};

export default DropdownLevel;
