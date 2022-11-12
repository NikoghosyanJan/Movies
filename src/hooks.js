import { useEffect, useState } from "react"
import { API_URL } from "./constants"

export function useFetch(url){
    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await fetch(API_URL + url);
                    const json = await response.json()
                    setData(json)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url])

    return { data, error, loading }

}