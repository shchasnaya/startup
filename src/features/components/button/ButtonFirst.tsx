import "./Btn.scss"
import {FC} from "react";

type Props = {
  text: string,
  disable: boolean
}

const ButtonFirst: FC<Props> = ({text, disable}) =>  {

  return (
    <button type={'submit'} className={disable ? `btn btn__first btn__first_disable` : `btn btn__first btn__first_active`}>
      {text}
    </button>
  );
};

export default ButtonFirst;