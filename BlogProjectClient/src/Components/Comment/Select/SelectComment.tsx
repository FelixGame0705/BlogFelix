import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Select, Space } from "antd";
import menu, { MenuProps } from "antd/es/menu";
import "./SelectComment.css";
import React, { useEffect, useState } from "react";
import { IOptionItems } from "../../../data";
import { optionItems } from "../../../Constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../../../store/store";
import { fetchComments } from "../../../Features/comment/commentAction";
import { useParams } from "react-router-dom";
import { setFilter } from "../../../Features/comment/commentSlice";

type Props = {
  onChangeItem: (value: any) => IOptionItems
  optionsItem: IOptionItems[]
};

const SelectComment = ({onChangeItem, optionsItem}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedItem, setSelectedItem] = useState(optionItems[1].label);
  const [isDesc, setDesc] = useState(false);
  const [commentsSize, setCommentsSize] = useState<number|undefined>(10);
  const { id } = useParams();
  const filter = useSelector((state: RootState) => state.comments.filter);

  const commentsRedux = useSelector((state:RootState) => state.comments.comments)
  const handleChange = (option: any) => {
    onChangeItem(option);
  
    // Cập nhật trạng thái dựa vào `option`
    if (option === optionItems[0].label) {
      setDesc(true);
      setCommentsSize(undefined);
    } else if (option === optionItems[1].label) {
      setDesc(true);
    } else if (option === optionItems[2].label) {
      setDesc(false);
    }
  
    // Cập nhật `selectedItem` sau khi các thay đổi khác đã được xử lý
    setSelectedItem(option);
  };
  
  // Sử dụng `useEffect` để chạy hàm fetchComments sau khi `selectedItem` và `isDesc` thay đổi
  useEffect(() => {
    fetchData();
  }, [isDesc, selectedItem]); // Theo dõi `isDesc` và `selectedItem`
  
  const fetchData = async () =>{
    dispatch(setFilter({ isDescending: isDesc, postID:  Number(id), pageSize: commentsSize }))
    const latestFilter = store.getState().comments.filter;
    dispatch(fetchComments(latestFilter!));
  }
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
