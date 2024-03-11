import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

function CommonNavbar() {
    return (
        <nav className='w-full mx-auto bg-[#95EFFE] px-10 py-4'>
            <div className='max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-5 justify-between items-center'>

                {/* logo text */}
                <div className="mx-auto max-w-[1000px] space-y-4">
                    <h1 className='text-[32px] font-bold text-center' style={{ direction: 'rtl', textAlign: 'right' }}>ئەسسالامۇئەلەيكۇم، ئۇيغۇر بالىلار تېپىشماقلىرى توربېتىگە خۇش كەلدىڭىز!</h1>
                </div>
                {/* logo */}
                <Link to='/'>
                    <img src={logo} alt="logo" className='h-32 mx-auto pt-5' />
                </Link>
            </div>
        </nav>
    )
}
export default CommonNavbar