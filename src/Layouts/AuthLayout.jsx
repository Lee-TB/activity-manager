import React, { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useSigninCheck } from 'reactfire';

const LayoutStyled = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const ContentStyled = styled.main`
  padding: 20px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  width: 400px;
  min-height: 500px;
  background-color: #ffffff;
`;

const TextLinkStyled = styled.div`
  margin-top: auto;
  text-align: center;
`;

const loadingIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function AuthLayout() {
  const location = useLocation();
  const { pathname } = location;
  const { status, data: userData } = useSigninCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.signedIn) {
      navigate('/');
    }
  }, [userData]);

  return (
    <LayoutStyled>
      <ContentStyled>
        <Spin indicator={loadingIcon} spinning={status === 'loading'}>
          <Outlet />
        </Spin>
        {pathname.includes('/login') ? (
          <TextLinkStyled>
            <span>Not a member? </span>
            <Link to="signup">signup now</Link>
          </TextLinkStyled>
        ) : (
          <TextLinkStyled>
            <span>Already a member? </span>
            <Link to="login">login now</Link>
          </TextLinkStyled>
        )}
      </ContentStyled>
    </LayoutStyled>
  );
}

export default AuthLayout;
