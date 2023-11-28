import {useTranslation} from "react-i18next";

import "./HowWork.scss"

const HowWork = () => {

  const { t } = useTranslation();

  return (
    <section className={"work"}>
      <div className={"container"}>
        <div className={"text"}>
          <div className={"text__title"}>{t('landing.howWork.title')}</div>
          <div className={"text__description"}>{t('landing.howWork.description')}</div>
          <img className={"text__img"} src={require("../../../_assets/icons/howWork/bulb.png")}
               alt="bulb icon image"/>
        </div>
        <div className={"step"}>

          <div>
            <div>
              <img className={"step__img step__img_icon"} src={require("../../../_assets/icons/howWork/icon1.png")}
                      alt="registration icon"/>
            </div>
            <div className={"step__title"}>{t('landing.howWork.subTitle1')}</div>
            <img className={"step__img_go"} src={require("../../../_assets/icons/howWork/go.png")}
                 alt="Go icon image"/>
            <div className={"step__footer"}>
              <div>
                <div className={"step__footer__line step__footer__line_active"}></div>
                <div className={"step__footer__line"}></div>
                <div className={"step__footer__line"}></div>
              </div>
              <div className={"step__footer__number"}>{t('landing.howWork.step1')}</div>
            </div>
          </div>
          <div>
            <div>
              <img className={"step__img step__img_icon"} src={require("../../../_assets/icons/howWork/icon2.png")}
                   alt="analise icon"/>
            </div>
            <div className={"step__title step__title_center"}>{t('landing.howWork.subTitle2')}</div>
            <div className={"step__description"}>{t('landing.howWork.subDescription2')}</div>
            <div className={"step__footer"}>
              <div>
                <div className={"step__footer__line"}></div>
                <div className={"step__footer__line step__footer__line_active"}></div>
                <div className={"step__footer__line"}></div>
              </div>
              <div className={"step__footer__number"}>{t('landing.howWork.step2')}</div>
            </div>

          </div>
          <div>
            <div>
              <img className={"step__img step__img_icon"} src={require("../../../_assets/icons/howWork/icon3.png")}
                   alt="result icon"/>
            </div>
            <div className={"step__title"}>{t('landing.howWork.subTitle3')}</div>

            <div className={"step__footer"}>
              <div>
                <div className={"step__footer__line"}></div>
                <div className={"step__footer__line"}></div>
                <div className={"step__footer__line step__footer__line_active"}></div>
              </div>
              <div className={"step__footer__number"}>{t('landing.howWork.step3')}</div>
            </div>
          </div>
          <img className="step__img step__img_progress" src={require("../../../_assets/vector/progress.svg").default}
               alt="Progress vector "/>
          <img className="step__img step__img_investment" src={require("../../../_assets/vector/investment.svg").default}
               alt="Investment vector "/>
        </div>
      </div>
    </section>
  );
};

export default HowWork;