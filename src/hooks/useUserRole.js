import { useEffect, useState } from "react"

const useUserRole = email => {
    const [getRole, setGetRole] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/user/${email}`)
                .then(res => res.json())
                .then(data => {
                    setGetRole(data.role);
                    setIsUserLoading(false);
                })
        }
    }, [email])

    return [getRole, isUserLoading]
}

export default useUserRole;