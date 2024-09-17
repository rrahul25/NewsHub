import React, { Component } from 'react';

class Newsitem extends Component {
  render() {
    const { title, description, imgurl, newsurl, author, date, source } = this.props;

    return (
      <div className="my-3">
        <div className="card">
          <span className="badge text-bg-secondary">{source}</span>
          <img
            src={imgurl ? imgurl : "/images/default-image.jpg"}
            className="card-img-top"
            alt={title || "News image"}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            {description ? (
              <p className="card-text">{description}</p>
            ) : (
              <p>Description not available</p>
            )}
            <p className="card-text">
              <small className="text-muted">
                By {author || "unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsurl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
