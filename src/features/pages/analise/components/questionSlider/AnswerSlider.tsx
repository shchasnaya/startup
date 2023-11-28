import {FC} from 'react';

type Answer = {
  id: string
  value: number
  label: string
  width?: string
}

const AnswerSlider: FC<Answer> = ({id, label, value, width}) =>  {

  const style = {width : `${width}%`}

  return (
    <div className={"analise__range__item"} style={style}>
      <option className={"analise__range__text"}  label={label}></option>
    </div>
  );
};

export default AnswerSlider;