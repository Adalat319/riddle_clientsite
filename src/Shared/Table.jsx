/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useContext, useState, useEffect } from 'react'
import useCategories from '../Hooks/useCategories';
import Swal from 'sweetalert2';
import useRiddle from '../Hooks/useRiddle';
import { MyAuthContext } from '../Context/AuthContext';

const Table = ({ type, users }) => {
    const storedUser = localStorage.getItem('loggedUser');

    const user = (JSON.parse(storedUser));

    console.log(user?.role);

    const { categories, categoriesRefetch } = useCategories()
    const { search } = useContext(MyAuthContext);
    const { data, refetch } = useRiddle()
    const [openModal, setOpenModal] = useState(false);
    const [allcategories, setAllCategories] = useState([])

    useEffect(() => {
        const getAllCat = async () => {
            const res = await axios.get('https://tilrawan-new-0fc4cea36279.herokuapp.com/allcategories');
            setAllCategories(res.data?.data)
        }
        getAllCat();
    }, [])

    console.log(allcategories);

    const [adminRiddle, setAdminriddle] = useState([])
    useEffect(() => {
        const getAllCat = async () => {
            const res = await axios.get('https://tilrawan-new-0fc4cea36279.herokuapp.com/allRiddle');
            console.log(res.data);
            setAdminriddle(res.data?.data)
        }
        getAllCat();
    }, [])

    console.log(adminRiddle);

    const filteredData = (user?.role === 'admin' ? allcategories : categories?.data)?.filter(item =>
        item.categoryTitle.toLowerCase().includes(search.toLowerCase())
    );

    const filteredUser = users?.filter(item =>
        item.email.toLowerCase().includes(search.toLowerCase())
    );

    const filteredRiddles = (user?.role === 'admin' ? adminRiddle : data?.data)?.filter(item =>
        item?.riddle?.title1?.toLowerCase().includes(search.toLowerCase()) ||
        item?.riddle?.title2?.toLowerCase().includes(search.toLowerCase()) ||
        item?.riddle?.title3?.toLowerCase().includes(search.toLowerCase()) ||
        item?.riddle?.title4?.toLowerCase().includes(search.toLowerCase()) ||
        item?.category.toLowerCase().includes(search.toLowerCase()) ||
        item?.answer.toLowerCase().includes(search.toLowerCase()) ||
        item?.explanation.toLowerCase().includes(search.toLowerCase())
    );

    //post riddles
    const handleSubmit = async (e) => {
        e.preventDefault();

        const title1 = e.target.title1.value;
        const title2 = e.target.title2.value;
        const title3 = e.target.title3.value;
        const title4 = e.target.title4.value;
        const category = e.target.category.value
        const answer = e.target.answer.value
        const explanation = e.target.explanation.value
        const storedUser = localStorage.getItem('loggedUser');

        console.log(storedUser);
        if (storedUser) {
            const user = (JSON.parse(storedUser));
            const riddleData = { title1, title2, title3, title4, category, answer, explanation, email: user.email }
            console.log(riddleData);
            try {
                const response = await axios.post('https://tilrawan-new-0fc4cea36279.herokuapp.com/add/riddles', riddleData);
                console.log(response.data);
                if (response.data.message === "successful") {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "يېڭى تېپىشماق قوشۇلدى",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                setOpenModal(false);
                window.location.reload()
            } catch (error) {
                console.error('Error:', error);
            }

        }
        // const riddleData ={title, category, answer, explanation, email:user}

    };
    //post categories
    const [categoryTitle, setCategoryTitle] = useState('');
    const [image, setImage] = useState(null);

    const handleCategoryAdd = async (e) => {
        e.preventDefault();
        const storedUser = localStorage.getItem('loggedUser');
        const user = (JSON.parse(storedUser));
        if (user) {
            try {
                const formData = new FormData();
                formData.append('categoryTitle', categoryTitle);
                formData.append('image', image);
                formData.append('email', user?.email);
                const response = await axios.post("https://tilrawan-new-0fc4cea36279.herokuapp.com/add/category", formData);
                categoriesRefetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "يېڭى تۈر قوشۇلدى",
                    showConfirmButton: false,
                    timer: 1500
                });
                setOpenModal(false);
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }

    };
    //handleDeleteRiddle
    const handleDeleteRiddle = async (riddleId) => {
        try {

            const response = await axios.delete(`https://tilrawan-new-0fc4cea36279.herokuapp.com/riddle/delete/${riddleId}`);
            console.log(response.data);
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "تېپىشماق ئ‍ۆچۈرۈلدى",
                showConfirmButton: false,
                timer: 1500
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting riddle:', error);
        }
    };
    //handleDeletecategory
    const handleDeleteCategory = async (CategoryId) => {
        try {

            const response = await axios.delete(`https://tilrawan-new-0fc4cea36279.herokuapp.com/category/delete/${CategoryId}`);
            console.log(response.data);
            categoriesRefetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "تۈر ئۆچۈرۈلدى",
                showConfirmButton: false,
                timer: 1500
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    //edit form
    const [openModals, setOpenModals] = useState(false);
    const [selectedRiddle, setSelectedRiddle] = useState(null);

    const editData = (_id, editedData) => {
        setSelectedRiddle(editedData);
        setOpenModals(true)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get the _id of the selected riddle
            const riddleId = selectedRiddle?._id;
            console.log(riddleId);
            const updatedData = {
                title1: e.target.title1.value || selectedRiddle?.title1,
                title2: e.target.title2.value || selectedRiddle?.title2,
                title3: e.target.title3.value || selectedRiddle?.title3,
                title4: e.target.title4.value || selectedRiddle?.title4,
                category: e.target.category.value,
                answer: e.target.answer.value,
                explanation: e.target.explanation.value,
            };

            // Send PATCH request to update the riddle
            const response = await axios.patch(`https://tilrawan-new-0fc4cea36279.herokuapp.com/update/riddles/${riddleId}`, updatedData);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "تۈزۈتۈلدى",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
            window.location.reload();

        } catch (error) {
            console.error(error);
            // Handle errors (e.g., show an error message to the user)
        }
    };

    //---------------------------------------update category----------------------------

    const [openModalCategory, setOpenModalCategory] = useState(false);
    const [selectCategory, setSelectCategory] = useState(null);

    const editCategory = (_id, editedData) => {
        setSelectCategory(editedData);
        setOpenModalCategory(true)
    }

    const handleCategoryUpdate = async (e) => {
        e.preventDefault();

        try {
            const categoryId = selectCategory._id;
            console.log(categoryId);// Replace with the actual category ID
            const categoryTitle = e.target.elements.categoryTitle.value;
            const image = e.target.elements.image.files[0];

            // Create FormData to handle file upload
            const formData = new FormData();
            formData.set('categoryTitle', categoryTitle);
            formData.set('image', image);

            // Make axios.patch request
            const response = await axios.patch(`https://tilrawan-new-0fc4cea36279.herokuapp.com/update/category/${categoryId}`, formData);

            categoriesRefetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "تۈزۈتۈلدى",
                showConfirmButton: false,
                timer: 1500
            });
            window.location.reload();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    // ---------------dlt user----------
    const handleUser = async (id) => {
        try {

            console.log(id);

            const response = await axios.delete(`https://tilrawan-new-0fc4cea36279.herokuapp.com/user/delete?id=${id}`);
            const users = users.filter(user => user.id !== id);
            console.log(response.data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "ئەزا ئۆچۈرۈلدى",
                showConfirmButton: false,
                timer: 1500
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }


    return (
        <div className="overflow-x-auto ">
            <table className="table table-zebra">
                {/* head */}
                <thead className='bg-black text-white'>
                    {
                        type === 'users' && <tr className='text-lg text-center'>
                            <th>بۇيرۇق</th>
                            <th>ئېلخەت</th>
                            <th>ئىسىم</th>
                            <th>نومۇر</th>
                        </tr>
                    }
                    {
                        type === 'division' && <tr className='text-lg text-center'>
                            <th>بۇيرۇق</th>
                            <th>رەسىم</th>
                            <th>تۈر</th>
                            
                        </tr>
                    }
                    {
                        type === 'riddle' && <tr className='text-lg text-center'>
                            <th>بۇيرۇق</th>
                            <th>ئىزاھات</th>
                            <th>جاۋاب</th>
                            <th>تېپىشماق</th>
                            <th>تۈر</th>
                            
                            
                        </tr>
                    }
                </thead>
                <tbody>
                    {
                        type === 'users' && (filteredUser?.length > 0 ? filteredUser : users)?.map((user, index) =>
                            <tr key={index} className='text-center'>
                                <td className='flex justify-center items-center gap-4'>
                                    <button onClick={() => handleUser(user._id)} className='bg-[#FAB345] text-red-500 px-8 py-2 rounded-full'>ئۆچۈرۈش</button>
                                </td>
                                <td>{user?.email}</td>
                                <td>{user?.name}</td>
                                <th>{index + 1}</th>
                            </tr>
                        )
                    }
                    {/* row 2 */}
                    {type === 'division' && (filteredData?.length > 0 ? filteredData : user?.role === 'admin' ? allcategories : categories?.data)?.map(category => (
                        <tr key={category._id} className='text-center'>
                            <td className='flex justify-center items-center gap-4'>
                                {
                                    user?.role === 'admin' && <button onClick={() => handleDeleteCategory(category?._id)} className='bg-[#FAB345] text-red-500 px-8 py-2 rounded-lg'>ئۆچۈرۈش</button>
                                }
                                {/* <button   className='bg-[#01D9FE] text-white px-8 py-2 rounded-full'>تۈزىتىش</button> */}
                                <div className="mx-auto flex items-center justify-center">
                                    <button onClick={() => editCategory(category._id, category)} className="bg-[#0095FF] text-white p-2 rounded-lg">تۈزىتىش</button>
                                    <div className={`fixed flex justify-center items-center z-[100] ${openModalCategory ? 'visible opacity-1' : 'invisible opacity-0'} inset-0 backdrop-blur-sm bg-black/20 duration-100`}>
                                        <div className={`absolute max-w-md p-4 text-center bg-white drop-shadow-2xl rounded-lg ${openModalCategory ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
                                            <svg onClick={() => setOpenModalCategory(false)} className="w-8 mx-auto mr-0 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#c51636"></path></g></svg>
                                            <form onSubmit={handleCategoryUpdate} className='pb-10 space-y-5'>
                                                <input type="text" name="categoryTitle"
                                                    defaultValue={selectCategory ? selectCategory.categoryTitle : ''}
                                                    placeholder="تۈر"
                                                    className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"
                                                    style={{ direction: 'rtl', textAlign: 'right' }}
                                                />

                                                <input type="file"
                                                    name="رەسىم"
                                                    defaultValue={selectCategory ? selectCategory.image : ''}
                                                    placeholder="تۈر" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end" />
                                                <button type='submit' className='py-2 px-8 border border-black rounded-xl'> قوشۇش</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <th>{category.image}</th>
                            <td>{category.categoryTitle}</td>
                            
                        </tr>
                    ))
                    }

                    {/* row 3 */}
                    {
                        type === 'riddle' && (filteredRiddles?.length > 0 ? filteredRiddles : user?.role === 'admin' ? adminRiddle : data?.data)?.map(riddles => (
                            <tr key={riddles._id} className='text-center'>
                                <td className='flex justify-center items-center gap-4'>
                                    {
                                        user?.role === 'admin' && <button onClick={() => handleDeleteRiddle(riddles._id)} className='bg-[#FAB345] text-red-500 px-8 py-2 rounded-lg'>ئۆچۈرۈش</button>
                                    }
                                    {/* update form information  */}
                                    <div className="w-72 mx-auto flex items-center justify-center">
                                        <button onClick={() => editData(riddles._id, riddles)} className="bg-[#0095FF] text-white p-2 rounded-lg">تۈزىتىش</button>
                                        <div className={`fixed flex justify-center items-center z-[100] ${openModals ? 'visible opacity-1' : 'invisible opacity-0'} inset-0 backdrop-blur-sm bg-black/20 duration-100`}>
                                            <div className={`absolute max-w-md p-4 text-center bg-white drop-shadow-2xl rounded-lg ${openModals ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
                                                <svg onClick={() => setOpenModals(false)} className="w-8 mx-auto mr-0 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#c51636"></path></g></svg>
                                                <form onSubmit={handleFormSubmit} className='pb-10 space-y-5'>
                                                    <h1>يېڭى تېپىشماق قوشۇش</h1>
                                                    <input
                                                        type="text"
                                                        name="title1"

                                                        defaultValue={selectedRiddle ? selectedRiddle?.title1 : ''}
                                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"
                                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                                    />
                                                    <input
                                                        type="text"
                                                        name="title2"

                                                        defaultValue={selectedRiddle ? selectedRiddle?.title2 : ''}
                                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"
                                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                                    />
                                                    <input
                                                        type="text"
                                                        name="title3"

                                                        defaultValue={selectedRiddle ? selectedRiddle?.title3 : ''}
                                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"
                                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                                    />
                                                    <input
                                                        type="text"
                                                        name="title4"

                                                        defaultValue={selectedRiddle ? selectedRiddle?.title4 : ''}
                                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"
                                                    />
                                                    <select
                                                        name="category"
                                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"
                                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                                    >
                                                        {allcategories && allcategories?.map((category) => (
                                                            console.log(category),
                                                            <option key={category._id} defaultValue={selectedRiddle ? selectedRiddle.category.category : ""}>
                                                                {category.categoryTitle}
                                                            </option>
                                                        ))}

                                                    </select>
                                                    <input
                                                        type="text"
                                                        name="answer"

                                                        defaultValue={selectedRiddle ? selectedRiddle.answer : ""}
                                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"
                                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                                    />
                                                    <input
                                                        type="text"
                                                        name="explanation"

                                                        defaultValue={selectedRiddle ? selectedRiddle.explanation : ""}
                                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"
                                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                                    />
                                                    <div className='flex justify-center items-center gap-5'>
                                                        <button type='submit' className='py-2 px-8 border bg-gray-200 rounded-xl'>تامام</button>
                                                        <button type='submit' className='py-2 px-8 border bg-gray-500 rounded-xl'>قوشۇش</button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </td>
                                
                                <th>{riddles.explanation}</th>
                                <th>{riddles.answer}</th>
                                <td>{`${riddles.title1 || ''} ${riddles.title2 || ''} ${riddles.title3 || ''} ${riddles.title4 || ''}`}</td>
                                <th>{riddles.category}</th>
                              
                            </tr>))
                    }


                </tbody>
            </table>
            {
                type === 'division' && <button onClick={() => setOpenModal({ click: true, message: 'division' })}
                    className='flex justify-center items-center gap-4 my-5 bg-green-600 px-8 py-1 rounded-lg mx-10 text-white '>
                    <h1 className='text-lg font-bold'>+</h1>
                    <h1>يېڭى تۈر قوشۇش</h1>
                </button>
            }
            {
                type === 'riddle' && <button onClick={() => setOpenModal({ click: true, message: 'riddle' })}
                    className='flex justify-center items-center m-5 gap-4 bg-green-600 px-8 py-1 rounded-lg mx-10 text-white '>
                    <h1 className='text-lg font-bold'>+</h1>
                    <h1>يېڭى تېپىشماق قوشۇش</h1>
                </button>
            }
            {/*----------------------------------- Category add form ------------------------- */}
            {
                openModal?.click && <div className="lg:w-64 mx-auto lg:px-10 flex items-center justify-center">
                    <div className={`fixed flex justify-center items-center z-[100] ${openModal ? 'visible opacity-1' : 'invisible opacity-0'} inset-0 backdrop-blur-sm bg-black/20 duration-100`}>
                        <div className={`absolute max-w-md p-4 text-center bg-white drop-shadow-2xl rounded-lg ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
                            <svg onClick={() => setOpenModal(false)} className="w-8 mx-auto mr-0 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#c51636"></path></g></svg>
                            {
                                openModal?.message === 'division' &&
                                <form onSubmit={handleCategoryAdd} className='pb-10 space-y-5'>
                                    <input type="text" name="categoryTitle" onChange={(e) => setCategoryTitle(e.target.value)} placeholder="تۈر" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end" />
                                    <input type="file"
                                        name="image"
                                        onChange={(e) => setImage(e.target.files[0])}

                                        placeholder="تۈر" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end" />
                                    <button type='submit' className='py-2 px-8 border border-black rounded-xl'> قوشۇش</button>
                                </form>
                            }

                            {/*----------------------------------- Riddle add form ------------------------- */}
                            {
                                openModal?.message === 'riddle' &&
                                <form onSubmit={handleSubmit} className='pb-10 space-y-5'>
                                    <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>يېڭى تېپىشماق قوشۇش</h1>
                                    <p style={{ fontSize: '1rem', direction:'rtl'}}> شېئىرىي تېپىشماقلارنىڭ ھەربىر مىسراسىنى ئايرىم تولدۇرۇڭ.</p>
                                    <input
                                        type="text"
                                        name="title1"
                                        placeholder="تېپىشماق (شېئىرىي تېپىشماقنىڭ بىرىنچى مىسراسى)"
                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"
                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                    />
                                    <input
                                        type="text"
                                        name="title2"
                                        placeholder="شېئىرىي تېپىشماقنىڭ ئىككىنچى مىسراسى"
                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"
                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                    />
                                    <input
                                        type="text"
                                        name="title3"
                                        placeholder="شېئىرىي تېپىشماقنىڭ ئۈچىنچى مىسراسى:"
                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"
                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                    />
                                    <input
                                        type="text"
                                        name="title4"
                                        placeholder="شېئىرىي تېپىشماقنىڭ تۆتىنچى مىسراسى:"
                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"
                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                    />
                                    <select
                                        name="category"
                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring text-end"

                                    >
                                        <option value="">تۈر:</option>
                                        {allcategories && allcategories?.map((category) => (
                                            console.log(allcategories),
                                            <option key={category._id}>
                                                {category.categoryTitle}
                                            </option>
                                        ))}
                                        {console.log(categories.data)}
                                    </select>
                                    <input
                                        type="text"
                                        name="answer"
                                        placeholder="جاۋاب:"
                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                    />
                                    <input
                                        type="text"
                                        name="explanation"
                                        placeholder="ئىزاھات:"
                                        className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                                        style={{ direction: 'rtl', textAlign: 'right' }}
                                    />
                                    <div className='flex justify-center items-center gap-5'>
                                        <button type='submit' className='py-2 px-8 border bg-gray-200 rounded-xl'>تامام</button>
                                        <button type='submit' className='py-2 px-8 border bg-gray-500 rounded-xl'>قوشۇش</button>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Table