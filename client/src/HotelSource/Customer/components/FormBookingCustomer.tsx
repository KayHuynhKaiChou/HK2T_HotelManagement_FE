import HotelIcon from '@mui/icons-material/Hotel';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Person3Icon from '@mui/icons-material/Person3';
import DateRangePickerHk2t from '../../../common/DateRangePicker/DateRangePickerHk2t';
import { uuid } from '../../../utils';
import PopoverHk2t, { PopoverHandle } from '../../../common/Popover/PopoverHk2t';
import { MouseEvent, useRef } from 'react';
  
export default function FormBookingCustomer() {
    const uidPopover = `popover-select-quantity-${uuid()}`;
    const popoverRef = useRef<PopoverHandle | null>(null);

    const handleOpenPopover = (e : MouseEvent<HTMLElement>) => {
        popoverRef.current && popoverRef.current.onOpen(e)
    }

    return (
        <div className="bl_formBooking_wrap">
            <div className="bl_formBookingGroup">
                <div className="bl_formBookingGroup_inner">
                    <HotelIcon/>
                    <div className="bl_formBooking_infor">Khách sạn HK2T</div>
                </div>
            </div>
            <div className="bl_formBookingGroup">
                <div className="bl_formBookingGroup_inner">
                    <DateRangeIcon/>
                    <DateRangePickerHk2t/>
                </div>
            </div>
            <div className="bl_formBookingGroup">
                <div className="bl_formBookingGroup_inner">
                    <Person3Icon/>
                    <div
                        aria-describedby={uidPopover} 
                        className="bl_formBooking_infor"
                        onClick={handleOpenPopover}
                    >
                        {`2 adults - 1 children`}
                    </div>
                    <PopoverHk2t
                        id={uidPopover}
                        ref={popoverRef}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                    >
                        <div className="bl_dropdown_inner">
                            <div className="bl_dropdown_item form_booking">
                                <div className="bl_dropdown_item_ttl">Adult</div>
                                <div className="bl_dropdown_textFieldNumber">
                                    <div className="bl_act_btn">+</div>
                                    <div className="bl_quantityPerson">2</div>
                                    <div className="bl_act_btn">-</div>
                                </div>
                            </div>
                        </div>
                    </PopoverHk2t>
                </div>
            </div>
            <div className="bl_formBookingGroup">
                <div className="bl_formBookingGroup_btn">
                    booking now
                </div>
            </div>
        </div>
    )
}
