import {FC} from 'react'
import {Row} from 'react-table'
import "./table.scss"
import cn from "classnames";


type Props = {
  row: Row<any>,
  classRow: string,
  classColumn: string
}

const CustomRow: FC<Props> = ({row, classRow, classColumn}) => (
  <tr {...row.getRowProps()} className={classRow}>
    {row.cells.map((cell) => {
      const tdClass = cn('td', {
        'td_108px': cell.column.id === 'actions',
        'td_grey': cell.column.id === 'description',
        'td_fs14': cell.column.id === 'description',
      });

      return (
        <td
          {...cell.getCellProps()} className={tdClass}
        >
          {cell.render('Cell')}
        </td>
      )
    })}
  </tr>
)

export {CustomRow}