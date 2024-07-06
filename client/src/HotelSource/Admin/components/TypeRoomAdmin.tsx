import { useSelector } from "react-redux";
import FormTypeRoom from "./FormTypeRoom";
import { RootState } from "../../../redux/reducers";
import { TypeRoom } from "../../../types/models";
import { toast } from "react-toastify";
import { convertAmenitiesArrayToObject, toastMSGObject, uuid } from "../../../utils";
import GateWay from "../../../lib/api_gateway";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import TableHk2t from "../../../common/Table/TableHk2t";
import { ColumnType } from "../../../types/supportUI";
import { Grid, Switch } from "@mui/material";
import ButtonHk2t from "../../../common/ButtonHk2t";
import { Delete, Edit } from "@mui/icons-material";
import { colorsBtnCustom, columnsLoading, defaultPageSizeOptions, defaultViewDirection, rowsLoading } from "../../../utils/constants";
import { ActionForm } from "../../../types/form";
import LoadingHk2t from "../../../common/LoadingHk2t";

const HEIGHT_MENU_HEADER = 64 as const;
const PADDING_UPDOWN_12 = 24 as const;

export default function TypeRoomAdmin() {
  const {amenities , user} = useSelector<RootState , RootState>(state => state);
  const [typeActionForm , setTypeActionForm] = useState<ActionForm>('CREATE');
  const [selectedTypeRoom , setSelectedTypeRoom] = useState<TypeRoom | undefined>(undefined);
  const formTypeRoomWrapRef = useRef<HTMLDivElement | null>(null);
  // map data
  const typesObjAmenity = useMemo(() => {
    return convertAmenitiesArrayToObject(amenities)
  },[amenities])

  // handle scroll
  const scrollToForm = () => {
    if(formTypeRoomWrapRef.current){
      const bodyElement = document.body;
      const offset = HEIGHT_MENU_HEADER + PADDING_UPDOWN_12; // Khoảng cách tùy chỉnh từ trên
      const containerTop = bodyElement.getBoundingClientRect().top;
      const targetTop = formTypeRoomWrapRef.current.getBoundingClientRect().top;
      const scrollPosition = bodyElement.scrollTop + (targetTop - containerTop) - offset;
      // ko dùng đc bodyElement.scrollTo , dùng window
      window.scrollTo({ top : scrollPosition , behavior : "smooth" })
      //formTypeRoomWrapRef.current.scrollIntoView({behavior : "smooth"}) 
      //cách dùng scrollIntoView ko nên sài vì ko đạt đc yêu cầu mong muốn
    } 
  }

  // change state
  const changeTypeActionForm = (actForm : ActionForm) => { 
    scrollToForm();   
    setTypeActionForm(actForm)
  }

  const handleEdit = (editedTypeRoom : TypeRoom) => {
    setSelectedTypeRoom(editedTypeRoom)
    changeTypeActionForm("UPDATE")
  }

  // query for action get all
  const fetchGetAllTypeRoom = async () => {
    const gateway = new GateWay('admin' , user.token)
    const res = await gateway.get({action : 'show-tr'});
    return res.result
  }

  const queryKey = useMemo(() => {
    return `all-type-room-${uuid()}`
  },[])

  const {
    data : listTypeRooms , 
    isLoading : isLoadingAllTypeRoom ,
    refetch : refetchAllTypeRoom
  } = useQuery<TypeRoom[]>({
    queryKey : [queryKey] , 
    queryFn: fetchGetAllTypeRoom 
  });

  // mutation for action create
  const mutationCreateTypeRoom = useMutation<TypeRoom , unknown , TypeRoom>({
    mutationFn: async (data: TypeRoom) => {
      const gateway = new GateWay("admin" , user.token)
      const res = await gateway.post({ action : "create-tr" } , data)
      return res.result
    },
    onSuccess: () => {
      toast.success("Thêm sản phẩm mới thành công", toastMSGObject());
    },
    onError: () => {
      toast.error("Thêm sản phẩm mới thất bại", toastMSGObject());
    },
    onSettled: () => {
      refetchAllTypeRoom();
    }
  });

  // mutation for action update
  const mutationUpdateTypeRoom = useMutation<TypeRoom , unknown , TypeRoom>({
    mutationFn: async (data: TypeRoom) => {
      const gateway = new GateWay("admin" , user.token)
      const res = await gateway.post({ action : "update-tr" , type_room_id : selectedTypeRoom?.id + ''} , data)
      return res.result
    },
    onSuccess: () => {
      toast.success("Chỉnh sửa sản phẩm thành công", toastMSGObject());
    },
    onError: () => {
      toast.error("Chỉnh sửa sản phẩm thất bại", toastMSGObject());
    },
    onSettled: () => {
      refetchAllTypeRoom();
    }
  });

  const handleActionTypeRoom = (values : TypeRoom) => {
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
        width : 450
      },
      {
        id : `field-size-${uuid()}`,
        nameCol : 'size',
        label : 'size (m²)',
        width : 250,
        textAlign : 'center',
        isSorted : true
      },
      {
        id : `field-view_direction-${uuid()}`,
        nameCol : 'view_direction',
        label : 'view direction',
        textAlign : 'center'
      },
      {
        id : `field-adult_capacity-${uuid()}`,
        nameCol : 'adult_capacity',
        label : 'quantity adult',
        width : 30,
        textAlign : 'center'
      },
      {
        id : `field-kids_capacity-${uuid()}`,
        nameCol : 'kids_capacity',
        label : 'quantity kids',
        width : 30,
        textAlign : 'center'
      },
      {
        id : `field-base_price-${uuid()}`,
        nameCol : 'base_price',
        label : 'base price (vnđ)',
        width : 300
      },
      {
        id : `field-status-${uuid()}`,
        nameCol : 'status',
        width : 80
      },
      {
        id : `field-action-${uuid()}`,
        nameCol : 'action',
        width : 200,
        textAlign : 'center'
      }
    ]
  },[])

  const rows = useMemo(() => {
    if(!listTypeRooms) return [];
    return listTypeRooms
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
          status : <Switch defaultChecked={!!typeRoom.status} />,
          action : (
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <ButtonHk2t
                  typeCustom="icon"
                  Icon={Edit}
                  onClick={() => handleEdit(typeRoom)}
                />
              </Grid>
              <Grid item sm={6}>
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
  },[listTypeRooms])

  return (
    <>
      {isLoadingAllTypeRoom && <LoadingHk2t/> }
      <TableHk2t
        isLoadingTable={isLoadingAllTypeRoom}
        rows={isLoadingAllTypeRoom ? rowsLoading : rows}
        columns={isLoadingAllTypeRoom ? columnsLoading : columns}
        pageSizeOptions={defaultPageSizeOptions}
        onActionAdd={() => changeTypeActionForm("CREATE")}
        onExportExcel={() => {}}
      />
      <div className="un_padding_updown_12"></div>
      <div 
        className="bl_profile"
        ref={formTypeRoomWrapRef}
      >
        <div className="bl_profile_inner">
          <FormTypeRoom
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
