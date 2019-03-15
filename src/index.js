import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import './index.css';

function Tweet({ tweet }) {
  return (
    <div className='tweet'>
      <Avatar hash={tweet.gravatar}/>
      <div className='content'>
        <NameWithHandle author={tweet.author}/>
        <Time time={tweet.timestamp}/>
        <Message text={tweet.message}/>
        <div className='buttons'>
          <ReplyButton/>
          <RetweetButton count={tweet.retweets}/>
          <LikeButton count={tweet.likes}/>
          <MoreOptionsButton/>
        </div>
      </div>
    </div>
  );
}

Tweet.propTypes = {
  tweet: PropTypes.shape({
    message: PropTypes.string.isRequired, 
    gravatar: PropTypes.string.isRequired,
      author: PropTypes.shape({
        handle: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired 
      }).isRequired,
    likes: PropTypes.number,
    retweets: PropTypes.number,
    timestamp: PropTypes.string.isRequired
  }).isRequired
}

function Avatar({ hash }) {
  let url = `https://www.gravatar.com/avatar/${hash}`
  return (
    <img
      src={url}
      className='avatar'
      alt='avatar'
    />
  );
}

Avatar.propTypes = {
  hash: PropTypes.string.isRequired
};

function Message({ text }) {
  return (
    <div className='message'>
      {text}
    </div>
  );
}

function NameWithHandle({ author }) {
  const { name, handle } = author;
  return (
    <span className='name-with-handle'>
      <span className='name'>{name}</span>
      <span className='handle'>@{handle}</span>
    </span>
  );
}

NameWithHandle.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired
  }).isRequired
};

const ReplyButton = () => ( <i className="fa fa-reply reply-button"/> );
  
const RetweetButton = ({ count }) => (
  <span className="retweet-button">
  <i className="fa fa-retweet"/>
    <span className="retweet-count"> 
      {count ? count : null}
    </span>
  </span>
);
  
const LikeButton = ({ count }) => ( 
  <span className="like-button">
    <i className="fa fa-heart"/>
    {count > 0 &&
      <span className='like-count'>
        {count}
      </span>
    }
  </span>
);

LikeButton.propTypes = {
  count: PropTypes.number
};

const MoreOptionsButton = () => ( <i className="fa fa-ellipsis-h more-options-button"/> );

const Time = ({ time }) => {
  const timeString = moment(time).fromNow();
  return (
    <span className='time'>
      {timeString}
    </span>
  );
}

var testTweet = {
  message: "Something about cats.", 
  gravatar: "8f0896de99c04b103e1f29cbf34b580a",
    author: {
      handle: "catperson",
      name: "IAMA Cat Person" 
    },
  likes: 49,
  retweets: 13,
  timestamp: "2019-02-12 21:24:37"
};
  
ReactDOM.render(
  <Tweet tweet={testTweet}/>, 
  document.querySelector('#root')
);

