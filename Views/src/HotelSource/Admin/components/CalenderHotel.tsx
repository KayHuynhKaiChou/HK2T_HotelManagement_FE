import { DateSelectArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
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

    if (title) {
      calendarApi.addEvent({
        id: uuid(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay

      })
    }
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth", // we can use timeGridWeek, timeGridDay
      }}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={handleDateSelect}
      events={[
        {
          title: 'All Day Event',
          start: '2024-03-01',
          className: 'css_green'
        },
        {
          title: 'Long Event',
          start: '2024-03-07',
          end: '2024-03-10'
        },
        {
          title: 'Long Event 1',
          start: '2024-03-07',
          end: '2024-03-10'
        },
        {
          title: 'Long Event 2',
          start: '2024-03-07',
          end: '2024-03-10'
        },
        {
          title: 'Long Event 3',
          start: '2024-03-07',
          end: '2024-03-10'
        },
        {
          title: 'Long Event 4',
          start: '2024-03-07',
          end: '2024-03-10'
        },
        {
          title: 'Long Event 5',
          start: '2024-03-07',
          end: '2024-03-10'
        },
        {
          title: 'Long Event 6',
          start: '2024-03-07',
          end: '2024-03-10'
        },
        {
          title: 'Repeating Event',
          start: '2024-03-09'
        },
        {
          title: 'Repeating Event',
          start: '2024-03-16T00:00:00', // 4p Repeating Event hay là 4:00PM
          color: 'red'
        },
        {
          title: 'Conference',
          start: '2024-03-11',
          end: '2024-03-13'
        },
        {
          title: 'Meeting',
          start: '2024-03-12T10:30:00',
          end: '2024-03-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2024-03-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2024-03-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2024-03-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2024-03-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2024-03-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2024-03-28'
        }
    ]}
    />
  );
}
