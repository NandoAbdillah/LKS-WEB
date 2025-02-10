import {  createContext, useContext, useEffect, useState } from "react";


const RouterContext = createContext();


export const RouterProvider = ({children}) => {

    const [currentPath , setCurrentPath] = useState(window.location.pathname);

    useEffect(()=> {
        const onPopState = () => {
            setCurrentPath(window.location.pathname);
        }

        window.addEventListener('popstate', onPopState);

        return ()=> {
            window.removeEventListener('popstate', onPopState);
        }
    })


    const navigate = (path) => {
        window.history.pushState({}, '', path);
        setCurrentPath(path)
    }

    return (
        <RouterContext.Provider value={{ currentPath, navigate }}>
            {children}
        </RouterContext.Provider>
    )
}

export const useRouter = () => useContext(RouterContext);


export const Route = ({path, component : Component}) => {

    const {currentPath} = useRouter();
     
    const params = matchPath(path, currentPath);

    if(params) {
        return <Component {...params} />
    }

    return null;
}

const matchPath = (routePath, currentPath) => {
    const routeParts = routePath.split('/');
    const currentParts = currentPath.split('/');

    if (routeParts.length !== currentParts.length) {
        return null
    }

    let params = {}

    for(let i =0; i<routeParts.length; i++) {
        if(routeParts[i].startsWith(':')) {
           const paramName = routeParts[i].slice(1);
           params[paramName] = currentParts[i];
        } else if(routeParts[i] !== currentParts[i]) {
            return null
        }
    }

    return params;
}


export const Link = ({to, children}) => {
    const {navigate} = useRouter();

    return (
        <a href={to} className=" text-decoration-none text-black" onClick={(e)=> {
            e.preventDefault();
            navigate(to)
        }}>
            {children}
        </a>
    );
}