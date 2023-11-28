import Menu from "../../menu/Menu";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import React, {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {fetchAnalise, postAnalise} from "../../../app/API/AnaliseApi";
import {criteriaSetIdCriteria} from "../../../app/slice/CriteriaSlice";
import {AnaliseModel} from "../../../app/model/AnaliseModel";
import AnaliseList from "./components/AnaliseList";
import Loader from "../../components/loader/Loader";
import ButtonSecond from "../../components/button/ButtonSecond";
import ButtonThird from "../../components/button/ButtonThird";
import {Navigate, Route, Routes} from "react-router-dom";

const Analise = () => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch()

  const [redirect, setRedirect] = useState(false);

  const {idCriteria} = useAppSelector((state) => state.criteria)
  const {loadingStatus, criteriaList, postData} = useAppSelector((state) => state.analise)

  const calculateSet = (numberSet: number, criteriaList: AnaliseModel[]) => {
    const newSet = new Array<AnaliseModel>();
    criteriaList.forEach((item, index) => {
      if (index === numberSet) newSet.push(item)
    })
    return newSet
  }

  const dataSet0 = useMemo(() => calculateSet(0, criteriaList), [criteriaList])
  const dataSet1 = useMemo(() => calculateSet(1, criteriaList), [criteriaList])
  const dataSet2 = useMemo(() => calculateSet(2, criteriaList), [criteriaList])
  const dataSet3 = useMemo(() => calculateSet(3, criteriaList), [criteriaList])
  const dataSet4 = useMemo(() => calculateSet(4, criteriaList), [criteriaList])

  useEffect(() => {
    if (!!idCriteria) localStorage.setItem('idCriteriaForAnalise', idCriteria);
    else dispatch(criteriaSetIdCriteria(localStorage.getItem('idCriteriaForAnalise')))
  }, []);

  useEffect(() => {
    if (idCriteria) dispatch(fetchAnalise(idCriteria))
  }, [idCriteria]);

  const [activeSet, setActiveSet] = useState(0)

  const [allAnswer, setAllAnswer] = useState(true)

  const checkAllAnswer = (): boolean => {
    if (activeSet === 0) {
      return postData
        .filter((item) => item.topCriteriaId === dataSet0[0].id)
        .every((item) => (item.value && item.value >= 0) || item.isSkipped || item.isSkippedBlock)
    } else if (activeSet === 1) {
      return postData
        .filter((item) => item.topCriteriaId === dataSet1[0].id)
        .every((item) => (item.value && item.value >= 0) || item.isSkipped || item.isSkippedBlock)
    } else if (activeSet === 2) {
      return postData
        .filter((item) => item.topCriteriaId === dataSet1[2].id)
        .every((item) => (item.value && item.value >= 0) || item.isSkipped || item.isSkippedBlock)
    } else if (activeSet === 3) {
      return postData
        .filter((item) => item.topCriteriaId === dataSet1[3].id)
        .every((item) => (item.value && item.value >= 0) || item.isSkipped || item.isSkippedBlock)
    } else {
      return postData
        .filter((item) => item.topCriteriaId === dataSet1[4].id)
        .every((item) => (item.value && item.value >= 0) || item.isSkipped || item.isSkippedBlock)
    }
  }

  const plusActiveSet = () => {
    if (checkAllAnswer()) {
      setActiveSet(activeSet + 1)
      setAllAnswer(true)
    } else {
      setAllAnswer(false)
    }
  }

  const minusActiveSet = () => {
    setActiveSet(activeSet - 1)
  }

  const submitAnalise = () => {
    if (checkAllAnswer()) {
      setAllAnswer(true)
      const data = postData.map((item) => {
        return {
          questionId: item.questionId,
          value: item.value
        }
      })
      dispatch(postAnalise({
        questions: data
      }))
      setRedirect(true);
    } else {
      setAllAnswer(false)
    }
  }

  return (
    <div className={"container"}>
      <Menu/>
      {loadingStatus
        ?
        <Loader/>
        :
        <>
          <div
            className={activeSet === 0 ? "analise__block" : "analise__block : analise__block_hidden"}>
            <AnaliseList criteriaArray={dataSet0}/>
          </div>
          <div
            className={activeSet === 1 ? "analise__block" : "analise__block : analise__block_hidden"}>
            <AnaliseList criteriaArray={dataSet1}/>
          </div>
          <div
            className={activeSet === 2 ? "analise__block" : "analise__block : analise__block_hidden"}>
            <AnaliseList criteriaArray={dataSet2}/>
          </div>
          <div
            className={activeSet === 3 ? "analise__block" : "analise__block : analise__block_hidden"}>
            <AnaliseList criteriaArray={dataSet3}/>
          </div>
          <div
            className={activeSet === 4 ? "analise__block" : "analise__block : analise__block_hidden"}>
            <AnaliseList criteriaArray={dataSet4}/>
          </div>
        </>
      }
      <div className={activeSet === 0 ? "analise__navigation analise__navigation_right" : "analise__navigation analise__navigation"}>
        <div
          onClick={() => minusActiveSet()}
          className={activeSet === 0 ? "analise__navigation__btn analise__navigation__btn_hidden" : "analise__btn__navigation"}>
          <ButtonSecond text={t('setParameter.btnPrevious')} disable={false}/>
        </div>
        <div
          onClick={() => plusActiveSet()}
          className={activeSet === (criteriaList.length - 1) ? "analise__navigation__btn analise__navigation__btn_hidden" : "analise__btn__navigation"}>
          <div><ButtonThird text={t('setParameter.btnNext')} disable={false}/></div>
        </div>
        <div
          onClick={() => submitAnalise()}
          className={activeSet !== (criteriaList.length - 1) ? "analise__navigation__btn analise__navigation__btn_hidden" : "analise__btn__navigation"}>
          <ButtonThird text={t('setParameter.btnSend')} disable={false}/>
        </div>
        {!allAnswer
          ?
          <div className={"analise__navigation__notSubmit"}>{t('analise.notAllAnswers')}</div>
          :
          null}
      </div>
      {redirect && (
        <Routes>
          <Route index element={<Navigate to='/analise/result'/>}/>
        </Routes>
      )}
    </div>
  );
};

export default Analise;