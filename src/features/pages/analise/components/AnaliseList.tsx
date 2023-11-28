import React from 'react';
import {AnaliseModel} from "../../../../app/model/AnaliseModel";
import AnaliseItem from "./AnaliseItem";

type CriteriaListProps = {
  criteriaArray: AnaliseModel[]
}

const AnaliseList: React.FC<CriteriaListProps> = ({ criteriaArray }) => {
  return (
    <form>
      {criteriaArray.map((criteria) => (
        <AnaliseItem
          key={criteria.id}
          criteria={criteria}
          index={-1}
          hidden={false}
          skip={false}
        />
      ))}
    </form>
  );
};

export default AnaliseList;