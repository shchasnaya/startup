import React, {useEffect, useState} from "react";
import CustomCheckbox from "../custom-checkbox/CustomCheckbox";
import "../SetCriteria.scss"
import cn from "classnames";
import {ParameterModel} from "../../../../app/model/ParameterModel";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {parameterAddSelectedItem, parameterDelSelectedItem} from "../../../../app/slice/ParameterSlice";

type CriteriaItemProps = {
  criteria: {
    id: string
    name: string
    description: string
    level: number
    children?: ParameterModel[]
  };
  hidden: boolean,
  parentRefresh: boolean,
  index: number,
  disabled: boolean
}

const ParameterItem: React.FC<CriteriaItemProps> = ({ criteria, hidden, parentRefresh, index, disabled}) => {

  const dispatch = useAppDispatch()

  const {selected} = useAppSelector((state) => state.parameter)

  const isSelected = (id: string) => {
    const selectedIsArray = selected && !!selected.length;
    return !!selectedIsArray && selected.some((item) => item === id)
  }

  const [isChecked, setIsChecked] = useState(isSelected(criteria.id));

  const [isHiddenChild, setIsHiddenChild] = useState(false);

  const [isParentChecked, setIsParentChecked] = useState(parentRefresh)

  useEffect(() => {
    setIsChecked(isSelected(criteria.id))
    setIsParentChecked(isSelected(criteria.id))
  }, [parentRefresh, isSelected, criteria.id])

  const changeHiddenChild = (value: boolean) => {
    setIsHiddenChild(value)
  }

  const dispatchChild = (child: ParameterModel[]) => {
    if (isChecked) {
      child.forEach((item) => {
        dispatch(parameterDelSelectedItem(item.id))
        if (item.children && item.children.length) dispatchChild(item.children)
      })
    } else {
      child.forEach((item) => {
        dispatch(parameterAddSelectedItem(item.id))
        if (item.children && item.children.length) dispatchChild(item.children)
      })
    }
  }

  const handleCheckboxChange = () => {
    if (isChecked) {
      dispatch(parameterDelSelectedItem(criteria.id))
      if (criteria.children && criteria.children.length) {
        dispatchChild(criteria.children)
      }
    } else {
      dispatch(parameterAddSelectedItem(criteria.id))
      if (criteria.children && criteria.children.length) {
        dispatchChild(criteria.children)
      }
    }
    setIsChecked(!isChecked);
    setIsParentChecked(!isChecked)
  };

  const itemClass = cn('parameter__item', {
    'parameter__item__ml40': criteria.level === 2,
    'parameter__item__ml80': criteria.level === 3,
    'parameter__item__ml120': criteria.level === 4,
    'parameter__item_hidden': hidden,
    'parameter__item_active': !hidden,
    'parameter__item_mt24': index === 0 && criteria.children && criteria.children.length,
    'parameter__item_mt60': index === -1
  });

  return (
    <div className={itemClass}>
      <div className={"parameter__item__action"}>
        <CustomCheckbox
          level={criteria.level}
          value={criteria.id}
          checked={isChecked}
          onChange={handleCheckboxChange}
          label={criteria.name}
          disabled={disabled}
        />
        <div
          onClick={() => changeHiddenChild(false)}
          className={!isHiddenChild || !(criteria.children && criteria.children.length)? "parameter__item__arrow parameter__item__arrow_hidden" : "parameter__item__arrow"}>
          <img src={require("../../../../_assets/icons/pages/arrow_down.svg").default} alt="down arrow icon"/>
        </div>
        <div
          onClick={() => changeHiddenChild(true)}
          className={isHiddenChild || !(criteria.children && criteria.children.length) ? "parameter__item__arrow parameter__item__arrow_hidden" : "parameter__item__arrow"}>
          <img src={require("../../../../_assets/icons/pages/arrow_top.svg").default} alt="top arrow icon"/>
        </div>
      </div>
      <div className={"parameter__item__description"}>{criteria.description}</div>
      <div className={"parameter__item__divider"}></div>
      {criteria.children && criteria.children.length && (
        <div>
          {criteria.children.map((child, index) => (
            <ParameterItem
              key={child.id}
              criteria={child}
              hidden={isHiddenChild}
              parentRefresh={isParentChecked}
              index={index}
              disabled={disabled}
              />
          ))}
        </div>
      )}
    </div>
  );
};

export default ParameterItem;