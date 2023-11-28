import React from 'react';
import "./Progress.scss"
import ProgressItem from "./ProgressItem";

type Props = {
  activeSet: number
  names: string[]
}

const Progress: React.FC<Props> = ({ activeSet, names }) => {

  return (
    <div className={"progress"}>
      {names.map((item, index) => (
          <ProgressItem key={item} activeSet={activeSet} name={item} index={index}/>
      ))
      }
    </div>
  );
};

export default Progress;