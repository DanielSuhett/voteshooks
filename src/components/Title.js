import React, { useState } from 'react'

export default function Title() {

  const [editTitle, setEditTitle] = useState({
    title: 'Double tap to edit question',
    editable: false
  });

  const handleEditTitle = (value) => {
    setEditTitle({ ...editTitle, title: value })
  }

  const toggleEditTitle = () => {
    setEditTitle({ ...editTitle, editable: !editTitle.editable })
  }

  return (
    <h1 className="title" onDoubleClick={() => toggleEditTitle()}>
      {editTitle.editable === true
        ? <>
          <input className="inputTitle" onChange={(e) => handleEditTitle(e.target.value)}
            value={
              editTitle.title === 'Double tap to edit question'
                ? ''
                : editTitle.title
            } placeholder="Edit title"></input>
          <button onClick={() => toggleEditTitle()} className="buttonTitle">
            <img alt="" src="img/success.png"></img>
          </button>
        </>
        : editTitle.title
      }
    </h1>
  )
}

