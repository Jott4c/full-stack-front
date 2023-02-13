import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

export const Input = styled.input`
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #009dcf;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;
