import ParameterItem from './ParameterItem';
import React from "react";
import {ParameterModel} from "../../../../app/model/ParameterModel";

type CriteriaListProps = {
  criteriaArray: ParameterModel[];
  hidden: boolean
  disabled: boolean
}

const ParameterList: React.FC<CriteriaListProps> = ({ criteriaArray, hidden, disabled }) => {
  return (
    <div>
      {criteriaArray.map((criteria) => (
          <ParameterItem
            key={criteria.id}
            criteria={criteria}
            hidden={hidden}
            parentRefresh={false}
            index={-1}
            disabled={disabled}
          />
      ))}
    </div>
  );
};

export default ParameterList;