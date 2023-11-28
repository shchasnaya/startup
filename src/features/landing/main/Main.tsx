import {useTranslation } from 'react-i18next';

import Menu from "../../menu/Menu";
import "./Main.scss"
import Modal from "../../modal/Modal";
import {useState} from "react";
import SelectCriteria from "../../modal/selectCriteria/SelectCriteria";


const Main = () => {

  const { t } = useTranslation();

  const [modalActive, setModalActive] = useState(false)

  const [statusModel, setStatusModal] = useState('')

  return (
    <section className="main-screen">
      <div className="container">
        <Menu/>
        <div className="main">
          <div>
            <div className="main__title">{t('landing.main.title')}</div>
            <div className="main__description">{t('landing.main.description')}</div>
          </div>
          <button onClick={() => setModalActive(true)} className="main__btn">{t('landing.main.button')}</button>
          <div className="main__statistic">
            <div>
              <div className="main__statistic__title">{t('landing.main.countAll')}</div>
              <div className="main__statistic__count">1548</div>
            </div>
            <div>
              <div className="main__statistic__title">{t('landing.main.countAverage')}</div>
              <div className="main__statistic__count">4.8</div>
            </div>
          </div>
        </div>

        <img className="main-screen__img main-screen__img_best" src={require("../../../_assets/vector/best.svg").default}
             alt="best icon"/>
        <img className="main-screen__img main-screen__img_plan" src={require("../../../_assets/vector/plan.svg").default}
             alt="best icon"/>
        <img className="main-screen__img main-screen__img_idea" src={require("../../../_assets/vector/idea.svg").default}
             alt="best icon"/>
        <img className="main-screen__img main-screen__img_background" src={require("../../../_assets/background/main.jpg")}
             alt="friends background image"/>

      </div>
      <Modal active={modalActive} setActive={setModalActive} setStatusModal={setStatusModal}>
        <SelectCriteria active={modalActive} />
      </Modal>
    </section>
  );
};

export default Main;