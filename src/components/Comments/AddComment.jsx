import React from 'react'

import { FaRegCommentDots } from "react-icons/fa";

import './addComment.css'

const AddComment = (props) => {

    const handleClick = (e) => {
        console.log(props.message)
    }

  return (
<button className='comment-button' onClick={handleClick}>
                <FaRegCommentDots color="white"/>
              </button>
  )
}

export default AddComment
