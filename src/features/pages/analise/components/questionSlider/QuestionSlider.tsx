import {FC, useEffect, useMemo, useState} from 'react';
import {AnswerModel, typeQuestion} from "../../../../../app/model/AnaliseModel";
import {useTranslation} from "react-i18next";
import "./analiseSlider.scss"
import AnswerSlider from "./AnswerSlider";
import AnswerRadioBtn from "../questionRadioBtn/AnswerRadioBtn";
import Slider from "rc-slider";
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

const QuestionSlider: FC<Question> = ({question, index}) => {

  const { t } = useTranslation();

  const {postData} = useAppSelector((state) => state.analise)

  const dispatch = useAppDispatch()

  const [value, setValue] = useState(0)
  const [skipQuestion, setSkipQuestion] = useState(false);

  useEffect(() => {
    const quest = postData.find((item) => item.questionId === question.id)
    if (quest?.value === null) setValue(0)
    setSkipQuestion(false)
  }, [])

  const answerSort = useMemo(() => {
    let prevWidth = 0;
    return [...question.answers].sort((a,b) => a.value - b.value).map((answer) => {
      const width = answer.value - prevWidth
      prevWidth = answer.value
      return {
        ...answer,
        width: width.toString()
      }
    })

  }, [question.answers]);


  const handleOptionChange = (e: any) => {
    setValue(e.target.value)
    setSkipQuestion(false)
    dispatch(analiseChangePostData({
      id: question.id,
      value: e.target.value,
      isSkipped: false,
      isSkippedBlock: false
    }))
  }

  const handleSkipChange = () => {
    setSkipQuestion(!skipQuestion)
    setValue(0)
    dispatch(analiseChangePostData({
      id: question.id,
      value: null,
      isSkipped: true,
      isSkippedBlock: false
    }))
  }

  return (
    <>
      <label htmlFor={question.id} className={index === 0 ? "analise__question" : "analise__question analise__question_mt24"}>{question.question}</label>
      <div className={"analise__range"}>
        <input
          className={"analise__range__input"}
          type="range"
          value={value}
          id={question.id}
          name={question.id}
          list="values"
          onChange={handleOptionChange}
        />
        <datalist id="values">
          {answerSort.map((answer) => (
            <AnswerSlider key={answer.id} id={answer.id} value={answer.value} label={answer.answer} width={answer.width}/>
          ))}
        </datalist>
      </div>
      <Slider
      />
      <AnswerRadioBtn
        id={`${question.id}-null`}
        checked={skipQuestion}
        value={`null`}
        name={question.id}
        label={t('analise.skipQuestion')}
        onChange={handleSkipChange}
        required={true}
        index={0}
      />
    </>
  );
};

export default QuestionSlider;