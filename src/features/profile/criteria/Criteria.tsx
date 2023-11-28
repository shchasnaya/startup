import Menu from "../../menu/Menu";
import Tabs from "../tabs/Tabs";
import CriteriaTable from "./CriteriaTable";
import Loader from "../../components/loader/Loader";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useEffect, useMemo} from "react";
import {fetchCriteria} from "../../../app/API/CriteriaAPI";
import DefaultCriteria from "./DefaultCriteria";
import {useTranslation} from "react-i18next";
import {criteriaCleanState, criteriaSetAction} from "../../../app/slice/CriteriaSlice"
import "./Criteria.scss"
import {allCriteria} from "../../../app/slice/CriteriaSlice";
import {NavLink} from "react-router-dom";


const Criteria = () => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch()
  const {loadingStatus} = useAppSelector((state) => state.criteria)

  useEffect(() => {
    dispatch(fetchCriteria());
    dispatch(criteriaCleanState())
  }, []);

  const setAction = (action: string) => {
    dispatch(criteriaSetAction(action))
  }

  return (
    <div className={"container"}>
      <Menu/>
      <Tabs/>
      {loadingStatus
        ? <Loader/>
        :
        <>
          <DefaultCriteria/>
          <CriteriaTable/>
        </>
      }
      <NavLink onClick={() => setAction('create')}  to={'/set-criteria'}>
        <button className={"criteria__btn"}>
          <img src={require("../../../_assets/icons/profile/plus.svg").default} alt="plus icon"/>
          <div>{t('profile.criteria.button')}</div>
        </button>
      </NavLink>
    </div>
  );
};

export default Criteria;