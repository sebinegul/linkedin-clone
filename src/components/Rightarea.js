import React from "react";
import styled from "styled-components";
import AddToFeed from "./RightSideBar/AddToFeed";
function Rightarea() {
  return (
    <Container>
      <NewsCard>
        <LinkHead>
          <h4>Linkedin News</h4>
          <img src="/images/feed-icon.svg" alt="" />
        </LinkHead>
        <ul>
          <ListComp>
            <h5> The 25 startups to watchTop News</h5>
            <div>
              <span>Top News</span>
              <ul>
                <li>40,254 reader</li>
              </ul>
            </div>
          </ListComp>
          <ListComp>
            <h5>Work While in college:Yay or Nay?</h5>
            <div>
              <span>6days ago</span>
              <ul>
                <li>2306 readers</li>
              </ul>
            </div>
          </ListComp>
          <ListComp>
            <h5>Why CVs get rejected</h5>
            <div>
              <span>3days ago</span>
              <ul>
                <li>72958 readers</li>
              </ul>
            </div>
          </ListComp>
          <ListComp>
            <h5>Your boss may spy on you...forever</h5>
            <div>
              <span>14h ago</span>
              <ul>
                <li>81508 readers</li>
              </ul>
            </div>
          </ListComp>
        </ul>
        <ShowMore>
          Show More
          <img src="/images/down-icon.svg" alt=""></img>
        </ShowMore>
      </NewsCard>
      <AddToFeed/>
    </Container>
  );
}
const Container = styled.div`
  grid-area: rightside;
`;

export default Rightarea;
const NewsCard = styled.div`
  background-color: #fff;
  padding: 10px 12px;
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  margin-bottom: 10px;
  ul {
    padding: 25px;
  }
`;
const ListComp = styled.li`
  div {
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-top: -23px;
    margin-bottom: -10px;
    color:rgba(0,0,0,0.6);
  }
  h5{
    color:rgba(0,0,0,0.8);
    font-size: 14px;
  }
  span {
    :nth-child(2) {
      margin-left: 15px;
    }
  }
`;
const ShowMore = styled.button`
  background-color: #eef3f8;
  border: none;
  outline: none;
  padding: 10px 12px;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: -20px;
  img {
    margin-left: 5px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
`;
const LinkHead = styled.div`
display :flex;
align-items:center;
justify-content: space-between;
h4{
    color: rgba(0, 0, 0, 0.6);
}
`;