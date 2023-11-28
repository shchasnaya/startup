import { useTranslation } from 'react-i18next';
import i18n from '../../localization/i18n';
import cn from 'classnames';
import "./Menu.scss"
import {Link, NavLink} from "react-router-dom";
import {  useLocation } from "react-router";
import {useEffect, useState} from "react";
import Modal from "../modal/Modal";
import Authorization from "../modal/authorization/Authorization";
import Registration from "../modal/registration/Registration";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {logout} from "../../app/API/UserApi";
import ForgetPassword from "../modal/forgetPassword/ForgetPassword";
import ConfirmPassword from "../modal/confirmPassword/ConfirmPassword";

const Menu = () => {

  const { t } = useTranslation();
  const {pathname} = useLocation();

  const dispatch = useAppDispatch()

  const [modalActive, setModalActive] = useState(false)

  const [statusModel, setStatusModal] = useState('')

  const [logoutActive, setLogoutActive] = useState(false)

  const {token, userName} = useAppSelector((state) => state.user)

  useEffect(() => {
    setModalActive(!!statusModel)
  }, [statusModel])

  const [isLanding, setIsLanding] = useState(true)

  useEffect(() => {
    setIsLanding(pathname === '/about')
  }, [isLanding, pathname])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languageUA = i18n.language === 'ua';

  const languageEN = i18n.language === 'en';

  const languageUAClass = cn('', {
    'menu__localization__language': !languageUA,
    'menu__localization__language_active': languageUA,
  });

  const languageENClass = cn('', {
    'menu__localization__language': !languageEN,
    'menu__localization__language menu__localization__language_active': languageEN,
  });

  const handleLogout = () => {
    console.log('test')
    dispatch(logout())
  }

  return (
    <>
      <header>
        <div className={isLanding ? 'back' : 'back back_active'}></div>
        <div className="menu">
          <div className="menu__functions">
            <div>
              <div>
                <Link to={`/about`}>
                <img src={require("../../_assets/icons/logo.png")} alt="logo icons"/>
                </Link>
              </div>
              <div className="menu__localization">
                <div
                  onClick={() => changeLanguage('ua')}
                  className={languageUAClass}>UA</div>
                <div
                  onClick={() => changeLanguage('en')}
                  className={languageENClass}>ENG</div>
              </div>
            </div>
            <div className="menu__navigation">
              <div>{t('header.analise')}</div>
            </div>
          </div>
          {!token
            ?
            <div onClick={() => setStatusModal('auth')}  className="menu__authorization">
              <div className="menu__authorization_text">{t('header.authorization')}</div>
              <div className="menu__authorization_icon">
                {isLanding ? <img src={require("../../_assets/icons/authorization.png")} alt="authorization icon"/>
                  : <img src={require("../../_assets/icons/profile.png")} alt="profile icon"/>}
              </div>
            </div>
            :
            <div className="menu__authorization">
              <NavLink to={'/profile'}>
                <div className={isLanding ? "menu__authorization_text" : "menu__authorization_text menu__authorization_text_black"}>{userName}</div>
              </NavLink>
              <NavLink to={'/profile'}>
                <div className="menu__authorization_icon">
                  {isLanding ? <img src={require("../../_assets/icons/authorization.png")} alt="authorization icon"/>
                    : <img src={require("../../_assets/icons/profile.png")} alt="profile icon"/>}
                </div>
              </NavLink>
              <div className="menu__authorization_logout">
                <div onClick={() => setLogoutActive(!logoutActive)} className="menu__authorization_logout_arrow">
                  {isLanding ? logoutActive
                    ?
                      <img src={require("../../_assets/icons/arrow/white_arrow_top.svg").default} alt="arrow top icon"/>
                    :
                      <img src={require("../../_assets/icons/arrow/white_arrow_down.svg").default} alt="arrow down icon"/>
                    :
                    logoutActive
                    ?
                    <img src={require("../../_assets/icons/arrow/black_arrow_top.svg").default} alt="arrow top icon"/>
                    :
                    <img src={require("../../_assets/icons/arrow/black_arrow_down.svg").default} alt="arrow down icon"/>
                  }
                </div>
                {logoutActive
                  ?
                    <NavLink to={'/about'}><button onClick={() => handleLogout()} className={"menu__authorization_logout_btn"}>
                      {t('header.logout')}
                    </button>
                    </NavLink>
                    :
                    null
                  }
              </div>
            </div>
          }
        </div>
      </header>
      <div>
      <Modal active={modalActive} setActive={setModalActive} setStatusModal={setStatusModal}>
          <Authorization active={statusModel === 'auth' ? modalActive : false} setStatusModal={setStatusModal}/>
          <Registration active={statusModel === 'registration' ? modalActive : false} setStatusModal={setStatusModal}/>
          <ForgetPassword active={statusModel === 'forgetPassword' ? modalActive : false} setStatusModal={setStatusModal}/>
          <ConfirmPassword active={statusModel === 'confirmPassword' ? modalActive : false} setStatusModal={setStatusModal}/>
      </Modal>
      </div>
    </>
  );
};

export default Menu;