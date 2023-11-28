import React, {FC} from 'react';
import "./analiseRadioBtn.scss";
import cn from "classnames";

type Answer = {
  id: string
  value: string
  name: string
  label: string
  checked: boolean
  onChange: any
  required: boolean
  index?: number
  skipBlock?: boolean
}

const AnswerRadioBtn: FC<Answer> = ({id, value, name, checked, onChange, label, required, index, skipBlock}) =>  {

  const itemClass = cn('analise__rb__answer', {
    'analise__rb__answer_mt16': index === 0,
    'analise__rb__answer_mt8': skipBlock,
    'analise__rb__answer_ml0': skipBlock,
  });

  return (
    <div className={itemClass}>
      <label className={"analise__rb__answer__title"} htmlFor={id}>
        <input
          type={"radio"}
          className={"analise__rb__answer__radio-button-input"}
          value={value}
          name={name}
          id={id}
          checked={checked}
          onChange={onChange}
          required={required}
        />
        <span className={"analise__rb__answer__custom-radio"}/>
        {label}
      </label>
    </div>
  );
};

export default AnswerRadioBtn;