import React from "react";
import styled from "styled-components";
import Leftarea from "./Leftarea";
import Main from "./Main";
import Rightarea from "./Rightarea";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
function Home(props) {
  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Layout>
        <Leftarea />
        <Main />
        <Rightarea />
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
  padding-bottom: 52px;
`;
const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  grid-template-areas: "leftside mainarea rightside";
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
export default connect(mapStateToProps)(Home);
