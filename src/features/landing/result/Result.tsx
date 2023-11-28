import {useTranslation} from "react-i18next";

import "./Result.scss"

const Result = () => {

  const { t } = useTranslation();

  return (
    <section className={"result-screen"}>
      <div className={"container"}>
        <div className={"result-screen__title"}>{t('landing.result.title')}</div>
        <div className={"result"}>
          <div>
            <img className={"result__img"} src={require(`../../../_assets/icons/resultLanding/item1.png`)} alt={"Overall assessment icon"} />
            <div className={"result__title"}>{t('landing.result.subTitle1')}</div>
          </div>
          <div>
            <img className={"result__img"} src={require(`../../../_assets/icons/resultLanding/item2.png`)} alt={"Assessment for each criterion icon"}/>
            <div className={"result__title"}>{t('landing.result.subTitle2')}</div>
          </div>
          <div>
            <img className={"result__img"} src={require(`../../../_assets/icons/resultLanding/item3.png`)} alt={"Recommendations for each category icon"}/>
            <div className={"result__title"}>{t('landing.result.subTitle3')}</div>
          </div>
          <img className={"result__vector"} src={require(`../../../_assets/vector/success.svg`).default} alt="success"/>
        </div>
      </div>

    </section>
  );
};

export default Result;