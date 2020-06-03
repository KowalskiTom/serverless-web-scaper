import React from 'react'

const Tags = ({ tags }) => {
  return (
    <div>
      <center><h1>tags</h1></center>
      {tags.map((tag) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{tag.name} - {tag.count}</h5>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Tags