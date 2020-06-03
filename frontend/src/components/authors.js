import React from 'react'

const Authors = ({ authors }) => {
  return (
    <div>
      <center><h1>authors</h1></center>
      {authors.map((author) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{author.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Born: {author.dateBorn}</h6>
            <p class="card-text">Quote Count: {author.quoteCount}</p>
            <span>Tags:</span>
            <p> 
              {author.tags.map(function(name, index){
                return <span class="badge badge-pill badge-info">{name}</span>;
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Authors