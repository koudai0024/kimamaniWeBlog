import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"

config.autoAddCss = false

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