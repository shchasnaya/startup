import React, {FC} from 'react';
import "./Btn.scss"

type Props = {
  text: string,
  disable: boolean
}

const ButtonSecond: FC<Props> = ({text, disable}) =>  {
  return (
    <button className={disable ? `btn btn__second btn__second_disable` : `btn btn__second btn__second_active`}>
      {text}
    </button>
  );
};

export default ButtonSecond;