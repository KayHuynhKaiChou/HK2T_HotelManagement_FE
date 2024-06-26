import { useSelector } from "react-redux";
import FormTypeRoom from "./FormTypeRoom";
import { RootState } from "../../../redux/reducers";
import { TypeRoom } from "../../../types/models";
import { toast } from "react-toastify";
import { convertAmenitiesArrayToObject, toastMSGObject } from "../../../utils";
import GateWay from "../../../lib/api_gateway";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function TypeRoomAdmin() {
    const {amenities} = useSelector<RootState , RootState>(state => state);

    const typesObjAmenity = useMemo(() => {
      return convertAmenitiesArrayToObject(amenities)
    },[amenities])

    const mutationCreateTypeRoom = useMutation<TypeRoom , unknown , TypeRoom>({
      mutationFn: async (data: TypeRoom) => {
        const gateway = new GateWay("admin")
        const res = await gateway.post({ action : "create" } , data)
        return res.result
      },
      onSuccess: () => {
        toast.success("Thêm sản phẩm mới thành công", toastMSGObject());
      },
      onError: () => {
        toast.error("Thêm sản phẩm mới thất bại", toastMSGObject());
      },
      onSettled: () => {
        //queryAllProducts.refetch();
      }
    });

    const handleActionTypeRoom = (values : TypeRoom) => {
      mutationCreateTypeRoom.mutate(values);
    };

    return (
        <div className="bl_profile">
            <div className="bl_profile_inner">
                <FormTypeRoom
                  typesObjAmenity={typesObjAmenity}
                  onActionTypeRoom={handleActionTypeRoom}
                />
            </div>
        </div>
    )
}
