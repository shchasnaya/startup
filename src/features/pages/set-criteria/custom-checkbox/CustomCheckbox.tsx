import React, {FC} from 'react';
import "./CustomCheckbox.scss"

type Props = {
  value: string
  checked: boolean
  onChange(): void,
  level: number
  label: string
  disabled: boolean
}

const CustomCheckbox: FC<Props> = (props) =>  {

  const {value, checked, onChange, label, level, disabled} = props

  return (
      <label className={level === 0 ? 'checkbox__label checkbox__label_root' : 'checkbox__label'}  htmlFor={value}>
        <input
          className={"checkbox__input"}
          value={value}
          id={value}
          checked={checked}
          type="checkbox"
          onChange={onChange}
          disabled={disabled}
        />
        <span className={level === 0 ? 'checkbox__custom-checkbox checkbox__custom-checkbox_root' : 'checkbox__custom-checkbox'}/>
        {label}
      </label>
  );
};

export default CustomCheckbox;