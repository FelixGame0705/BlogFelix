import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import "../Showmore/ShowMoreButton.css"
import { CommentFilter } from '../../../data'
import { getListContentData } from '../../../api'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState, store } from '../../../store/store'
import { setFilter } from '../../../Features/comment/commentSlice'
import { fetchComments } from '../../../Features/comment/commentAction'

type Props = {
    pageNumber: number
    // onShowmore: () =>void
}

const ShowMoreButton = ({pageNumber}:Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [commentsSize, setCommentsSize] = useState<number>(10);
  
  // Sử dụng useEffect để theo dõi sự thay đổi của commentsSize và gọi dispatch khi thay đổi
  useEffect(() => {
    if (commentsSize !== undefined) {
      dispatch(setFilter({ pageSize: commentsSize }));
      const latestFilter = store.getState().comments.filter;
      dispatch(fetchComments(latestFilter!));
    }
  }, [commentsSize]);  // Theo dõi thay đổi của commentsSize và filter
  
  // Hàm showMore để tăng size
  const showMore = () => {
    setCommentsSize(prevSize => prevSize + 10);  // Cập nhật commentsSize một cách an toàn
    console.log("Show more");
  };
  
  return (
    <div className='showMoreButton'>
    <Button onClick={showMore}>Show More</Button>
    </div>
  )
}

export default ShowMoreButton;