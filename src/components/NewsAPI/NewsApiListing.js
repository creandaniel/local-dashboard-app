import React from 'react';
class NewsApiListing extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: []
    };

    // this.createMenuListItem = this.createMenuListItem.bind(this)
  }

  

  async componentDidMount() {

    const settings = {
      method: 'GET',
      headers: {
          Accept: 'application/json',
      }
  };
    try { 
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}`,settings);
        const json = await response.json();
        this.setState({  articles: json.articles });
        
      } catch (error) {
        return error;
      }
  }

  render() {
    return (
      <div className="container col-md-12 card-deck row news-container">


        {this.state.articles.filter((item, y) => y < 5).map((item, y) => {

          if (item.id === this.state.value) {
            return (
           
                <div className="card col-md-2 m-1 p-0 col-xs-3 col-sm-3" key={y}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                   <img className="card-img-top img-responsive" width="22" src={item.urlToImage} alt={item.id}></img>
                   <div className="card-body">
               
                  
                    <h5 className="card-title">{item.title}</h5>
                      <p>{item.source.name}</p>
                    
               
                </div>
                </a>
               
              </div>
            );
          } else {
            return false;
          }
        })}
      </div>
    );
  }
}

export default NewsApiListing;



