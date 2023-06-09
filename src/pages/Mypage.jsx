import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import ErrorMessage from "../components/ErrorMessage";
import Wrapper from "../components/Wrapper";
import GlobalStyle from "../GlobalStyle";
import Category from "../components/Category";
import styled from "styled-components";
import { cookies } from "../shared/cookies";
import { __getMemberPosts } from "../redux/modules/memberSlice";
import { CardsWrapper } from "./Home";
import Card from "../components/Card";
import { changeCates } from "../redux/modules/cateSlice";
import WinWrapper from "../components/WinWrapper";
import ProgramIcon from "../components/icons/ProgramIcon";
import NotepadIcon from "../components/icons/NotepadIcon";

function Mypage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memberPosts, isLoading, error } = useSelector(
    (state) => state.members
  );
  const { posts } = useSelector((state) => state.posts);
  const { cates } = useSelector((state) => state.cate);
  const { accountId } = useParams();
  const memberPost = JSON.stringify(memberPosts);

  useEffect(() => {
    if (cookies.get("adminToken")) {
      cookies.remove("adminToken");
    }
    if (!cookies.get("token")) {
      alert("로그인이 필요한 페이지입니다.");
      navigate("/");
    } else {
      dispatch(__getMemberPosts());
      dispatch(changeCates("notdone"));
    }
    return () => {
      dispatch(changeCates("notdone"));
    };
  }, [memberPost]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }

  return (
    <Wrapper>
      <GlobalStyle />
      <WinWrapper>
        <Nav />
        <StCateBar>
          <StButtonBox>
            <Category />
          </StButtonBox>
          <StButtonBox>
            <ProgramIcon
              value="done"
              onClick={(e) => {
                dispatch(changeCates("done"));
              }}
              style={{ margin: "0px" }}
            >
              Flex
            </ProgramIcon>
            <NotepadIcon onClick={() => navigate("/post")}>Commit</NotepadIcon>
          </StButtonBox>
        </StCateBar>

        <CardsWrapper>
          <MypageWrapper>
            {cates == "notdone"
              ? posts?.map((item) =>
                  item.accountId === accountId ? (
                    <Card key={item.id} item={item} />
                  ) : null
                )
              : null}
            {cates
              ? memberPosts.notdone?.map((item) =>
                  item.category == cates ? (
                    <Card key={item.id} item={item} />
                  ) : null
                )
              : null}
            {cates == "done"
              ? memberPosts.done?.map((item) => (
                  <Card key={item.id} item={item} />
                ))
              : null}
          </MypageWrapper>
        </CardsWrapper>
      </WinWrapper>
    </Wrapper>
  );
}

const StCateBar = styled.div`
  display: flex;
  width: 93%;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
`;

const StButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MypageWrapper = styled.div`
  height: 480px;
  width: 1000px;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  overflow: scroll;
`;

export default Mypage;
