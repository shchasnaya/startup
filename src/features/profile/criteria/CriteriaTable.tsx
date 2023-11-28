import React, {useMemo} from 'react';
import {useAppSelector} from "../../../app/hooks";
import {allCriteria} from "../../../app/slice/CriteriaSlice";
import "./Criteria.scss"
import "../table/table.scss"
import {ColumnInstance, Row, useTable} from "react-table";
import {criteriaColumns} from "./column/_column";
import {CriteriaModel} from "../../../app/model/CriteriaModel";
import CustomHeaderColumn from "../table/CustomHeaderColumn";
import {CustomRow} from "../table/CustomRow";
import {useTranslation} from "react-i18next";



const CriteriaTable = () => {

  const { t } = useTranslation();

  const criteria = useAppSelector(allCriteria)
  const data = useMemo(() => criteria.filter((item) => !item.default), [criteria])

  const columns = useMemo(() => criteriaColumns, [])

  const {headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <>
      {data.length
      ?
        <>
          <div className={"table__title"}>{t('profile.criteria.criteriaByMe')}</div>
          <table className={"table"}>
            <thead>
            <tr className='tr__header'>
              {headers.map((column: ColumnInstance<CriteriaModel>) => (
                <CustomHeaderColumn key={column.id} column={column}/>
              ))}
            </tr>
            </thead>
            <tbody className={"tbody"}>
            <tr className={"mt16"}></tr>
            {(rows.length > 0) && (
              rows.map((row: Row<CriteriaModel>, i) => {
                prepareRow(row)
                return <CustomRow classRow={i % 2 === 0 ? 'tr tr_blue' : 'tr'} classColumn={'td'} row={row} key={`row-${i}-${row.id}`}/>
              })
            )}
            </tbody>
          </table>
        </>
      : null}
    </>
  );
};

export default CriteriaTable;