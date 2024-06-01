import TableHk2t from "../../../common/Table/TableHk2t";
import ButtonHk2t from "../../../common/ButtonHk2t";
import DeleteIcon from '@mui/icons-material/Delete';
import { colorsBtnCustom } from "../../../utils/constants";
import { ColumnType, ColumnTypeProps } from "../../../types/supportUI";
import { useMutation, useQuery} from '@tanstack/react-query';
import { uuid } from "../../../utils";
import GateWay from "../../../lib/api_gateway";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { User } from "../../../types/models";
import { useMemo } from "react";

export default function UserAdmin() {
  const {user} = useSelector<RootState , RootState>(state => state);
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

  const fetchGetAllUser = async () => {
    const gateway = new GateWay('admin' , user.token)
    const res = await gateway.get({action : 'show'});
    return res.result
  }

  const queryAllUser = useQuery<User[]>({queryKey : [`all-user-${uuid()}`] , queryFn: fetchGetAllUser });
  const {data : listUsers} = queryAllUser;

  const columns = useMemo<ColumnType[]>(() => {
    return [
      {
        id : `field-fullName-${uuid()}`,
        nameCol : 'fullName'
      },
      {
        id : `field-email-${uuid()}`,
        nameCol : 'email'
      },
      {
        id : `field-phone-${uuid()}`,
        nameCol : 'phone'
      },
      {
        id : `field-gender-${uuid()}`,
        nameCol : 'gender'
      },
      {
        id : `field-position-${uuid()}`,
        nameCol : 'position'
      },
      {
        id : `field-status-${uuid()}`,
        nameCol : 'status'
      },
      {
        id : `field-action-${uuid()}`,
        nameCol : 'action'
      }
    ]
  },[])
  
  const Width = ({ children }) => children(500)

  return (
    <div>
      <TableHk2t
        rows={listUsers!}
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
      <Width>
        {width => <div>window is {width}</div>}
      </Width>
      <div>
        {["Hello ", <span>World</span>, "!"]}
      </div>
    </div>
  )
}
