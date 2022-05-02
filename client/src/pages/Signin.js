import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, reset } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoadingIndicator from "../components/LoadingIndicator";
import Container from "../components/styles/Container.styled";
import Content from "../components/styles/Content.styled";

const Background = styled(Container)`
  grid-column: 1/ 15;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  font-size: 18px;
  font-weight: 500;
`;

const SigninWrap = styled(Content)`
  display: flex;
  min-width: 400px;
  height: 100%;
  padding: 20px;
  grid-column: 4/12;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  form {
    display: flex;
    width: 90%;
    flex-direction: column;
  }
  input {
    display: flex;
    background: transparent;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px 10px;
    width: 100%;
    /* background: white; */
    border: none;
    border-bottom: 3px solid #ccc;
  }
  input:hover {
    outline: none;
    border-bottom: 3px solid #6733e5;
  }
  input:focus {
    outline: none;
    border-bottom: 3px solid #6733e5;
  }
`;
const Title = styled.div`
  display: flex;
  color: #6733e5;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 35px;
  font-weight: 900;
  text-shadow: 1px 1px 1px #c593fe;
`;
const Text = styled.div`
  margin-right: 10px;
  color: #6733e5;
  font-size: 20px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  button {
    cursor: pointer;
    font-size: 25px;
    font-weight: 900;
    border: 3px solid #c593fe;
    padding: 5px 40px;
    width: 100%;
    color: white;
    background-color: #6733e5;
    border-radius: 10px;
    margin-top: 20px;
  }
  button:hover {
    background-color: #c593fe;
    border: 3px solid #6733e5;
  }
  button:active {
    position: relative;
    top: 3px;
  }
`;
const AlertBox = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;
const Resister = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-weight: 700;
    color: #6733e5;
  }
`;

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(reset()); // 상태(로딩or성공or실패) 모두 리셋
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleInputValue = (key) => (e) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    if (Object.values(userData).includes("")) {
      setErrorMessage("모든 항목을 입력해 주세요.");
      return;
    }

    dispatch(signin(userData));
    navigate("/");
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Background>
        <SigninWrap>
          <form onSubmit={handleSignin}>
            <Title>
              <h1 className="text-grey-600">로그인</h1>
            </Title>
            <Text>이메일</Text>
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              onChange={handleInputValue("email")}
            />
            <Text>비밀번호</Text>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleInputValue("password")}
            />
            <Resister>
              <p>아직 아이디가 없으신가요? </p>
              <Link to="/signup">
                <span>회원가입하기</span>
              </Link>
            </Resister>
            <ButtonWrap>
              <button type="submit">로그인</button>
            </ButtonWrap>
            <AlertBox className="alert-box">{errorMessage}</AlertBox>
          </form>
        </SigninWrap>
      </Background>
    </>
  );
}

export default Login;