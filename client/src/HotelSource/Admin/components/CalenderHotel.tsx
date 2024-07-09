import { DateSelectArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { uuid } from "../../../utils";

export default function CalenderHotel() {

  // note 
  // green : phòng chưa có ai book
  // xanh lam : book phòng xong mà chưa tới ngày start
  // vàng : tới ngày start và đến ngày end
  // đỏ : chưa thanh toán , nếu đã thanh toán rồi thì tự mất event luôn , ko cần chuyển từ vàng sang đỏ

  const handleDateSelect = (selectInfo : DateSelectArg) => {
    const title = prompt('Please enter a new title for your event')
    const calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection
    console.log(selectInfo.resource?._resource)
    if (title) {
      calendarApi.addEvent({
        id: uuid(),
        resourceId: selectInfo.resource?._resource.id,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr
      })
    }
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin, resourceTimelinePlugin]}
      headerToolbar={{
        left: 'today prev,next',
        center: 'title',
        right: 'resourceTimelineMonth'
      }}
      initialView='resourceTimelineMonth'
      resourceAreaHeaderContent='Rooms'
      resources='https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors'
      events='https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline'
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={handleDateSelect}
      //eventClick={}
    />
  );
}
