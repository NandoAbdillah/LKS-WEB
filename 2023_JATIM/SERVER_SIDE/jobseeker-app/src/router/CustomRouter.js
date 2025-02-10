const { createContext, useState, useEffect, useContext } = require("react");

const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);

    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  });

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

export const Router = ({ path, component: Component }) => {
  const { currentPath } = useRouter();

  const params = matchPath(path, currentPath);
  if(params)  {

    return <Component {...params} />
  }

  return null;
};


const matchPath = (routerPath, currentPath) => {
  const routerParts = routerPath.split("/");
  const currentParts = currentPath.split("/");

  if (routerParts.length !== currentParts.length) return null;


  let params = {}

  for (let i = 0; i < routerParts.length; i++) {
    if(routerParts[i].startsWith(':')) {
        const paramName = routerParts[i].slice(1);
        params[paramName] = currentParts[i];
    } else if(routerParts[i] !== currentParts[i]) {
        return null;
    }
  }

  return params;
};


export const Link = ({to , children}) => {
    const {navigate} = useRouter();

    return (
        <a className="text-decoration-none" href={to}  onClick={(e)=> {
            e.preventDefault();
            navigate(to);
        }} >
            {children}
        </a>
    )
}