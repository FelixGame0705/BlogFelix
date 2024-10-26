import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Select, Space } from "antd";
import menu, { MenuProps } from "antd/es/menu";
import "./SelectComment.css";
import React, { useEffect, useState } from "react";
import { IOptionItems } from "../../../data";
import { optionItems } from "../../../Constants/Constants";

type Props = {
  onChangeItem: (value: any) => IOptionItems
  optionsItem: IOptionItems[]
};

const SelectComment = ({onChangeItem, optionsItem}: Props) => {
  const [selectedItem, setSelectedItem] = useState(optionItems[1].label);
  //   useEffect(
  //     // setSelection()
  //   )

  const handleChange = (option:any) => {
    onChangeItem(option)
    setSelectedItem(option)
    return selectedItem;
  };
  return (
    <>
    <Select
      defaultValue={optionItems[1].label}
      onChange={handleChange}
      className="selectRight"
      options={optionsItem}
      value={selectedItem}
    />
    </>
    
  );
};

export default SelectComment;
