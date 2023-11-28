import {useTranslation} from "react-i18next";

import "./Audience.scss"
import ItemAudience from "./ItemAudience";

const Audience = () => {

  const { t } = useTranslation();

  const items = t('landing.audience.items')

  return (
    <section className={"audience-section"}>
      <div className={"container"}>
        <div className={"audience-section__title"}>{t('landing.audience.title')}</div>

        <div className={"audience"}>
          {items.map((item: string, index: number) => <ItemAudience key={index} text={item} index={index}/>)}
          <img className={"audience__img"} src={require(`../../../_assets/vector/audience.svg`).default} alt="audience"/>
        </div>
      </div>
    </section>
  );
};

export default Audience;