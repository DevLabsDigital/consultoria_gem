import React from 'react';
import styled from "styled-components";
import {Column} from "../styles/Flex";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PageLayout = ({children}) => {
    return (
        <PageLayoutContainer>
            <Topbar/>
            <DividedScreen>
                <Navbar/>
                <MainContainer>
                    {children}
                    <Footer />
                </MainContainer>
            </DividedScreen>
        </PageLayoutContainer>
    );
};

export default PageLayout;

const PageLayoutContainer = styled.div`
${Column};
`

const DividedScreen = styled.div`
display: grid;
grid-template-columns: 25rem 1fr;
grid-column-gap: 2.2rem;
padding-top: 3rem;
`

const MainContainer = styled.div`

`