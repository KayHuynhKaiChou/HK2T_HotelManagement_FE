import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import {Tooltip} from "@mui/material";
import ButtonHk2t from "../../../common/ButtonHk2t";
import AddIcon from '@mui/icons-material/Add';

interface CalenderHotelProps {
  resources : any;
  events : any;
  onSelectEvent ?: (id: number) => void;
  onSelectDateRange ?: (startDate: string, endDate: string, resourceId: string) => void;
  onSelectRoom ?: (roomId: number) => void
  onOpenFormCreateRoom ?: () => void;
}

export default function CalenderHotel({
  resources , 
  events , 
  onSelectEvent ,
  onSelectDateRange ,
  onSelectRoom ,
  onOpenFormCreateRoom
} : CalenderHotelProps ) {

  const handleSelect = ({event} : EventClickArg) => {
    const selectedIdReversation = event._def.publicId
    onSelectEvent && onSelectEvent(Number(selectedIdReversation))
  }

  const handleSelectDateRange = (selectInfo : DateSelectArg) => {
    onSelectDateRange && onSelectDateRange(
      selectInfo.startStr,
      selectInfo.endStr,
      selectInfo.resource ? selectInfo.resource.id : '0'
    )
  }

  // const handleDateSelect = (selectInfo : DateSelectArg) => {
  //   const title = prompt('Please enter a new title for your event')
  //   const calendarApi = selectInfo.view.calendar

  //   calendarApi.unselect() // clear date selection
  //   console.log(selectInfo.resource?._resource)
  //   if (title) {
  //     calendarApi.addEvent({
  //       id: uuid(),
  //       resourceId: selectInfo.resource?._resource.id,
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       color: 'red'
  //     })
  //   }
  // }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimeGridPlugin, resourceTimelinePlugin]}
      headerToolbar={{
        left: 'today prev,next',
        center: 'title',
        right: 'resourceTimelineMonth'
      }}
      height="auto"
      initialView='resourceTimelineMonth'
      resourceAreaHeaderContent={() => (
        <div className="un_areaHeaderCalender">
          <div className="un_labelHeader">Rooms</div>
          <ButtonHk2t
            content='add'
            startIcon={<AddIcon/>}
            onClick={onOpenFormCreateRoom}
          />
        </div>
      )}
      resources={resources}
      resourceOrder={"title"}
      events={events}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={handleSelectDateRange}
      // select={handleDateSelect}
      eventClick={handleSelect}
      resourceLabelContent={(resourceInfo) => {
        const titleToolTip = `Edit information of ${resourceInfo.resource.title.split('(')[0]} by click`
        return (
          <Tooltip title={titleToolTip} placement="top-start">
            <div 
              className="ellipsis un_resource_calendar"
              onClick={() => onSelectRoom && onSelectRoom(Number(resourceInfo.resource.id))}
            >
              {resourceInfo.resource.title}
            </div>
          </Tooltip>
        )
      }}
      eventContent={(eventInfo) => (
        <Tooltip title={eventInfo.event.title} arrow placement="top">
          <div className="ellipsis">{eventInfo.event.title}</div>
        </Tooltip>
      )}
    />
  );
}
