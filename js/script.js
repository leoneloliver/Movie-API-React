class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: []
    }
    this.search = this.search.bind(this);
  }
  showResults(response) {
    this.setState({
      searchResults: response.results
    })
    console.log(response)
  }
  search(URL) {
    $.ajax({
      type: "GET",
      dataType: 'jsonp',
      url: URL,
      success: function(response) {
        this.showResults(response);
      }.bind(this)
    });
  }
  render() {
    return (
      <div>
            <SearchBox search={this.search}/>
            <Results searchResults={this.state.searchResults} />
      </div>
    )
  }
}
class SearchBox extends React.Component { 
  createAjax(){
      var query = ReactDOM.findDOMNode(this.refs.query).value;
      var category = ReactDOM.findDOMNode(this.refs.category).value;
      var URL = 'https://itunes.apple.com/search?term=' + query + '&country=us&entity=' + category;
      this.props.search(URL)
  }
  render() {    
    return (
      <div className="row">
        <nav className="navbar navbar-inverse">
          <div className="container">
            <img src="https://images.vexels.com/media/users/3/130320/isolated/lists/949ce38b403dc5c4212c20a7c83e75af--cone-do-carretel-de-filme.png" className="logo"/> Filmes & APP's
          </div>
        </nav>
        <div className="container center">
         <div className="search-container">
          <input type="text" className="form-control query" placeholder="Search for..." ref="query" onChange={this.createAjax.bind(this)}/>
          <select ref="category" className="category">
            <option value="movie">Films</option>
            <option value="software">Apps</option>
          </select>
          <button className="btn btn-primary go" type="button" onClick={this.createAjax.bind(this)}>
            <span className="glyphicon glyphicon-search"></span>
           </button>
        </div>
      </div>
      </div>
    )
  }
}
class Results extends React.Component {   
  render() {
    var resultItems = this.props.searchResults.map((result) =>
      <ResultItem 
        key={result.trackId} 
        trackName={result.trackName} 
        trackPhoto={result.artworkUrl100} 
        artistName={result.artistName}
        primaryGenreName={result.primaryGenreName}
        longDescription={result.longDescription}
        trackHdPrice={result.trackHdPrice}
        trackViewUrl={result.trackViewUrl}
      /> 
  )
    return (
      <div className="container results">
        <div>
          {resultItems}
        </div>
      </div>
    )
  }
}
class ResultItem extends React.Component {
  render() {
    const description = this.props.longDescription ? this.props.longDescription.substring(0, 200) : "Sorry No Description";
    return (
      <div className="card col-md-4">
        <div className="dark">
          <table>
            <tr>
              <td width="90px"><img className="card-img" src={this.props.trackPhoto} alt="Card image cap" /></td>
              <td>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{this.props.artistName.substring(0, 20)}</li>
                  <li className="list-group-item">Genre: {this.props.primaryGenreName}</li>
                  <li className="list-group-item">Price: ${this.props.trackHdPrice}</li>
                </ul>
              </td>
            </tr>
          </table>       
          <div className="card-block">
            <h4 className="card-title">{this.props.trackName}</h4>
            <p className="card-text">{description}...</p>
          </div>
          <div className="card-block">
            <a href={this.props.trackViewUrl} className="card-link btn btn-primary apple" target="_blank">See more</a>
          </div>
        </div>
        <hr />
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
