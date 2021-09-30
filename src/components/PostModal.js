import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import firebase from "firebase";
import { postArticleAPI } from "../actions";
function PostModal(props) {
  const [editorText, setEditorText] = useState(" ");
  const [shareImage, setShareImage] = useState(" ");
  const [videoLink, setVideoLink] = useState(" ");
  const [showImage, setShowImage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const handleImage = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };
  const showVideoHandler = () => {
    setShowVideo(true);
    setShowImage(false);
  };
  const showImageHandler = () => {
    setShowImage(true);
    setShowVideo(false);
  };
  const postArticle = (event) => {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.postArticle(payload);
    reset(event);
  };
  const reset = (event) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
  };
  return (
    <Container>
      <Content>
        <Header>
          <h2>Create a post</h2>
          <button onClick={props.onClose}>
            <img src="/images/close-icon.svg" alt="" />
          </button>
        </Header>
        <UserInfo>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <span>{props.user ? props.user.displayName : "Hello"}</span>
        </UserInfo>
        <Editor>
          <textarea
            placeholder="What do you want to talk about?"
            value={editorText}
            onChange={(event) => setEditorText(event.target.value)}
            rows="7"
            cols="70"
          ></textarea>
          {showImage && !showVideo && (
            <UploadImage>
              <input
                type="file"
                accept="image/jpg , image/gif,  image/png . image/jpeg"
                name="image"
                id="file"
                style={{ display: "none" }}
                onChange={handleImage}
              />
              <p>
                <label htmlFor="file">Select an image</label>
              </p>
            </UploadImage>
          )}
          {showVideo && !showImage && (
            <VideoContent>
              <input
                type="text"
                id="video"
                placeholder="Please input a video link"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />
              <label htmlFor="video">Video URL</label>
              {videoLink && (
                <ReactPlayer width="{100%}" height="{60%}" url={videoLink} />
              )}
            </VideoContent>
          )}
        </Editor>
        <ShareArea>
          <SharePics>
            <button onClick={showImageHandler}>
              <img src="/images/image-icon-grey.svg" alt="" />
            </button>
            <button onClick={showVideoHandler}>
              <img src="/images/video-icon-grey.svg" alt="" />
            </button>
          </SharePics>
          <Anyone>
            <button>
              <img src="/images/comment-icon.svg" alt="" />
              Anyone
            </button>
          </Anyone>
          <PostNow>
            <button onClick={(event) => postArticle(event)}>Post</button>
          </PostNow>
        </ShareArea>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  margin: 0 auto;
  overflow: initial;
  border-radius: 5px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  max-height: 65%;
  overflow: scroll;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  button {
    border: none;
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
`;
const UserInfo = styled.div`
  padding: 16px 20px;
  display: flex;
  align-items: flex-start;

  img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;
const Editor = styled.div`
  padding: 16px 20px;
  textarea {
    width: 100%;
    border: none;
    outline: none;
  }
`;
const ShareArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  button {
    border: none;
    background-color: transparent;
    padding: 5px;
    border-radius: 75px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
      color: rgba(0, 0, 0, 0.9);
    }
  }
`;
const SharePics = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  button {
    margin-right: 10px;
  }
`;
const Anyone = styled.div`
  flex-grow: 1;
  margin-left: 5px;
  button {
    align-items: center;
    display: flex;
    color: rgba(0, 0, 0, 0.6);
  }
`;
const PostNow = styled.div`
  button {
    width: 75px;
    height: 35px;
    background-color: #0a66c2;
    color: #fff;
    border-radius: 75px;
  }
`;
const UploadImage = styled.div``;
const VideoContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
