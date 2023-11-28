import React, {useEffect, useMemo, useState} from "react";
import Menu from "../../menu/Menu";
import {fetchParameter, fetchParameterById} from "../../../app/API/ParameterApi";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {criteriaSetAction, criteriaSetIdCriteria, criteriaSetStatus} from "../../../app/slice/CriteriaSlice";
import ParameterList from "./components/ParameterList";
import {ParameterModel} from "../../../app/model/ParameterModel";
import Loader from "../../components/loader/Loader";
import ButtonThird from "../../components/button/ButtonThird";
import ButtonSecond from "../../components/button/ButtonSecond";
import Progress from "../components/progress/Progress";
import {useTranslation} from "react-i18next";
import "./SetCriteria.scss"
import Modal from "../../modal/Modal";
import CreateCriteria from "../../modal/createCriteria/CreateCriteria";
import {allParameter} from "../../../app/slice/ParameterSlice";

const SetCriteria = () =>  {

  const { t } = useTranslation();

  const dispatch = useAppDispatch()
  const {loadingStatus, selected, criteria} = useAppSelector((state) => state.parameter)
  const {action, idCriteria, status} = useAppSelector((state) => state.criteria)
  const parameter = useAppSelector(allParameter)

  const [activeSet, setActiveSet] = useState(0)

  const [isSelected, setIsSelected] = useState(true)

  const [modalActive, setModalActive] = useState(false)

  const [statusModel, setStatusModal] = useState('')

  const [disabledCheckBox, setDisabledCheckBox] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (action === 'create') localStorage.setItem('actionSet', 'create');
    else if (action === 'update') {
      localStorage.setItem('actionSet', 'update');
      localStorage.setItem('idCriteria', idCriteria)
    }
    else {
      dispatch(criteriaSetAction(localStorage.getItem('actionSet')))
      dispatch(criteriaSetIdCriteria(localStorage.getItem('idCriteria')))
    }
    if (action === 'create') {
      if (!modalActive) dispatch(criteriaSetStatus('none'))
      dispatch(fetchParameter())
    } else if (action === 'update') {
      dispatch(fetchParameter()).then(() => dispatch(fetchParameterById(idCriteria)))
    }
  }, [action, dispatch, idCriteria]);


  useEffect(() => {
    if (!!status) localStorage.setItem('status', status);
    else dispatch(criteriaSetStatus(localStorage.getItem('status')))
    if (!modalActive && status === 'isCreate') dispatch(criteriaSetStatus('none'))
    if (status === 'isUpdate') {
      setDisabledCheckBox(true)
    }
    else setDisabledCheckBox(false)
  }, [status, modalActive])

  const plusActiveSet = () => {
    setActiveSet(activeSet + 1)
    scrollToTop()
  }

  const minusActiveSet = () => {
    setActiveSet(activeSet - 1)
    scrollToTop()
  }

  const calculateSet = (numberSet: number, parameter: ParameterModel[]) => {
    const newSet = new Array<ParameterModel>();
    parameter.forEach((item, index) => {
      if (index === numberSet) newSet.push(item)
    })
    return newSet
  }

  const dataSet0 = useMemo(() => calculateSet(0, parameter), [parameter])
  const dataSet1 = useMemo(() => calculateSet(1, parameter), [parameter])
  const dataSet2 = useMemo(() => calculateSet(2, parameter), [parameter])
  const dataSet3 = useMemo(() => calculateSet(3, parameter), [parameter])
  const dataSet4 = useMemo(() => calculateSet(4, parameter), [parameter])

  const namesSet = useMemo(() => parameter.map((item) => item.name), [parameter])

  const createParameter = () => {
    if (status === 'isUpdate') return
    if (selected.length > 0) {
      setModalActive(true)
      setIsSelected(true)
    }
    else setIsSelected(false)
  }

  return (
    <>
      <div className={"container"}>
        <Menu/>
        <div className={"parameter__title"}>{action === 'update' ? `${t('setParameter.titleUpdate')} "${criteria.name}"` : t('setParameter.title')}</div>
        <Progress activeSet={activeSet} names={namesSet}/>
        {
          loadingStatus ? <Loader/> :
            activeSet === 0 ? <ParameterList criteriaArray={dataSet0} hidden={false} disabled={disabledCheckBox}/> : null
        }
        {activeSet === 1 ? <ParameterList criteriaArray={dataSet1} hidden={false} disabled={disabledCheckBox}/> : null}
        {activeSet === 2 ? <ParameterList criteriaArray={dataSet2} hidden={false} disabled={disabledCheckBox}/> : null}
        {activeSet === 3 ? <ParameterList criteriaArray={dataSet3} hidden={false} disabled={disabledCheckBox}/> : null}
        {activeSet === 4 ? <ParameterList criteriaArray={dataSet4} hidden={false} disabled={disabledCheckBox}/> : null}

        <div className={activeSet === 0 ? "parameter__navigation parameter__navigation_right" : "parameter__navigation parameter__navigation"}>
          <div
            onClick={() => minusActiveSet()}
            className={activeSet === 0 ? "parameter__navigation__btn parameter__navigation__btn_hidden" : "parameter__btn__navigation"}>
            <ButtonSecond text={t('setParameter.btnPrevious')} disable={false}/>
          </div>
          <div
            onClick={() => plusActiveSet()}
            className={activeSet === (parameter.length - 1) ? "parameter__navigation__btn parameter__navigation__btn_hidden" : "parameter__btn__navigation"}>
            <ButtonThird text={t('setParameter.btnNext')} disable={false}/>
          </div>
          <div
              onClick={() => createParameter()}
              className={activeSet !== (parameter.length - 1) ? "parameter__navigation__btn parameter__navigation__btn_hidden" : "parameter__btn__navigation"}
            >
            <ButtonThird
              text={action === 'update' ? t('setParameter.btnUpdate') : t('setParameter.btnSend')}
              disable={status === 'isUpdate'}
            />
          </div>
          {!isSelected
            ?
            <div className={"analise__navigation__notSubmit"}>{t('setParameter.notSelected')}</div>
            :
            null}
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive} setStatusModal={setStatusModal}>
        <CreateCriteria active={modalActive}/>
      </Modal>
    </>
  );
};

export default SetCriteria;