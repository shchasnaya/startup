import {FC} from "react";
import "../Criteria.scss"
import {criteriaSetAction, criteriaSetIdCriteria} from "../../../../app/slice/CriteriaSlice";
import {useAppDispatch} from "../../../../app/hooks";
import {NavLink} from "react-router-dom";

type Props = {
  id: string
}

const CriteriaActionCell: FC<Props> = ({id}) => {

  const dispatch = useAppDispatch()

  const setAction = ( id: string) => {
    dispatch(criteriaSetAction('update'))
    dispatch(criteriaSetIdCriteria(id))
  }

  return (
    <div className={"table__actions"}>
      <NavLink to={'/set-criteria'}>
        <button onClick={() => setAction(id)}>
          <img src={require("../../../../_assets/icons/profile/edit.svg").default} alt="edit icon"/>
        </button>
      </NavLink>
      <button><img src={require("../../../../_assets/icons/profile/delete.svg").default} alt="delete icon"/></button>
    </div>
  );
};

export default CriteriaActionCell;