import {FC, useEffect, useState} from 'react';
import {AnswerModel, typeQuestion} from "../../../../../app/model/AnaliseModel";
import AnswerRadioBtn from "./AnswerRadioBtn";
import "./analiseRadioBtn.scss"
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {analiseChangePostData} from "../../../../../app/slice/AnaliseSlice";

type Question = {
  question: {
    id: string
    question: string
    type: typeQuestion
    answers: AnswerModel[]
  },
  index: number
}

const QuestionRadioBtn: FC<Question> = ({question, index}) => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch()

  const {postData} = useAppSelector((state) => state.analise)

  const [selectedOption, setSelectedOption] = useState<string | null>()

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value)
    const state = {
      id: question.id,
      value: event.target.value === 'null' ? null : event.target.value,
      isSkipped: event.target.value === !!'null',
      isSkippedBlock: false
    }
    dispatch(analiseChangePostData(state))
  };

  useEffect(() => {
    const quest = postData.find((item) => item.questionId === question.id)
    if (quest?.value === null) setSelectedOption(null)
    if (quest?.isSkipped) setSelectedOption('null')
  }, [])

  return (
    <>
      <div className={index === 0 ? "analise__question" : "analise__question analise__question_mt24"}>{question.question}</div>
      {question.answers.map((answer, index) => (
        <AnswerRadioBtn
          key={answer.id}
          id={answer.id}
          checked={selectedOption === answer.value.toString()}
          value={answer.value.toString()}
          name={question.id}
          label={answer.answer}
          onChange={handleOptionChange}
          required={true}
          index={index}
        />
      ))}
      <AnswerRadioBtn
        id={`${question.id}-null`}
        checked={selectedOption === 'null'}
        value={`null`}
        name={question.id}
        label={t('analise.skipQuestion')}
        onChange={handleOptionChange}
        required={true}
      />
    </>
  );
};

export default QuestionRadioBtn;