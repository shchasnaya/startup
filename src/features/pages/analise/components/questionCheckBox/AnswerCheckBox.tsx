import React, {ChangeEvent, FC} from 'react';
import "./analiseCheckBox.scss"

type Answer = {
  id: string
  value: string
  name: string
  checked: boolean
  onChange(id: string, checked: boolean): void
  label: string
  index?: number
}

const AnswerCheckBox: FC<Answer> = ({id, value, name, checked, onChange, label, index}) =>  {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(id, event.target.checked);
  };

  return (
    <div className={index === 0 ? "analise__cb__answer analise__cb__answer_mt16" : "analise__cb__answer"}>
      <label className={'analise__cb__answer__title'}  htmlFor={id}>
        <input
          className={"analise__cb__answer__checkbox-input"}
          value={value}
          id={id}
          name={name}
          checked={checked}
          type="checkbox"
          onChange={handleChange} />
        <span className={'analise__cb__answer__custom-checkbox'}/>
        {label}
      </label>
    </div>
  );
};

export default AnswerCheckBox;