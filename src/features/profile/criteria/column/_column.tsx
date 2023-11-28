import {Column} from "react-table";
import {CriteriaModel} from "../../../../app/model/CriteriaModel";
import CriteriaActionCell from "./CriteriaActionCell";
import {useTranslation} from "react-i18next";


const criteriaColumns: ReadonlyArray<Column<CriteriaModel>> = [
  {
    Header: "profile.criteria.columnName",
    accessor: "name"
  },
  {
    Header: "profile.criteria.columnDescr",
    accessor: "description"
  },
  {
    Header: "profile.criteria.columnAction",
    id: "actions",
    Cell: ({...props}) => <CriteriaActionCell id={props.data[props.row.index].id} />,
  }
]

export {criteriaColumns}