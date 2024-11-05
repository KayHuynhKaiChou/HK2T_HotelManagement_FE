import { useSelector } from "react-redux";
import FormTypeRoom, { FormTypeRoomHandle } from "./FormTypeRoom";
import { RootState } from "../../../redux/reducers";
import { TypeRoom } from "../../../types/models";
import { toast } from "react-toastify";
import { convertAmenitiesArrayToObject, formatCurrency, scrollToForm, toastMSGObject, uuid } from "../../../utils";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import TableHk2t from "../../../common/Table/TableHk2t";
import { ColumnType } from "../../../types/supportUI";
import { Chip } from "@mui/material";
import ButtonHk2t from "../../../common/ButtonHk2t";
import { Edit } from "@mui/icons-material";
import { defaultPageSizeOptions, defaultstatus, defaultViewDirection } from "../../../utils/constants";
import { ActionForm } from "../../../types/form";
import { useDispatch } from "react-redux";
import { typeRoomAction } from "../../../redux/actions/typeRoom";
import { MESSAGE } from "../../../utils/messages";
import { useDialogHk2t } from "../../../common/Dialog/dialogHk2t";
import { useLoadingHk2tScreen } from "../../../common/Loading/LoadingHk2tScreen";
import { ResponseFormat } from "../../../types/response";

const initValues : TypeRoom = {
  id: 0,
  title : '',
  preferential_services : '',
  view_direction : 1,
  size : 0,
  adult_capacity : 0,
  kids_capacity : 0,
  base_price : 0,
  amenities : [],
  images : [],
  status : 1,
  created_at : '',
  updated_at : ''
}

export default function TypeRoomAdmin() {
  const {amenities, typeRooms} = useSelector<RootState , RootState>(state => state);
  const dispatch = useDispatch();
  const [typeActionForm , setTypeActionForm] = useState<ActionForm>('CREATE');
  const [selectedTypeRoom , setSelectedTypeRoom] = useState<TypeRoom>(initValues);
  const formTypeRoomWrapRef = useRef<HTMLDivElement | null>(null);
  const formTypeRoomRef = useRef<FormTypeRoomHandle | null>(null);

  //common useContext
  const dialog = useDialogHk2t();
  const loading = useLoadingHk2tScreen();

  // map data
  const typesObjAmenity = useMemo(() => {
    return convertAmenitiesArrayToObject(amenities)
  },[amenities])
  
  // change state
  const changeTypeActionForm = (actForm : ActionForm, typeRoomParam : TypeRoom) => { 
    const handleChangeTypeRoomLogic = () => {
      setTimeout(() => {
        scrollToForm(formTypeRoomWrapRef);   
      }, 800);
      setTypeActionForm(actForm)
      setSelectedTypeRoom(typeRoomParam)
    }
    const isDirtyForm = formTypeRoomRef.current?.form.formState.isDirty
    if (isDirtyForm) {
      dialog.show(
        <b>{MESSAGE.CONFIRM_SUBMIT}</b>,
        handleChangeTypeRoomLogic,
        'CONFIRM'
      )
    } else {
      handleChangeTypeRoomLogic()
    }
  }

  const handleEdit = (editedTypeRoom : TypeRoom) => {
    changeTypeActionForm("UPDATE", editedTypeRoom)    
  }

  // mutation for action create
  const mutationCreateTypeRoom = useMutation<ResponseFormat , unknown , TypeRoom>({
    mutationFn: async (data: TypeRoom) => {
      const response = await dispatch(typeRoomAction.createNewTypeRoom(data) as any).then()
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
    onSuccess: () => {
      toast.success(MESSAGE.TYPE_ROOM.CREATE.SUCCESS, toastMSGObject());
      setSelectedTypeRoom(initValues)
      window.scrollTo({ top : 0 , behavior : "smooth" })
    },
    onError: () => {
      toast.error(MESSAGE.TYPE_ROOM.CREATE.FAIL, toastMSGObject());
    }
  });

  // mutation for action update
  const mutationUpdateTypeRoom = useMutation<ResponseFormat , unknown , TypeRoom>({
    mutationFn: async (data: TypeRoom) => {
      const response = await dispatch(typeRoomAction.updateTypeRoom(selectedTypeRoom?.id + '' ,data) as any)
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
    onSuccess: (response) => {
      toast.success(MESSAGE.TYPE_ROOM.UPDATE.SUCCESS, toastMSGObject());
      setSelectedTypeRoom(response.result)
      window.scrollTo({ top : 0 , behavior : "smooth" })
    },
    onError: () => {
      toast.error(MESSAGE.TYPE_ROOM.UPDATE.FAIL, toastMSGObject());
    },
  });

  const handleActionTypeRoom = (values : TypeRoom) => {
    loading.show()
    typeActionForm === 'CREATE' 
      ? mutationCreateTypeRoom.mutate(values)
      : mutationUpdateTypeRoom.mutate(values)
  };

  // define columns and rows
  const columns = useMemo<ColumnType[]>(() => {
    return [
      {
        id : `field-stt-${uuid()}`,
        nameCol : 'stt',
        width : 20,
        textAlign : 'center'
      },
      {
        id : `field-title-${uuid()}`,
        nameCol : 'title',
        width : 450,
        isSearched : true
      },
      {
        id : `field-size-${uuid()}`,
        nameCol : 'size',
        label : 'size (m²)',
        width : 150,
        textAlign : 'center',
        isSorted : true
      },
      {
        id : `field-view_direction-${uuid()}`,
        nameCol : 'view_direction',
        label : 'view direction',
        textAlign : 'center',
        isSearched : true,
        criteria : defaultViewDirection.map(vd => ({
          label: vd,
          condition: vd
        }))
      },
      {
        id : `field-adult_capacity-${uuid()}`,
        nameCol : 'adult_capacity',
        label : 'quantity adult',
        width : 30,
        isSorted : true,
        textAlign : 'center'
      },
      {
        id : `field-kids_capacity-${uuid()}`,
        nameCol : 'kids_capacity',
        label : 'quantity kids',
        width : 30,
        isSorted : true,
        textAlign : 'center'
      },
      {
        id : `field-base_price-${uuid()}`,
        nameCol : 'base_price',
        label : 'base price (vnđ)',
        width : 300,
        isSorted : true,
        render : (value) => <b>{formatCurrency(value)}</b>
      },
      {
        id : `field-status-${uuid()}`,
        nameCol : 'status',
        width : 80,
        render : (value) => (
          <Chip 
            color={!!value ? 'success' : 'error'} 
            label={defaultstatus[value]}
          />
        )
      },
      {
        id : `field-edit-${uuid()}`,
        nameCol : 'edit',
        width : 200,
        textAlign : 'center'
      }
    ]
  },[])

  const rows = useMemo(() => {
    if(!typeRooms) return [];
    return typeRooms
      .map((typeRoom , index) => {
        return {
          id : typeRoom.id,
          stt : index + 1,
          title : typeRoom.title,
          size : typeRoom.size,
          view_direction : typeRoom.view_direction === 1 
                            ? defaultViewDirection[0] : defaultViewDirection[1],
          adult_capacity : typeRoom.adult_capacity,
          kids_capacity : typeRoom.kids_capacity,
          base_price : typeRoom.base_price,        
          status : typeRoom.status,
          edit : (
            <ButtonHk2t
              typeCustom="icon"
              Icon={Edit}
              // disabled={typeActionForm === 'UPDATE' && typeRoom.id === selectedTypeRoom.id}
              onClick={() => handleEdit(typeRoom)}
            />
          )
        }
      })
  },[typeRooms])

  return (
    <>
      <TableHk2t
        rows={rows}
        columns={columns}
        pageSizeOptions={defaultPageSizeOptions}
        rowSelected={selectedTypeRoom}
        disabledBtnAdd={typeActionForm === 'CREATE'}
        onActionAdd={() => changeTypeActionForm("CREATE", initValues)}
        onExportExcel={() => {}}
      />
      <div className="un_padding_updown_12"></div>
      <div 
        className="bl_profile"
        ref={formTypeRoomWrapRef}
      >
        <div className="bl_profile_inner">
          <FormTypeRoom
            key={selectedTypeRoom.id + uuid()}
            ref={formTypeRoomRef}
            selectedTypeRoom={selectedTypeRoom}
            typeActionForm={typeActionForm}
            typesObjAmenity={typesObjAmenity}
            onActionTypeRoom={handleActionTypeRoom}
          />
        </div>
      </div>
    </>
  )
}
