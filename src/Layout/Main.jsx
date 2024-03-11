
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

const Main = () => {
    return (
        <>
           
            <Outlet />
            <Footer />
        </>
    )
}

export default Main