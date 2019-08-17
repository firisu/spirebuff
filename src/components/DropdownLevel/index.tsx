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
  value;
  setFunction;
}

const DropdownLevel = (props: Props) => {
  const { value, setFunction } = props;

  const changeHandler = (_: any, data: DropdownProps) => {
    setFunction(Number(data.value));
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
