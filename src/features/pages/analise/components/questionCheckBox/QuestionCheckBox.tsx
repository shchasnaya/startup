import {FC, useEffect, useState} from 'react';
import {AnswerModel, typeQuestion} from "../../../../../app/model/AnaliseModel";
import AnswerCheckBox from "./AnswerCheckBox";
import "./analiseCheckBox.scss"
import {useTranslation} from "react-i18next";
import {analiseChangePostData} from "../../../../../app/slice/AnaliseSlice";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";

type Question = {
  question: {
    id: string
    question: string
    type: typeQuestion
    answers: AnswerModel[]
  },
  index: number
}

const QuestionCheckBox: FC<Question> = ({question, index}) => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch()

  const {postData} = useAppSelector((state) => state.analise)

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: boolean }>({});
  const [skipQuestion, setSkipQuestion] = useState(false);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    // Если выбран чекбокс "Пропустить вопрос", сбросить выбранные ответы
    if (id === `${question.id}-null` && checked) {
      setSkipQuestion(true);
      setSelectedAnswers({});
    } else {
      // Если выбран другой чекбокс, сбросить "Пропустить вопрос"
      setSkipQuestion(false);
      setSelectedAnswers((prevAnswers) => ({ ...prevAnswers, [id]: checked }));
    }
  };

  useEffect(() => {
    setSkipQuestion(false);
    const quest = postData.find((item) => item.questionId === question.id)
    if (quest?.value === null) setSelectedAnswers({});
  }, [])

  useEffect(() => {
    const ifSelected = Object.keys(selectedAnswers).length > 0;
    const count = question.answers
      .filter((item) => selectedAnswers[item.id])
      .reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
    const state = {
      id: question.id,
      value: ifSelected ? count : null,
      isSkipped: skipQuestion,
      isSkippedBlock: false
    }
    dispatch(analiseChangePostData(state))
  }, [selectedAnswers])

  return (
    <>
      <div className={index === 0 ? "analise__question" : "analise__question analise__question_mt24"}>{question.question}</div>
      {question.answers.map((answer, index) => (
        <AnswerCheckBox
          key={answer.id}
          id={answer.id}
          value={answer.value.toString()}
          name={question.id}
          checked={selectedAnswers[answer.id] || false}
          onChange={handleCheckboxChange}
          label={answer.answer}
          index={index}/>
      ))}
      <AnswerCheckBox
        id={`${question.id}-null`}
        value={`null`}
        name={question.id}
        checked={skipQuestion}
        onChange={handleCheckboxChange}
        label={t('analise.skipQuestion')}/>
    </>
  );
};

export default QuestionCheckBox;