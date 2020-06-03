import React from 'react';
 
const home = () => {
    return (
       <div>
          <h1>serverless-web-scraper</h1>
           <p>Home to the hottest serverless web scraper in town!</p>
            <form  onSubmit={
                fetch(process.env.REACT_APP_API_URL + '/refreshQuoteStats', {
                  method: 'POST'
                })
                .then(res => res.json())
                .then((data) => {
                  this.setState({ authors: data.authors })
                })
                .catch(console.log)
            }>
                <button type="submit">Refresh Quotes Stats</button>
            </form>
       </div>
    );
}
 
export default home;