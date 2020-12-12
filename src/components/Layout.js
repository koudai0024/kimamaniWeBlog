import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'

const Layout = (props) => {
    return (
        <div>
            <Header />
            <ContentWrap>
                {props.children}
            </ContentWrap>
            <Footer/> 
        </div>
    )
}

const ContentWrap = styled.div`
    min-height: 90vh;
`;

export default Layout