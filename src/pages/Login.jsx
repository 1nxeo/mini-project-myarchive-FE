import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import GlobalStyle from "../GlobalStyle";
import { __loginUser } from "../redux/modules/userSlice";
import { cookies } from "../shared/cookies";
import WinWrapper from "../components/WinWrapper";
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    accountId: "",
    password: "",
  });

  const token = cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    await dispatch(
      __loginUser({
        userInfo,
        next: () => {
          navigate("/");
        },
      })
    );
    setUserInfo({ accountId: "", password: "" });
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <WinWrapper
        style={{ width: "400px", height: "300px", marginTop: "230px" }}
      >
        <StForm onSubmit={(e) => submitLoginHandler(e)}>
          <FormWrapper>
            <div>ID:</div>
            <input
              required
              type="text"
              value={userInfo.accountId}
              onChange={(e) =>
                setUserInfo({ ...userInfo, accountId: e.target.value })
              }
              style={{
                fontFamily: "DungGeunMo, sans-serif",
                width: "280px",
                height: "22px",
                fontSize: "17px",
              }}
            />
          </FormWrapper>
          <FormWrapper>
            <div>PW:</div>
            <input
              required
              type="password"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              style={{
                fontFamily: "DungGeunMo, sans-serif",
                width: "280px",
                height: "22px",
                marginBottom: "10px",
                fontSize: "17px",
              }}
            />
          </FormWrapper>
          <FormWrapper>
            <button
              style={{
                width: "100px",
                marginBottom: "10px",
                marginTop: "10px",
                fontFamily: "DungGeunMo, sans-serif",
                fontSize: "12px",
              }}
            >
              로그인
            </button>
            <button
              style={{
                width: "100px",
                marginBottom: "10px",
                marginTop: "5px",
                fontFamily: "DungGeunMo, sans-serif",
                fontSize: "12px",
              }}
              onClick={() => navigate("/register")}
            >
              회원가입
            </button>
          </FormWrapper>
        </StForm>
      </WinWrapper>
    </Wrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StForm = styled.form`
  height: 260px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Login;
