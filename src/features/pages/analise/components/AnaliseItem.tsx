import React, {useEffect, useState} from 'react';
import {AnaliseModel, QuestionModel} from "../../../../app/model/AnaliseModel";
import cn from "classnames";
import "../Analise.scss"
import QuestionList from "./QuestionList";
import AnswerRadioBtn from "./questionRadioBtn/AnswerRadioBtn";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "../../../../app/hooks";
import {analiseChangePostData} from "../../../../app/slice/AnaliseSlice";

type CriteriaItemProps = {
  criteria: AnaliseModel;
  index: number,
  hidden: boolean,
  skip: boolean
}

const AnaliseItem: React.FC<CriteriaItemProps> = ({ criteria, index, hidden, skip}) => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch()

  const itemClass = cn('analise__item', {
    'analise__item__ml40': criteria.level === 2,
    'analise__item__ml72': criteria.level === 3,
    'analise__item__ml110': criteria.level === 4,
    'analise__item_hidden': hidden,
    'analise__item_active': !hidden,
    'analise__item_mt24': index === 0 && criteria.children && criteria.children.length,
    'analise__item_mt60': index === -1
  });

  const [isHiddenChild, setIsHiddenChild] = useState(false)

  const [skipBlock, setSkipBlock] = useState(skip)

  const changeHiddenChild = (value: boolean) => {
    if (value) setIsHiddenChild(value)
    else {
      setIsHiddenChild(value)
      setSkipBlock(false)
    }
  }

  const changeSkipBlock = () => {
    setSkipBlock(!skipBlock)
    setIsHiddenChild(true)
  }

  useEffect(() => {
    if (!!criteria.questions) criteria.questions.forEach((quest: any) => {
      dispatch(analiseChangePostData({
        id: quest.id,
        value: null,
        isSkipped: false,
        isSkippedBlock: skipBlock
      }))
    })
  }, [skipBlock])

  useEffect(() => {
    setSkipBlock(skip)
  }, [skip])

  return (
    <div className={itemClass}>
      <div className={"analise__item__action"}>
        <div className={criteria.level === 0 ? "analise__item__title analise__item__title_root" : "analise__item__title"}>{criteria.name}</div>
        <div
          onClick={() => changeHiddenChild(false)}
          className={!isHiddenChild || !(((criteria.children && criteria.children.length) || (criteria.questions && criteria.questions.length)) && criteria.level !== 0) ? "analise__item__arrow analise__item__arrow_hidden" : "analise__item__arrow"}>
          <img src={require("../../../../_assets/icons/pages/arrow_down.svg").default} alt="down arrow icon"/>
        </div>
        <div
          onClick={() => changeHiddenChild(true)}
          className={isHiddenChild || !(((criteria.children && criteria.children.length) || (criteria.questions && criteria.questions.length)) && criteria.level !== 0) ? "analise__item__arrow analise__item__arrow_hidden" : "analise__item__arrow"}>
          <img src={require("../../../../_assets/icons/pages/arrow_top.svg").default} alt="top arrow icon"/>
        </div>
      </div>

      <div className={"analise__item__description"}>{criteria.description}</div>
      <div className={"analise__item__divider"}></div>

      {criteria.level !== 0
        ?
        (
          <AnswerRadioBtn
            id={`${criteria.id}-block`}
            value={`${criteria.id}-null`}
            name={`${criteria.id}-block`}
            label={t('analise.skipBlock')}
            checked={skipBlock}
            onChange={changeSkipBlock}
            required={false}
            skipBlock={true}
            />
        )
        :
        null
      }

      {criteria.questions && criteria.questions.length ? (
          <QuestionList skipBlock={skipBlock} hidden={isHiddenChild} questions={criteria.questions}/>
      ) : null}
      {criteria.children && criteria.children.length && (
        <div>
          {criteria.children.map((child, index) => (
            <AnaliseItem
              key={child.id}
              criteria={child}
              hidden={isHiddenChild}
              index={index}
              skip={skipBlock}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnaliseItem;