import React, {FC} from 'react';
import "./Btn.scss"

type Props = {
  text: string,
  disable: boolean
}

const ButtonThird: FC<Props> = ({text, disable}) =>  {
  return (
    <button className={disable ? `btn btn__third btn__third_disable` : `btn btn__third btn__third_active`}>
      {text}
    </button>
  );
};

export default ButtonThird;