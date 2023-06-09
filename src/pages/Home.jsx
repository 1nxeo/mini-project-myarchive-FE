import React from "react";
import Nav from "../components/Nav";
import Wrapper from "../components/Wrapper";
import GlobalStyle from "../GlobalStyle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../redux/modules/postSlice";
import { useEffect } from "react";
import Card from "../components/Card";
import Category from "../components/Category";
import styled from "styled-components";
import ErrorMessage from "../components/ErrorMessage";
import { cookies } from "../shared/cookies";
import WinWrapper from "../components/WinWrapper";
import NotepadIcon from "../components/icons/NotepadIcon";
import WinFooter from "../components/WinFooter";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.posts);
  const { cates } = useSelector((state) => state.cate);
  const postList = JSON.stringify(posts);

  const nick = cookies.get("nick");

  useEffect(() => {
    if (cookies.get("adminToken")) {
      cookies.remove("adminToken");
    }
    cookies.get("nick");
    dispatch(__getPost());
  }, [postList, nick]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }

  return (
    <Wrapper>
      <WinWrapper>
        <GlobalStyle />
        <Nav />
        <div>
          <ContentNav>
            <Category />
            {nick ? (
              <NotepadIcon onClick={() => navigate("/post")}>
                Commit
              </NotepadIcon>
            ) : null}
          </ContentNav>
          <CardsWrapper>
            {cates == "notdone"
              ? posts?.map((item) => <Card key={item.postId} item={item} />)
              : null}
            {posts?.map((item) =>
              item.category == cates ? (
                <Card key={item.postId} item={item} />
              ) : null
            )}
            {cates == "done"
              ? posts?.map((item) =>
                  nick === item.nick && item.isDone ? (
                    <Card key={item.postId} item={item} />
                  ) : null
                )
              : null}
          </CardsWrapper>
        </div>
        <WinFooter />
      </WinWrapper>
    </Wrapper>
  );
}

const ContentNav = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  align-items: center;
`;
export const CardsWrapper = styled.div`
  width: 1000px;
  max-height: 480px;
  min-height: 480px;

  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  overflow: scroll;

  gap: 20px;
`;

export default Home;
