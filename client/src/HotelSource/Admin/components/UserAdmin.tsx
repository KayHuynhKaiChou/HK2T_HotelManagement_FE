import TableHk2t from "../../../common/Table/TableHk2t";
import ButtonHk2t from "../../../common/ButtonHk2t";
import { colorsBtnCustom, columnsLoading, defaultPageSizeOptions, defaultPositions, rowsLoading } from "../../../utils/constants";
import { ColumnType } from "../../../types/supportUI";
import { useQuery} from '@tanstack/react-query';
import { uuid } from "../../../utils";
import GateWay from "../../../lib/api_gateway";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { User } from "../../../types/models";
import { useMemo } from "react";
import LoadingHk2t from "../../../common/LoadingHk2t";
import { Grid, Switch } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export default function UserAdmin() {
  const {user} = useSelector<RootState , RootState>(state => state);

  const fetchGetAllUser = async () => {
    const gateway = new GateWay('admin' , user.token)
    const res = await gateway.get({action : 'show-user'});
    return res.result
  }

  const queryKey = useMemo(() => {
    return `all-user-${uuid()}`
  },[])

  const queryAllUser = useQuery<User[]>({queryKey : [queryKey] , queryFn: fetchGetAllUser });
  const {
    data : listUsers , 
    isLoading : isLoadingListUsers
  } = queryAllUser;

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
        nameCol : 'status',
        width : 80
      },
      {
        id : `field-action-${uuid()}`,
        nameCol : 'action',
        width : 300
      }
    ]
  },[])

  const rows = useMemo(() => {
    if(!listUsers) return [];
    return listUsers
      .map(user => {
        return {
          fullName : user.firstname + ' ' + user.surname,
          email : user.email,
          phone : user.phone || 'Not yet',
          gender : user.gender == 1 ? 'Male' : 'Female',
          position : defaultPositions[user.position! - 1],
          status : <Switch defaultChecked={!!user.status} />,
          action : (
            <Grid container spacing={2}>
              <Grid item sm={4}>
                <ButtonHk2t
                  typeCustom="icon"
                  Icon={Edit}
                />
              </Grid>
              <Grid item sm={4}>
                <ButtonHk2t
                  typeCustom="icon"
                  Icon={Delete}
                  colorCustom={colorsBtnCustom['danger']}
                />
              </Grid>
            </Grid>
          )
        }
      })
  },[listUsers])
  
  //const Width = ({ children }) => children(500)

  return (
    <div>
        {isLoadingListUsers && <LoadingHk2t/> }
        <TableHk2t
          isLoadingTable = {isLoadingListUsers}
          rows={isLoadingListUsers ? rowsLoading : rows}
          columns={isLoadingListUsers ? columnsLoading : columns}
          pageSizeOptions={defaultPageSizeOptions}
        />
      {/* <Width>
        {width => <div>window is {width}</div>}
      </Width>
      <div>
        {["Hello ", <span>World</span>, "!"]}
      </div> */}
    </div>
  )
}
