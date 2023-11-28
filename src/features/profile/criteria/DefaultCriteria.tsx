import {useTranslation} from "react-i18next";
import {useMemo} from "react";
import {useAppSelector} from "../../../app/hooks";
import {allCriteria} from "../../../app/slice/CriteriaSlice";
import "./Criteria.scss"

const DefaultCriteria = () => {

  const { t } = useTranslation();

  const criteria = useAppSelector(allCriteria)
  const data = useMemo(() => criteria.filter((item) => item.default), [criteria])

  return (
    <>
      {
        data.length ?
          <>
            <div className={"default__title"}>{t('profile.criteria.defaultCriteria')}</div>
            <div className={"default"}>
              {data.map((item) =>
                <div key={item.id}>
                  <div><img src={require("../../../_assets/icons/profile/def.svg").default} alt="edit icon"/></div>
                  <div className={"default__item"}>
                    <div className={"default__item__text"}>{item.name}</div>
                    <div className={"default__item__descr"}>{item.description}</div>
                  </div>
                </div>
              )}
            </div>
          </>
          :
          null
      }
    </>
  );
};

export default DefaultCriteria;