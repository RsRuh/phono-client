import { useEffect, useState } from "react"

const useSellerTik = email => {
    const [getTik, setGetTik] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/user/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsUserLoading(false);
                    if(data.checked === "verified"){
                        setGetTik(true);
                    }
                })
        }
    }, [email])

    return [getTik, isUserLoading]
}

export default useSellerTik;