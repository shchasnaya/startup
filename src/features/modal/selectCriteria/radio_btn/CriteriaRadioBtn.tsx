import React, {FC} from 'react';
import "./CriteriaRadioBtn.scss"

type Props = {
  value: string
  name: string
  id: string
  description: string
  label: string
  checked: boolean
  onChange: any
}

const CriteriaRadioBtn: FC<Props> = (props) =>  {

  const {value, label, checked,onChange, name, id, description} = props

  return (
    <div className={"select-criteria__select"}>
      <label className={"select-criteria__select__title"} htmlFor={value}>
        <input
          type="radio"
          className={"select-criteria__select__radio-button-input"}
          value={value}
          name={name}
          id={id}
          checked={checked}
          onChange={onChange}
        />
        <span className={"select-criteria__select__custom-radio"}/>
        {label}
      </label>

      <div className={"select-criteria__select__description"} >{description}</div>
    </div>
  );
};

export default CriteriaRadioBtn;