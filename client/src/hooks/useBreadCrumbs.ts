const useBreadCrumbs = (pathname: string) => {
  let arrayOfRoutes = pathname.split("/");

  const getRoutes = (): Array<string> => {
    if (arrayOfRoutes[arrayOfRoutes.length - 1] === "") {
      arrayOfRoutes.pop();
    }
    return arrayOfRoutes;
  };

  const generateNewRoute = (index: number) => {
    arrayOfRoutes.splice(index + 1);
    return arrayOfRoutes.join("/");
  };

  return { getRoutes, generateNewRoute };
};

export default useBreadCrumbs;
