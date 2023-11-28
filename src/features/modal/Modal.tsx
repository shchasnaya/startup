import "./Modal.scss"
import React, {FC, useEffect} from "react";

type Props = {
  active: boolean,
  setActive(value: boolean): void,
  setStatusModal(value: string): void,
  children?: React.ReactNode
}

const Modal: FC<Props> = (props) =>  {

  const {active, setActive, children, setStatusModal} = props;

  useEffect(() => {
    active ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [active])

  return (
    <div className={active ? 'modal modal_active' : 'modal'} onClick={() => {
      setActive(false)
      setStatusModal('')
    }}>
      <div className={active ? 'modal__content modal__content_active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
        <div className={"modal__btn_close"} onClick={() => {
          setActive(false)
          setStatusModal('')
        }}><img src={require("../../_assets/icons/modal/exit.svg").default} alt="delete icon"/></div>
        {children}
      </div>
    </div>
  );
};

export default Modal;