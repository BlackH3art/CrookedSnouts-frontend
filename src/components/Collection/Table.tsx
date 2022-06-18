import { FC, ReactNode } from "react";
import { whitelistContractAddress } from "../../utils/constants";

interface Props {
  children: string | ReactNode;
}
const TableHead: FC<Props> = ({children}) => <th className="text-center md:text-right w-full md:w-1/4">{children}</th>
const TableCell: FC<Props> = ({children}) => <td className="text-center pb-4 md:pb-0 w-full md:w-1/2">{children}</td>

const Table: FC = () => {
  return(
    <table className="text-xl w-full md:w-4/5 xl:w-3/5 mb-10">
      <thead>
        <tr className="text-2xl">
          <th className="pb-2" colSpan={2}> Crooked Snouts </th>
        </tr>
      </thead>
      <tbody className="flex flex-col">
        <tr className="flex flex-col md:flex-row w-full">
          <TableHead>contract address:</TableHead>
          <TableCell>not deployed yet</TableCell>
        </tr>
        <tr className="flex flex-col md:flex-row w-full">
          <TableHead>max supply:</TableHead>
          <TableCell>10.000</TableCell>
        </tr>
        <tr className="flex flex-col md:flex-row w-full">
          <TableHead>mint price:</TableHead>
          <TableCell>5 MATIC</TableCell>
        </tr>
        <tr className="flex flex-col md:flex-row w-full">
          <TableHead>max mints:</TableHead>
          <TableCell>no limits</TableCell>
        </tr>
      </tbody>
      <thead>
        <tr className="text-2xl">
          <th className="pt-10 pb-2" colSpan={2}> Whitelist </th>
        </tr>
      </thead>
      <tbody className="flex flex-col">
        <tr className="flex flex-col md:flex-row w-full">
          <TableHead>contract address:</TableHead>
          <TableCell>
            <a className="link" href="https://polygonscan.com/address/0xE2047175C0F685f813938Cc8Fdc027259F0C87de">Polygon scan</a>
          </TableCell>
        </tr>
        <tr className="flex flex-col md:flex-row w-full">
          <TableHead>mint price:</TableHead>
          <TableCell>1 MATIC</TableCell>
        </tr>
        <tr className="flex flex-col md:flex-row w-full">
          <TableHead>max mints:</TableHead>
          <TableCell>5 mints</TableCell>
        </tr>
      </tbody>
    </table>
  )
}

export default Table;