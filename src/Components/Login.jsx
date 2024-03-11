import { Link, useNavigate } from 'react-router-dom';
import CommonNavbar from '../Shared/CommonNavbar';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();

    //     const handleLogin = e => {
    //         e.preventDefault();
    //         const form = e.target
    //         const email = form.email.value
    //         const password = form.password.value
    //         const user = { email, password };
    //         // console.log(user);
    //         axios.get(`http://localhost:8000/login/${email}`)
    //             .then(data => {
    //                 console.log(data.data.email, data.data.password);
    //                 if (data.data.email!== email) {
    //                    toast.error("password didn't match" );
    //  }
    //                 else {
    //                     console.log(data.data.email, data.data.password);
    //                     localStorage.setItem('User', JSON.stringify(data?.data.email));
    //                     navigate("/dashboard");
    //                 }
    //             })
    //     }

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target
        const name = form.username.value
        const password = form.password.value
        const user = { name, password };
        console.log(user);
        axios.post("http://localhost:8000/login", user)
            .then(data => {
                console.log(data);
                if (!data?.data?.login) {
                    window.alert('please register before sign in');
                }
                else {
                    console.log(data?.data?.login);
                    // setLoading(true);
                    console.log(data?.data);
                    localStorage.setItem('loggedUser', JSON.stringify(data?.data));
                    navigate("/");
                    window.location.reload();
                }
            })
    }

    return (
        <>
            <CommonNavbar />
            <section className='w-full min-h-screen mx-auto py-10'>
                <div className="w-full max-w-md p-8 space-y-3 rounded-xl border bg-white   font-sans mx-auto">
                    <h1 className="text-3xl font-bold text-center text-indigo-600">كىرىش</h1>
                    {/* Input fields and the form started */}
                    <form onSubmit={handleLogin} action="" className="space-y-6">
                        <div className="space-y-2 text-sm">
                            <div className='relative'>
                                <input type="text" name="name" id="username" placeholder="ئەزالىق نام" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end" />
                                <svg className='absolute top-1/2 -translate-y-1/2 left-2' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#1C274C" />
                                    <path d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z" fill="#1C274C" />
                                    <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z" fill="#1C274C" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className='relative'>
                                <input type="password" name="password" id="password" placeholder="پارول" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end" />
                                <svg className='absolute top-1/2 -translate-y-1/2 left-2' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M 7 5 C 3.1545455 5 0 8.1545455 0 12 C 0 15.845455 3.1545455 19 7 19 C 9.7749912 19 12.089412 17.314701 13.271484 15 L 16 15 L 16 18 L 22 18 L 22 15 L 24 15 L 24 9 L 23 9 L 13.287109 9 C 12.172597 6.6755615 9.8391582 5 7 5 z M 7 7 C 9.2802469 7 11.092512 8.4210017 11.755859 10.328125 L 11.988281 11 L 22 11 L 22 13 L 20 13 L 20 16 L 18 16 L 18 13 L 12.017578 13 L 11.769531 13.634766 C 11.010114 15.575499 9.1641026 17 7 17 C 4.2454545 17 2 14.754545 2 12 C 2 9.2454545 4.2454545 7 7 7 z M 7 9 C 5.3549904 9 4 10.35499 4 12 C 4 13.64501 5.3549904 15 7 15 C 8.6450096 15 10 13.64501 10 12 C 10 10.35499 8.6450096 9 7 9 z M 7 11 C 7.5641294 11 8 11.435871 8 12 C 8 12.564129 7.5641294 13 7 13 C 6.4358706 13 6 12.564129 6 12 C 6 11.435871 6.4358706 11 7 11 z"></path>
                                </svg>
                            </div>
                            <div className="flex justify-end text-xs pt-2">
                                <Link to='/forgetPassword' className="hover:underline text-end">
                                    ئاپلا، پارولنى ئۇنتۇپ قالدىم؟
                                </Link>
                            </div>
                        </div>
                        {/* Sign in Button */}
                        <button className="text-lg rounded-xl relative p-[10px] block w-full bg-[#95EFFE] text-black border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group">
                            كىرىش
                            <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
                                Let&apos;s go
                            </span>
                            <span className="bg-indigo-800 absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                            <span className="bg-indigo-800 absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                            <span className="bg-indigo-800 absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                            <span className="bg-indigo-800 absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                        </button>
                    </form>

                    {/* regi in Button */}
                    <Link to='/registration' className="text-lg rounded-xl flex justify-center items-center relative p-[10px] w-full bg-[#FAB345] text-black border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group">
                        تىزىملىتىش
                        <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
                            Let&apos;s go
                        </span>
                        <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
                        </span>
                        <span className="bg-indigo-800 absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                        <span className="bg-indigo-800 absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                        <span className="bg-indigo-800 absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                        <span className="bg-indigo-800 absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default Login