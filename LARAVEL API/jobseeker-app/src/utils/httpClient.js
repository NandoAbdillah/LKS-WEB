import { cache } from "react";

export const httpClient = async (url, {method = 'GET', body, token} = {}) => {

    const headers = new Headers({
        'Content-Type' : 'application/json;charset=UTF-8',
        'Accept' : 'application/json'
    });

    if(token) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    const options = {
        method, 
        headers,
        body : body ? JSON.stringify(body) : undefined,
        mode : 'cors',
        cache : 'no-cache',
    }

   

    try {
        const response = await fetch(url, options);
        
        let data;
        try {
           data = await response.json();
        } catch {
            data = await response.text();
        }

        if(!response.ok) {
            throw {
                status : response.status,
                message : data.message || data || 'Unknown Error',
                violations : data.violations || {}
            }
        }

        return {
            status : response.status,
            message : data.message || "Success",
            data
        }
    }  catch (error) {
        
        throw {
            status : error.status || 500,
            message : error.message || 'Internal Server Error',
            violations : error.violations || {}
        }
    }


}