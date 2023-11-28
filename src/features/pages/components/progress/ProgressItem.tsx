import React from 'react';
import "./Progress.scss"
import cn from "classnames";

type Props = {
  activeSet: number
  name: string
  index: number
}

const ProgressItem: React.FC<Props> = ({ activeSet, name, index }) => {

  const itemClass = cn('progress__item', {
    'progress__item_active': index <= activeSet,
    'progress__item_not-active': index > activeSet,
    'progress__item_next-not-active': index + 1 > activeSet,
  });

  return (
    <div className={itemClass}>
      <div className={"progress__item__title"}>{name}</div>
      {
        index <= activeSet
          ?
          <div className={"progress__item__checkbox progress__item__checkbox_active"}><img
            src={require(`../../../../_assets/icons/pages/active_checkbox_root.svg`).default}
            alt={"title progress analise"} /></div>
          :
          <div className={"progress__item__checkbox progress__item__checkbox"}><img
            src={require(`../../../../_assets/icons/pages/not_active_checkbox_root.svg`).default}
            alt={"title progress analise"} /></div>
      }
    </div>
  );
};

export default ProgressItem;