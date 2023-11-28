import {useTranslation} from "react-i18next";
import "./Tabs.scss"
import {Link, Navigate, NavLink, Route, Routes} from "react-router-dom";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";

const Tabs = () => {

  const { t } = useTranslation();

  const {pathname} = useLocation();

  const [isAbout, setIsAbout] = useState(true)
  const [isStatistic, setIsStatistic] = useState(true)
  const [isCriteria, setIsCriteria] = useState(true)

  useEffect(() => {
    setIsAbout(pathname === '/profile/about')
    setIsStatistic(pathname === '/profile/statistic')
    setIsCriteria(pathname === '/profile/criteria')
  }, [pathname])

  return (
    <div className={"tabs"}>
      <NavLink to={'/profile/about'}>
        <button className={isAbout ? 'tabs__btn tabs__btn_active' : 'tabs__btn'}>{t('profile.tab1')}</button>
      </NavLink>
      <NavLink to={'/profile/statistic'}>
        <button className={isStatistic ? 'tabs__btn tabs__btn_active' : 'tabs__btn'}>{t('profile.tab2')}</button>
      </NavLink>
      <NavLink to={'/profile/criteria'}>
        <button className={isCriteria ? 'tabs__btn tabs__btn_active' : 'tabs__btn'}>{t('profile.tab3')}</button>
      </NavLink>
    </div>
  );
};

export default Tabs;