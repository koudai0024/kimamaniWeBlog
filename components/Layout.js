import Header from './Header'
import Footer from './Footer'

const Layout = (props) => {
    return (
        <div>
            <Header />
            <div className="content-wrap">
                {props.children}
            </div>
            <Footer/> 
        </div>
    )
}

export default Layout