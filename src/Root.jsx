import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createGlobalStyle, styled } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './components/Header/Header';
import { UserContext } from './utils/context/UserContext';

const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .fade-enter {
      opacity: 0;
    }

    .fade-enter-active {
      opacity: 1;
      transition: opacity 250ms ease-in;
    }

    .fade-exit {
      opacity: 1;
    }

    .fade-exit-active {
      opacity: 0;
      transition: opacity 250ms ease-out;
    }
  `;

const AnimationContainer = styled.div`
    width: 100%;
    height: 100%;
`;

function Root() {
    const location = useLocation();
    const [userId, setUserId] = useState(''); // userId 상태 정의

    return (
        <>
            <Helmet>
                <title>LeeJaeSeok</title>
            </Helmet>
            <UserContext.Provider value={{ userId, setUserId }}>
                <GlobalStyle />
                {location.pathname !== '/' &&
                    location.pathname !== '/signuppage' &&
                    location.pathname !== '/checksignuppage' && <Header />}
                <TransitionGroup>
                    <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                        <AnimationContainer>
                            <Outlet />
                        </AnimationContainer>
                    </CSSTransition>
                </TransitionGroup>
            </UserContext.Provider>
        </>
    );
}

export default Root;
