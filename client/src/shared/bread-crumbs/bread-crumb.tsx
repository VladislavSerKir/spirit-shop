import { useTypedSelector } from "../../types";
import useBreadCrumbs from "../../hooks/useBreadCrumbs";
import { useTranslation } from "react-i18next";
import history from "../../utils/history";
import RightArrow from "../../components/right-arrow/right-arrow";

interface IBreadCrumb {
  routeName: string;
  index: number;
}

const BreadCrumb = ({ routeName, index }: IBreadCrumb) => {
  const { t } = useTranslation();
  const pathname = useTypedSelector((state) => state.service.pathname);

  const { generateNewRoute } = useBreadCrumbs(pathname);

  const handleChangeRoute = () => {
    const newRoute = generateNewRoute(index);
    history.push(newRoute);
  };

  return (
    <div className="bread-crumb" onClick={handleChangeRoute}>
      <RightArrow color="var(--first-color)" size={30} />
      <p className="bread-crumb__route">
        {routeName ? t(`${routeName}`) : t(`home`)}
      </p>
    </div>
  );
};

export default BreadCrumb;
