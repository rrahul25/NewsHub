import React, { Component } from "react";
import NewsItem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    category: "general",
    pageSize: 6,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
    apiKey: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      hasMore: true,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsHub`;
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    
    if (prevProps.category !== this.props.category || prevProps.country !== this.props.country) {
      
      this.setState(
        {
          articles: [],
          page: 1,
          totalResults: 0,
          hasMore: true,
        },
        () => {
          this.fetchArticles();
         
          document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsHub`;
        }
      );
    }
  }

  fetchArticles = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      
      if (!parsedData || !Array.isArray(parsedData.articles)) {
        console.error('Invalid data received:', parsedData);
        throw new Error('Invalid data format');
      }

      this.setState((prevState) => ({
        articles: prevState.page === 1 ? parsedData.articles : prevState.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false,
        hasMore: prevState.page < Math.ceil(parsedData.totalResults / this.props.pageSize),
      }));
    } catch (error) {
      console.error("Error fetching articles:", error);
      this.setState({ loading: false });
    }
  };

  fetchMoreData = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }), this.fetchArticles);
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
          NewsHub - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<Spinner />}
          endMessage={<p style={{ textAlign: 'center' }}>No more news to show</p>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
               
                if (!element || !element.url) {
                  console.error('Unexpected article structure:', element);
                  return null; 
                }

                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      imgurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source ? element.source.name : 'Unknown'}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
