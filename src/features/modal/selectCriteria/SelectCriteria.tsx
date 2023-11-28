import "./SelectCriteria.scss"
import {NavLink} from "react-router-dom";
import ButtonFirst from "../../components/button/ButtonFirst";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import React, {FC, useEffect, useMemo, useState} from "react";
import {fetchCriteria} from "../../../app/API/CriteriaAPI";
import Loader from "../../components/loader/Loader";
import {allCriteria} from "../../../app/slice/CriteriaSlice";
import CriteriaRadioBtn from "./radio_btn/CriteriaRadioBtn";
import {criteriaSetIdCriteria} from "../../../app/slice/CriteriaSlice"

type Props = {
  active: boolean
}

const SelectCriteria: FC<Props> = (props) => {

  const {active} = props

  const { t } = useTranslation();

  const dispatch = useAppDispatch()
  const criteria = useAppSelector(allCriteria)
  const {loadingStatus} = useAppSelector((state) => state.criteria)

  const criteriaDef = useMemo(() => criteria.filter((item) => item.default), [criteria])
  const criteriaByMe = useMemo(() => criteria.filter((item) => !item.default), [criteria])

  useEffect(() => {
    if (active) dispatch(fetchCriteria())
  }, [active, dispatch]);

  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionChange = (event: any) => {
    if (event.target.value) {
      setSelectedOption(event.target.value)
      dispatch(criteriaSetIdCriteria(event.target.value))
    }
  };

  return (
    <div className={"select-criteria"}>
      <div className={"select-criteria__title"}>{t('popup.selectCriteria.title')}</div>
      <div className={"select-criteria__description"}>{t('popup.selectCriteria.description')}</div>
      {loadingStatus
        ? <Loader/>
        :
        <>
          <form>
            <div className={"select-criteria__set_title"}>{t('popup.selectCriteria.defaultCriteria')}</div>
            <div className={"select-criteria__divider"}></div>
            {criteriaDef.map((item) =>
            <CriteriaRadioBtn
              value={item.id}
              name={item.id}
              id={item.id}
              description={item.description}
              label={item.name}
              checked={selectedOption === `${item.id}`}
              onChange={handleOptionChange}
              key={item.id}
            />
            )}
            <div className={"select-criteria__set_title"}>{t('popup.selectCriteria.criteriaByMe')}</div>
            <div className={"select-criteria__divider"}></div>
            {criteriaByMe.map((item) =>
              <CriteriaRadioBtn
                value={item.id}
                name={item.id}
                id={item.id}
                description={item.description}
                label={item.name}
                checked={selectedOption === `${item.id}`}
                onChange={handleOptionChange}
                key={item.id}
              />
            )}
          </form>
        </>
      }
      <div className={"select-criteria__mt24"}></div>

      {selectedOption
      ?
        <NavLink to={'/analise'}>
          <ButtonFirst
            text={t('popup.selectCriteria.btn')}
            disable={false}/>
        </NavLink>
      :
        <ButtonFirst
          text={t('popup.selectCriteria.btn')}
          disable={true}
        />
      }

    </div>
  );
};

export default SelectCriteria;