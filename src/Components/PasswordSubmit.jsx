import CommonNavbar from "../Shared/CommonNavbar";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

const PasswordSubmit = () => {

    const navigate = useNavigate()

    const handleCP = event => {
        event.preventDefault();
        const form = event.target
        const otp = form.otp.value
        const password = form.password.value
        console.log(otp, password);
        axios.post("http://localhost:8000/confirm-reset-password", { otp, password })
            .then(data => {
                if (data) {
                    console.log(data?.data?.status);
                    console.log("data is added to the database");
                }
                navigate("/")
            })
    }

    return (
        <>
            <CommonNavbar />
            <section className='w-full min-h-screen mx-auto py-10'>
                <div className="w-full max-w-md p-8 space-y-3 rounded-xl border bg-white   font-sans mx-auto">
                    <h1 className="text-3xl font-bold text-center text-indigo-600 py-2">تىزىملىتىش</h1>
                    {/* Input fields and the form started */}
                    <form onSubmit={handleCP} className="space-y-7">
                        <div className="space-y-2 text-sm">
                            <div className='relative'>
                                <input type="text" name="otp" placeholder="ئېلخەتكە كەلگەن پارول" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-right" dir="rtl"/>
                                <svg className='absolute top-1/2 -translate-y-1/2 left-2' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 8L8.44992 11.6333C9.73295 12.4886 10.3745 12.9163 11.0678 13.0825C11.6806 13.2293 12.3194 13.2293 12.9322 13.0825C13.6255 12.9163 14.2671 12.4886 15.5501 11.6333L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>   
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className='relative'>
                                <input type="password" name="password" placeholder="يېڭى پارول" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-right" dir="rtl" />
                                <svg className='absolute top-1/2 -translate-y-1/2 left-2' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M 7 5 C 3.1545455 5 0 8.1545455 0 12 C 0 15.845455 3.1545455 19 7 19 C 9.7749912 19 12.089412 17.314701 13.271484 15 L 16 15 L 16 18 L 22 18 L 22 15 L 24 15 L 24 9 L 23 9 L 13.287109 9 C 12.172597 6.6755615 9.8391582 5 7 5 z M 7 7 C 9.2802469 7 11.092512 8.4210017 11.755859 10.328125 L 11.988281 11 L 22 11 L 22 13 L 20 13 L 20 16 L 18 16 L 18 13 L 12.017578 13 L 11.769531 13.634766 C 11.010114 15.575499 9.1641026 17 7 17 C 4.2454545 17 2 14.754545 2 12 C 2 9.2454545 4.2454545 7 7 7 z M 7 9 C 5.3549904 9 4 10.35499 4 12 C 4 13.64501 5.3549904 15 7 15 C 8.6450096 15 10 13.64501 10 12 C 10 10.35499 8.6450096 9 7 9 z M 7 11 C 7.5641294 11 8 11.435871 8 12 C 8 12.564129 7.5641294 13 7 13 C 6.4358706 13 6 12.564129 6 12 C 6 11.435871 6.4358706 11 7 11 z"></path>
                                </svg>
                            </div>
                        </div>
                        {/* Sign in Button */}
                        <button type="submit" className="text-lg rounded-xl relative p-[10px] block w-full bg-[#95EFFE] text-black border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group">
                            يوللاش
                            <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
                                Let&apos;s go
                            </span>
                            <span className="bg-indigo-800 absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                            <span className="bg-indigo-800 absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                            <span className="bg-indigo-800 absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                            <span className="bg-indigo-800 absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default PasswordSubmit;