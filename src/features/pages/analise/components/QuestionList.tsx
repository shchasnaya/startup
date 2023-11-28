import {FC} from 'react';
import {QuestionModel, typeQuestion} from "../../../../app/model/AnaliseModel";
import QuestionRadioBtn from "./questionRadioBtn/QuestionRadioBtn";
import QuestionSlider from "./questionSlider/QuestionSlider";
import QuestionCheckBox from "./questionCheckBox/QuestionCheckBox";


type QuestionListType = {
  questions: QuestionModel[]
  hidden: boolean
  skipBlock: boolean
}

const QuestionList: FC<QuestionListType> = ({questions, hidden, skipBlock}) => {

  const typeQuest = questions.map((item, index) => {
    if (item.type === typeQuestion[typeQuestion.RADIOBUTTON]) {
      return !skipBlock ? <QuestionRadioBtn key={item.id} question={item} index={index}/> : null
    }
    else if (item.type === typeQuestion[typeQuestion.SLIDER]) {
      return !skipBlock ? <QuestionSlider key={item.id} question={item} index={index}/> : null
    }
    else if (item.type === typeQuestion[typeQuestion.CHECKBOX]) {
      return !skipBlock ? <QuestionCheckBox key={item.id} question={item} index={index}/> : null
    }
  })

  return (
    <div className={hidden ? "analise__item-question analise__item-question_hidden" : "analise__item-question analise__item-question_active"}>
      {typeQuest}
    </div>
  );
};

export default QuestionList;