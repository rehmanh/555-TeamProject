// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction'; // import interactionPlugin
// import { v4 as uuidv4 } from 'uuid';

// const API_URL = '';

// const Calendar = () => {
//     const [events, setEvents] = useState([]);
//     const [eventDetails, setEventDetails] = useState({
//         id: null,
//         start: null,
//         end: null,
//         request_id: '',
//         pref_install_start_date: '', 
//         pref_install_end_date: '',
//         editable: true,
//     });

//     const handleEventClick = ({ event }) => {
//         setEventDetails({
//             id: event.id,
//             start: event.start,
//             end: event.end,
//             title: event.title,
//             description: event.extendedProps.description,
//             editable: true,
//         });
//     };
//     // const handleEventClick = ({ event }) => {
//     //     setEventDetails({
//     //         id: event.id,
//     //         start: event.start,
//     //         end: event.end,
//     //         title: event.title,
//     //         description: event.extendedProps.description,
//     //         editable: true,
//     //     });
//     // };

//     // const handleEventDoubleClick = ({ event }) => {
//     //     if (window.confirm(`Are you sure you want to delete "${event.title}"`)) {
//     //         setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
//     //         axios.delete(`${API_URL}/${event.id}`);
//     //     }
//     // };
//     const handleEventDoubleClick = ({ event }) => {
//         if (window.confirm(`Are you sure you want to delete "${event.title}"`)) {
//             setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
//         }
//     };

//     const handleDateClick = ({ date }) => {
//         setEventDetails({
//             start: date,
//             end: new Date(date.getTime() + 60 * 60 * 1000), // set default end time to 1 hour after start time
//         });
//     };


//     // const handleEventChange = ({ target: { name, value } }) => {
//     //     setEventDetails((prevDetails) => {
//     //         if (prevDetails) {
//     //             if (name === 'end') {
//     //                 value = new Date(value);
//     //             }
//     //             return {
//     //                 ...prevDetails,
//     //                 [name]: value,
//     //             };
//     //         } else {
//     //             return null;
//     //         }
//     //     });
//     // };
//     const handleEventChange = ({ target: { name, value } }) => {
//         setEventDetails((prevDetails) => {
//             if (prevDetails) {
//                 if (name === 'end') {
//                     value = new Date(value);
//                 }
//                 return {
//                     ...prevDetails,
//                     [name]: value,
//                 };
//             } else {
//                 return null;
//             }
//         });
//     };

//     // const handleEventSubmit = (e) => {
//     //     e.preventDefault();
//     //     const { id, start, end, title, description } = eventDetails || {};
//     //     if (id) {
//     //         setEvents((prevEvents) =>
//     //             prevEvents.map((event) => {
//     //                 if (event.id === id) {
//     //                     return {
//     //                         ...event,
//     //                         start,
//     //                         end,
//     //                         title,
//     //                         extendedProps: {
//     //                             ...event.extendedProps,
//     //                             description,
//     //                         },
//     //                     };
//     //                 }
//     //                 return event;
//     //             })
//     //         );
//     //         axios.put(`${API_URL}/${id}`, {
//     //             start,
//     //             end,
//     //             title,
//     //             description,
//     //         });
//     //     } else {
//     //         const newEvent = {
//     //             id: uuidv4(),
//     //             start,
//     //             end,
//     //             title,
//     //             extendedProps: {
//     //                 description,
//     //             },
//     //         };
//     //         setEvents((prevEvents) => [
//     //             ...prevEvents,
//     //             newEvent,
//     //         ]);
//     //         axios.post(API_URL, newEvent);
//     //     }
//     //     setEventDetails(null);
//     // };


//     const handleEventSubmit = (e) => {
//         e.preventDefault();
//         if (e.nativeEvent.submitter.id === 'cancel-button') {
//             setEventDetails(null);
//             return;
//         }
//         const { id, start, end, title, description } = eventDetails || {};
//         if (id) {
//             setEvents((prevEvents) =>
//                 prevEvents.map((event) => {
//                     if (event.id === id) {
//                         return {
//                             ...event,
//                             start,
//                             end,
//                             title,
//                             extendedProps: {
//                                 ...event.extendedProps,
//                                 description,
//                             },
//                         };
//                     }
//                     return event;
//                 })
//             );
//         } else {
//             setEvents((prevEvents) => [
//                 ...prevEvents,
//                 {
//                     id: uuidv4(),
//                     start,
//                     end,
//                     title,
//                     extendedProps: {
//                         description,
//                     },
//                 },
//             ]);
//         }
//         setEventDetails(null);
//     };
//     // const handleEventSubmit = (e) => {
//     //     e.preventDefault();
//     //     const { id, start, end, title, description } = eventDetails || {};
//     //     if (id) {
//     //         setEvents((prevEvents) =>
//     //             prevEvents.map((event) => {
//     //                 if (event.id === id) {
//     //                     return {
//     //                         ...event,
//     //                         start,
//     //                         end,
//     //                         title,
//     //                         extendedProps: {
//     //                             ...event.extendedProps,
//     //                             description,
//     //                         },
//     //                     };
//     //                 }
//     //                 return event;
//     //             })
//     //         );
//     //     } else {
//     //         setEvents((prevEvents) => [
//     //             ...prevEvents,
//     //             {
//     //                 id: uuidv4(),
//     //                 start,
//     //                 end,
//     //                 title,
//     //                 extendedProps: {
//     //                     description,
//     //                 },
//     //             },
//     //         ]);
//     //     }
//     //     setEventDetails(null);
//     // };
//     const eventRender = ({ event, el }) => {
//         const { title, request_id, pref_install_start_date, pref_install_end_date } = event.extendedProps;
//         el.innerHTML = `${title}<br />Request ID: ${request_id}<br />Start Date: ${pref_install_start_date}<br />End Date: ${pref_install_end_date}`;
//     };

//     return (
//         <div className="calendar">
//             <FullCalendar
//                 defaultAllDayEventDuration={{ days: 1 }}
//                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // add interactionPlugin to plugins
//                 initialView="dayGridMonth"
//                 events={events}
//                 headerToolbar={{
//                     left: 'prev,next today',
//                     center: 'title',
//                     right: 'dayGridMonth,timeGridWeek,timeGridDay',
//                 }}
//                 selectable={true}
//                 editable={true}
//                 eventClick={handleEventClick}
//                 eventDoubleClick={handleEventDoubleClick}
//                 dateClick={handleDateClick}
//                 select={(arg) =>
//                     setEventDetails({
//                         start: arg.start,
//                         end: arg.end,
//                     })
//                 }
//                 eventDrop={({ event }) =>
//                     setEvents((prevEvents) =>
//                         prevEvents.map((prevEvent) => {
//                             if (prevEvent.id === event.id) {
//                                 return {
//                                     ...prevEvent,
//                                     start: event.start,
//                                     end: event.end,
//                                 };
//                             }
//                             return prevEvent;
//                         })
//                     )
//                 }
//                 eventResize={({ event }) =>
//                     setEvents((prevEvents) =>
//                         prevEvents.map((prevEvent) => {
//                             if (prevEvent.id === event.id) {
//                                 return {
//                                     ...prevEvent,
//                                     start: event.start,
//                                     end: event.end,
//                                 };
//                             }
//                             return prevEvent;
//                         })
//                     )
//                 }
//                 eventContent={({ event }) => (
//                     <div>
//                         <div>{event.title}</div>
//                         <div>
//                             {event.start && event.start.toLocaleDateString()} - {event.end && event.end.toLocaleDateString()}
//                         </div>
//                     </div>
//                 )}
//                 eventDisplay="block"
//                 dayMaxEvents={3}
//                 eventRender={eventRender}
//             />
//             {eventDetails && (
//                 <div className="event-details">
//                     <form onSubmit={handleEventSubmit}>
//                         <h2>{eventDetails.id ? 'Edit Event' : 'Add Event'}</h2>
//                         <label htmlFor="title">Title</label>
//                         <input
//                             type="text"
//                             id="title"
//                             name="title"
//                             value={eventDetails.title || ''}
//                             onChange={handleEventChange}
//                             required
//                         />
//                         <label htmlFor="description">Description</label>
//                         <textarea
//                             id="description"
//                             name="description"
//                             value={eventDetails.description || ''}
//                             onChange={handleEventChange}
//                         />
//                         <div className="event-time">
//                             <div>
//                                 <label htmlFor="start">Start Time</label>
//                                 <input
//                                     type="datetime-local"
//                                     id="start"
//                                     name="start"
//                                     value={
//                                         eventDetails.start &&
//                                         eventDetails.start.toISOString().slice(0, 16)
//                                     }
//                                     onChange={handleEventChange}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="end">End Time</label>
//                                 <input
//                                     type="datetime-local"
//                                     id="end"
//                                     name="end"
//                                     value={
//                                         eventDetails.end instanceof Date &&
//                                         eventDetails.end.toISOString().slice(0, 16)
//                                     }
//                                     onChange={handleEventChange}
//                                     required
//                                 />
//                             </div>
//                         </div>

//                         <button type="submit">{eventDetails.id ? 'Save' : 'Add'}</button>
//                         {eventDetails.id && (
//                             <button
//                                 type="button"
//                                 className="delete-button"
//                                 onClick={() => {
//                                     if (
//                                         window.confirm(
//                                             `Are you sure you want to delete "${eventDetails.title}"?`
//                                         )
//                                     ) {
//                                         setEvents((prevEvents) =>
//                                             prevEvents.filter((event) => event.id !== eventDetails.id)
//                                         );
//                                         setEventDetails(null);
//                                     }
//                                 }}
//                             >
//                                 Delete
//                             </button>
//                         )}
//                     </form>
//                 </div>
//             )}
//         </div >
//     );
// };

// export default Calendar;

// import React, { useState, useEffect, useRef } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// // import '@fullcalendar/core/main.css';
// // import '@fullcalendar/daygrid/main.css';
// // import '@fullcalendar/timegrid/main.css';

// export default function Scheduler() {
//     const calendarRef = useRef(null); 
//     const [requests, setRequests] = useState([]);

//     useEffect(() => {
//         const fetchRequests = async () => {
//             try {
//                 const response = await fetch('https://m90c2ol29g.execute-api.us-east-1.amazonaws.com/UAT');
//                 if (response.ok) {
//                     const data = await response.json();
//                     setRequests(data);
//                 } else {
//                     console.error('Failed to fetch requests:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };

//         fetchRequests();
//     }, []);


//     const handleEventClick = (eventInfo) => {
//         const requestId = eventInfo.event.extendedProps.requestId;
//         fetch(`https://your-api-endpoint/${requestId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ /* Update request data */ })
//         })
//             .then(response => {
//                 if (response.ok) {
//                     toast.success('Request modified successfully!');
//                     // Refresh the FullCalendar to reflect the changes
//                     calendarRef.current.getApi().refetchEvents();
//                 } else {
//                     alert('Failed to modify request. Please try again.');
//                 }
//             })
//             .catch(error => {
//                 // Error handling
//                 console.error('Error:', error);
//                 alert('Failed to modify request. Please try again.');
//             });
//     };

//     return (
//         <div>
//             <FullCalendar
//                 ref={calendarRef}
//                 plugins={[dayGridPlugin, timeGridPlugin]}
//                 initialView="dayGridMonth"
//                 events={requests.map(request => ({
//                     title: `Request ID: ${request.request_id}`,
//                     start: request.pref_install_start_date,
//                     end: request.pref_install_end_date,
//                     extendedProps: {
//                         requestId: request.request_id
//                     }
//                 }))}
//                 eventClick={handleEventClick}
//             />
//             <ToastContainer />
//         </div>
//     );
// }


// import React from 'react';
// import { Responsive, WidthProvider } from 'react-grid-layout';
// import 'react-grid-layout/css/styles.css';
// import 'react-resizable/css/styles.css';
// // import './App.css';

// const ResponsiveGridLayout = WidthProvider(Responsive);

// const Card = ({ title, color, width, height, x, y }) => {
//     const cardStyle = {
//         backgroundColor: color,
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         cursor: 'move',
//         resize: 'both',
//         overflow: 'auto',
//         padding: '10px'
//     };

//     return (
//         <div style={cardStyle}>
//             <h5>{title}</h5>
//             <p>Position: {`(${x}, ${y})`}</p>
//             <p>Size: {`(${width}, ${height})`}</p>
//         </div>
//     );
// };

// const App = () => {
//     const handleLayoutChange = (layout) => {
//         console.log('Layout changed:', layout);
//     };

//     const cards = [
//         { title: 'Card 1', color: 'lightblue', width: 2, height: 2 },
//         { title: 'Card 2', color: 'lightgreen', width: 2, height: 4 },
//         { title: 'Card 3', color: 'lightpink', width: 2, height: 2 },
//         { title: 'Card 4', color: 'lightyellow', width: 2, height: 3 }
//     ];

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4">Draggable and Resizable Cards</h2>
//             <ResponsiveGridLayout
//                 className="layout"
//                 breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//                 cols={{ lg: 8, md: 6, sm: 4, xs: 2, xxs: 1 }}
//                 rowHeight={100}
//                 onLayoutChange={handleLayoutChange}
//             >
//                 {cards.map((card, index) => (
//                     <div key={index} data-grid={{ w: card.width, h: card.height, x: index % 8, y: Math.floor(index / 8) }}>
//                         <Card
//                             title={card.title}
//                             color={card.color}
//                             width={card.width}
//                             height={card.height}
//                             x={index % 8}
//                             y={Math.floor(index / 8)}
//                         />
//                     </div>
//                 ))}
//             </ResponsiveGridLayout>
//         </div>
//     );
// };

// export default App;