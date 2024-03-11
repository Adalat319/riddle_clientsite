import { createContext, useEffect, useState } from "react"

export const MyAuthContext = createContext(null);

const AuthContext = ({ children }) => {

    const [user, setUser] = useState(null);
    // const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setLoading(true)
        const storedUser = localStorage.getItem('loggedUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        }
    }, [loading]);



    const elements = {
        user,
        loading,
        setLoading,
        search, setSearch
    }

    return (
        <MyAuthContext.Provider value={elements}>
            {children}
        </MyAuthContext.Provider>
    )
}

export default AuthContext