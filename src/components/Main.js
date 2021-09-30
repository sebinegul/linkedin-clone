import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import { connect } from "react-redux";
import { getArticleAPI } from "../actions";
import articleReducer from "../reducers/articleReducer";
import ReactPlayer from "react-player";

function Main(props) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    props.getArticles();
  }, []);
  const modalOpen = (event) => {
    event.preventDefault();
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {props.articles.length === 0 ? (
        <p>There are no aticles</p>
      ) : (
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="" />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}
              <button
                onClick={modalOpen}
                disabled={props.loading ? true : false}
              >
                Start Now
              </button>
            </div>
            <div>
              <button>
                <img src="/images/image-icon.svg" alt="" />
                <span>Photo</span>
              </button>
              <button>
                <img src="/images/video-icon.svg" alt="" />
                <span>Video</span>
              </button>
              <button>
                <img src="/images/event-icon.svg" alt="" />
                <span>Events</span>
              </button>
              <button>
                <img src="/images/article-icon.svg" alt="" />
                <span>Article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {props.loading && <h1>Loading </h1>}
            {props.articles.length > 0 &&
              props.articles.map((articles, key) => (
                <Articles key={key}>
                  <ArticleHead>
                    <img src={articles.actor.image} alt="" />
                    <Titles>
                      <span>{articles.actor.title}</span>
                      <span>{articles.actor.description}</span>
                      <span>
                        {articles.actor.date.toDate().toLocaleDateString()}
                      </span>
                    </Titles>
                    <button>
                      <img src="/images/dots.svg" alt="" />
                    </button>
                  </ArticleHead>
                  <Description>{articles.description}</Description>
                  <SharedImg>
                    <a>
                      {!articles.sharedImg && articles.video ? (
                        <ReactPlayer width={"100%"} url={articles.video} />
                      ) : (
                        articles.sharedImg && <img src={articles.sharedImg} />
                      )}
                    </a>
                  </SharedImg>
                  <SocialLikes>
                    <li>
                      <button>
                        <img src="/images/like.svg" alt="" />
                        <img src="/images/like-yellow.svg" alt="" />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <span>{articles.comments}</span>
                    </li>
                  </SocialLikes>
                  <SocialActions>
                    <button>
                      <img src="/images/likes-icon.svg" alt="" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="/images/comment-icon.svg" alt="" />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img src="/images/share-icons.svg" alt="" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img src="/images/send-icons.svg" alt="" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Articles>
              ))}
          </Content>
          {showModal && <PostModal onClose={hideModal} />}
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  grid-area: mainarea;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0/15%), 0 0 0 rgb(0 0 0 /20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
        cursor: pointer;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      margin-top: 5px;
      button {
        img {
          margin: 0px 4px 0 -2px;
        }
      }
    }
  }
`;
const Articles = styled(CommonCard)``;

const ArticleHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 12px;
  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
  }
  button {
    border: none;
    background: transparent;
    width: 36px;
    height: 36px;
    position: relative;
    margin-top: -40px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
const Titles = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-grow: 1;
  margin-left: 10px;
  height: 52px;
  span {
    line-height: 1.35;
    &:first-child {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.8);
      font-weight: 400;
    }
    &:nth-child(2) {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
    }
    &:nth-child(3) {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;
const Description = styled.div`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9f9f9;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialLikes = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.085);
  button {
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;

    span {
      font-size: 12px;
      margin-left: 5px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
  li {
    padding: 12px;
    font-size: 12px;

    &:nth-child(2) {
      margin-left: 10px;
      list-style: disc;
      span {
        margin-left: -15px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
`;
const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 0 5px;
  button {
    border: none;
    background-color: transparent;
    align-items: center;
    display: flex;
    padding: 15px;
    cursor: pointer;
    width: 25%;
    justify-content: center;
    span {
      color: #adadad;
      margin-left: 8px;
    }
    @media (max-width: 768px) {
      span {
        display: none;
      }
      padding: 12px 25px;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      border-radius: 5px;
    }
  }
`;
const Content = styled.div`
  text-align: center;
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.user,
    articles: state.articleState.articles,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticleAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
