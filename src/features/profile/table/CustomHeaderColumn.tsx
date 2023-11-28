import React, {FC} from 'react';
import {ColumnInstance} from "react-table";
import {useTranslation} from "react-i18next";
import "./table.scss"

type Props = {
  column: ColumnInstance<any>
}

const CustomHeaderColumn: FC<Props> = ({column}) => {

  const { t } = useTranslation();

  return (
    <>
        <th className={"th"}>{t(`${column.Header}`)}</th>
    </>
  );
};
export default CustomHeaderColumn;