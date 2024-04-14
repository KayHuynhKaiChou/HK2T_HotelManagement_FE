import { useState } from "react";
import RadioBtnHK2t from "../../../common/RadioBtnHK2t";
import TableHk2t from "../../../common/Table/TableHk2t";
import { uuid } from "../../../utils";
import ButtonHk2t from "../../../common/ButtonHk2t";
import DeleteIcon from '@mui/icons-material/Delete';
import { colorsBtnCustom } from "../../../utils/constants";
import { columnType } from "../../../types/supportUI";
import CheckboxHk2t from "../../../common/CheckboxHk2t";

export default function UserAdmin() {
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    action: JSX.Element | HTMLElement
  ) {
      return { name, calories, fat, carbs, protein, action };
  }

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0 , 
    <ButtonHk2t/>
  ),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, <ButtonHk2t typeCustom="icon" Icon={DeleteIcon} colorCustom={colorsBtnCustom['primary']}/>),
  createData("Eclair", 262, 16.0, 24, 6.0, <ButtonHk2t/>),
  createData("Cupcake", 305, 3.7, 67, 4.3 , <ButtonHk2t/>),
  createData("Gingerbread", 356, 16.0, 49, 3.9 , <ButtonHk2t />),
  createData("Juice lomen", 116, 6.0, 19, 3.4 , <ButtonHk2t />)
];

const columns : columnType[] = [
  {
    id : '1',
    nameCol : "name",
    isSorted : true,
    typeSort : 'normal'
  },
  {
    id : '2',
    nameCol : "calories",
    isSorted : true,
    typeSort : 'normal'
  },
  {
    id : '3',
    nameCol : "fat",
    isSorted : true,
    typeSort : 'normal'
  },
  {
    id : '4',
    nameCol : "carbs",
    isSorted : true,
    typeSort : 'normal'
  },
  {
    id : '5',
    nameCol : "protein",
    isSorted : true,
    typeSort : 'normal'

  },
  {
    id : '6',
    nameCol : "action"
  }
]

const options = ['month' , 'year']
const [value , setValue] = useState('month');
const handleChangeValue = (value : string ) => {
  console.log(value)
  setValue(value)
}
  return (
    <div>
      <TableHk2t
        rows={[...rows,...rows]}
        columns={columns}
        pageSizeOptions={
          [
            {
              label : '5',
              value : 5
            },
            {
              label : '10',
              value : 10
            },
            {
              label : '15',
              value : 15
            },
          ]
        }
      />
      {options.map((o,i) => (
        <RadioBtnHK2t
          id={uuid()}
          label={o}
          checked={o === value}
          disabled={false}
          onChange={() => handleChangeValue(o)}
        />
      ))}
      <CheckboxHk2t/>
    </div>
  )
}
