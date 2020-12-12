import Link from 'next/link'

import styled from 'styled-components'

const Header = () => {
    return (
        <HeaderContainer>
            <TopBar>
                <div className="inner">
                    <Link href="/">
                        <a>
                            <Title>気ままにWeBlog</Title>
                            <SubTitle>気ままに、web系技術に関する情報をお伝えします。</SubTitle>
                        </a>

                    </Link>
                </div>
            </TopBar>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    width: 100%;
    height: 80px;
    margin-bottom: 40px;
`;

const TopBar = styled.div`
    background: #2e9afe;
    display: flex;
    /* justify-content: space-between; */
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 40px;
    .inner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const Title = styled.h1`
    font-size: 24px;
    text-align: center;
    color: #ffffff;
`;

const SubTitle = styled.p`
    font-size: 14px;
    text-align: center;
    color: #ffffff;
`;

export default Header