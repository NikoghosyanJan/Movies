import { API_URL } from "./constants";

export async function getData(url){
    try{
        const response = await fetch(API_URL + url);
        const json = await response.json()
        return json
    }catch(err){
        return err
    }
}