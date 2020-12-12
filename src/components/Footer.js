import styled from 'styled-components'

const Footer = () => {
    return (
        <FooterContainer>
            <small className="copy">&copy; 2020 気ままにWeBlog</small>
        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    background: #000;
    .copy {
        font-size: 14px;
        text-align: center;
        color: #ffffff;
    }
`;

export default Footer