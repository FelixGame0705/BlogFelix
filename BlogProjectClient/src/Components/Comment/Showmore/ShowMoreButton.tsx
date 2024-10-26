import { Button } from 'antd'
import React, { useState } from 'react'
import "../Showmore/ShowMoreButton.css"
import { CommentFilter } from '../../../data'
import { getListContentData } from '../../../api'

type Props = {
    pageNumber: number
    onShowmore: () =>void
}

const ShowMoreButton = ({pageNumber, onShowmore}:Props) => {
  return (
    <div className='showMoreButton'>
    <Button onClick={onShowmore}>Show More</Button>
    </div>
  )
}

export default ShowMoreButton;