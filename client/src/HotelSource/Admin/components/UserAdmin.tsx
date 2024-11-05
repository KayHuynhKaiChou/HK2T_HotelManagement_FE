import TableHk2t from "../../../common/Table/TableHk2t";
import ButtonHk2t from "../../../common/ButtonHk2t";
import { columnsLoading, defaultPageSizeOptions, defaultPositions, rowsLoading } from "../../../utils/constants";
import { ColumnType } from "../../../types/supportUI";
import { RefetchQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatUpdatedProfile, scrollToForm, toastMSGObject, uuid } from "../../../utils";
import GateWay from "../../../lib/api_gateway";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { User } from "../../../types/models";
import { useMemo, useRef, useState } from "react";
import { Switch } from "@mui/material";
import { Edit } from "@mui/icons-material";
import FormUpdateProfile, { FormUpdateProfileHandle } from "../../../common/FormProfile/FormUpdateProfile";
import { ActionForm, FormUserProfile } from "../../../types/form";
import { toast } from "react-toastify";
import { ResponseFormat } from "../../../types/response";
import { MESSAGE } from "../../../utils/messages";
import { useDialogHk2t } from "../../../common/Dialog/dialogHk2t";
import InforGeneratedAccount from "./InforGeneratedAccount";
import { queryKeyAllUser } from "../../../tanstack/key";
import { useLoadingHk2tScreen } from "../../../common/Loading/LoadingHk2tScreen";

const initNewUser = {
  id: 0,
  firstname: "",
  surname: "",
  phone: "",
  birth_day: "",
  link_avatar: "",
  email: "",
  password: "",
  salary: 0,
  updated_at: "",
  created_at: ""
}

export default function UserAdmin() {
  const {user} = useSelector<RootState , RootState>(state => state);

  // query
  const queryClient = useQueryClient();
  const listUsers = queryClient.getQueryData<User[]>([queryKeyAllUser]);

  // state
  const [typeActionForm, setTypeActionForm] = useState<ActionForm>('CREATE');
  const [selectedUser, setSelectedUser] = useState<User>(
    initNewUser
  );

  // ref
  const formProfileWrapRef = useRef<HTMLDivElement | null>(null);
  const formUpdateProfile = useRef<FormUpdateProfileHandle | null>(null);

  //common useContext
  const dialog = useDialogHk2t();
  const loading = useLoadingHk2tScreen();

  const columns = useMemo<ColumnType[]>(() => {
    return [
      {
        id : `field-fullName-${uuid()}`,
        nameCol : 'fullName',
        label : 'fullname',
        isSearched : true
      },
      {
        id : `field-email-${uuid()}`,
        nameCol : 'email',
        isSearched : true
      },
      {
        id : `field-phone-${uuid()}`,
        nameCol : 'phone',
        isSearched : true
      },
      {
        id : `field-gender-${uuid()}`,
        nameCol : 'gender'
      },
      {
        id : `field-position-${uuid()}`,
        nameCol : 'position',
        isSearched : true,
        criteria : defaultPositions.map(position => ({
          label: position,
          condition: position
        }))
      },
      {
        id : `field-status-${uuid()}`,
        nameCol : 'status',
        width : 80
      },
      {
        id : `field-action-${uuid()}`,
        nameCol : 'action',
        width : 100
      }
    ]
  },[])
  
  const rows = useMemo(() => {
    if(!listUsers) return [];
    return listUsers
      .map(user => {
        return {
          id : user.id,
          fullName : user.firstname + ' ' + user.surname,
          email : user.email,
          phone : user.phone || 'Not yet',
          gender : user.gender == 1 ? 'Male' : 'Female',
          position : defaultPositions[user.position! - 1],
          status : 
            <Switch 
              defaultChecked={!!user.status} 
              onClick={() => mutationChangeStatusAccount.mutate(user)}
            />,
          action : (
            <ButtonHk2t
              typeCustom="icon"
              Icon={Edit}
              // disabled={typeActionForm === 'UPDATE' && user.id === selectedUser.id}
              onClick={() => handleEdit(user)}
            />
          )
        }
      })
  },[listUsers])

  // change state
  const changeTypeActionForm = (actForm : ActionForm, userParam: User) => { 
    const handleChangeTypeRoomLogic = () => {
      setTimeout(() => {
        scrollToForm(formProfileWrapRef);
      }, 800);
      setTypeActionForm(actForm)
      setSelectedUser(userParam)
    }
    const isDirtyForm = formUpdateProfile.current?.form.formState.isDirty
    if (isDirtyForm) {
      dialog.show(
        <p>{MESSAGE.CONFIRM_SUBMIT}</p>,
        handleChangeTypeRoomLogic,
        'CONFIRM'
      )
    } else {
      handleChangeTypeRoomLogic()
    }
  }

  const handleEdit = (editedUser : User) => {
    changeTypeActionForm("UPDATE", editedUser)
  }

  const handleActionTypeRoom = (values : FormUserProfile) => {
    loading.show()
    typeActionForm === 'CREATE' 
      ? mutationCreateUser.mutate(values)
      : mutationUpdateUser.mutate(values)
  };

  // mutation for action change status
  const mutationChangeStatusAccount = useMutation<ResponseFormat , unknown , User>({
    mutationFn: async (userUpdated: User) => {
      loading.show()
      userUpdated.status = !userUpdated.status ? 1 : 0
      const gateway = new GateWay('admin' , user.token)
      const response = await gateway.post({action : 'update-user', user_id : userUpdated.id + ''}, userUpdated);
      if (response.status === 200) {
        return response;
      } else if (response.status === 400){
        throw new Error(response.message);
      } else {
        throw new Error(MESSAGE.USER.CHANGE_STATUS.FAIL)
      }
    },
    onSettled: () => {
      loading.hide()
    },
    onSuccess: async (response, updatedUser) => {
      const statusUser = updatedUser.status ? 'ACTIVED' : 'INACTIVED'
      toast.success(MESSAGE.USER.CHANGE_STATUS[statusUser], toastMSGObject());
      setSelectedUser(response.result)
      await queryClient.invalidateQueries([queryKeyAllUser] as RefetchQueryFilters);
    },
    onError: (error) => {
      toast.error((error + '').split(':')[1].trim(), toastMSGObject());
    }
  })

  // mutation for action create
  const mutationCreateUser = useMutation<ResponseFormat , unknown , FormUserProfile>({
    mutationFn: async (newUser: FormUserProfile) => {
      const payloadFormat = formatUpdatedProfile(newUser)
      const gateway = new GateWay('admin' , user.token)
      const response = await gateway.post({action : 'create-user'}, payloadFormat);
      if (response.status === 200) {
        return response;
      } else if (response.status === 400){
        throw new Error(response.message);
      } else {
        throw new Error(MESSAGE.USER.CREATE.FAIL)
      }
    },
    onSettled: () => {
      loading.hide()
    },
    onSuccess: async (data) => {
      toast.success(MESSAGE.USER.CREATE.SUCCESS, toastMSGObject());
      dialog.show(
        <InforGeneratedAccount 
          email={data.result?.email} 
          password={data.result?.password}
        />,
        () => window.scrollTo({ top : 0 , behavior : "smooth" })
      )
      setSelectedUser(initNewUser)
      await queryClient.invalidateQueries([queryKeyAllUser] as RefetchQueryFilters);
    },
    onError: (error) => {
      toast.error((error + '').split(':')[1].trim(), toastMSGObject());
    }
  });

  // mutation for action update
  const mutationUpdateUser = useMutation<ResponseFormat , unknown , FormUserProfile>({
    mutationFn: async (updatedUser: FormUserProfile) => {
      const payloadFormat = formatUpdatedProfile(updatedUser)
      const gateway = new GateWay('admin' , user.token)
      const response = await gateway.post({action : 'update-user', user_id : updatedUser.id + ''}, payloadFormat);
      if (response.status === 200) {
        return response;
      } else if (response.status === 400){
        throw new Error(response.message);
      } else {
        throw new Error(MESSAGE.USER.UPDATE.FAIL)
      }
    },
    onSettled: () => {
      loading.hide()
    },
    onSuccess: async (response) => {
      toast.success(MESSAGE.USER.UPDATE.SUCCESS, toastMSGObject());
      setSelectedUser(response.result)
      await queryClient.invalidateQueries([queryKeyAllUser] as RefetchQueryFilters);
      window.scrollTo({ top : 0 , behavior : "smooth" })
    },
    onError: (error) => {
      toast.error((error + '').split(':')[1].trim(), toastMSGObject());
    }
  });

  //const Width = ({ children }) => children(500)

  return (
    <div>
      <TableHk2t
        isLoadingTable = {false}
        rows={false ? rowsLoading : rows}
        columns={false ? columnsLoading : columns}
        pageSizeOptions={defaultPageSizeOptions}
        rowSelected={selectedUser}
        disabledBtnAdd={typeActionForm === 'CREATE'}
        onActionAdd={() => changeTypeActionForm("CREATE", initNewUser)}
      />
      <div className="un_padding_updown_12"></div>
      <div 
        className="bl_profile"
        ref={formProfileWrapRef}
      >
        <div className="bl_profile_inner">
          <FormUpdateProfile
            key={selectedUser.id}
            ref={formUpdateProfile}
            typeActionForm={typeActionForm}
            user={selectedUser}
            onUpdateProfile={handleActionTypeRoom}
          />
        </div>
      </div>
      {/* <Width>
        {width => <div>window is {width}</div>}
      </Width>
      <div>
        {["Hello ", <span>World</span>, "!"]}
      </div> */}
    </div>
  )
}
