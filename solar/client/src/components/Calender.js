import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // import interactionPlugin
import { v4 as uuidv4 } from 'uuid';

const API_URL = '';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [eventDetails, setEventDetails] = useState(null);

    const handleEventClick = ({ event }) => {
        setEventDetails({
            id: event.id,
            start: event.start,
            end: event.end,
            title: event.title,
            description: event.extendedProps.description,
            editable: true,
        });
    };
    // const handleEventClick = ({ event }) => {
    //     setEventDetails({
    //         id: event.id,
    //         start: event.start,
    //         end: event.end,
    //         title: event.title,
    //         description: event.extendedProps.description,
    //         editable: true,
    //     });
    // };

    // const handleEventDoubleClick = ({ event }) => {
    //     if (window.confirm(`Are you sure you want to delete "${event.title}"`)) {
    //         setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
    //         axios.delete(`${API_URL}/${event.id}`);
    //     }
    // };
    const handleEventDoubleClick = ({ event }) => {
        if (window.confirm(`Are you sure you want to delete "${event.title}"`)) {
            setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
        }
    };

    const handleDateClick = ({ date }) => {
        setEventDetails({
            start: date,
            end: new Date(date.getTime() + 60 * 60 * 1000), // set default end time to 1 hour after start time
        });
    };


    // const handleEventChange = ({ target: { name, value } }) => {
    //     setEventDetails((prevDetails) => {
    //         if (prevDetails) {
    //             if (name === 'end') {
    //                 value = new Date(value);
    //             }
    //             return {
    //                 ...prevDetails,
    //                 [name]: value,
    //             };
    //         } else {
    //             return null;
    //         }
    //     });
    // };
    const handleEventChange = ({ target: { name, value } }) => {
        setEventDetails((prevDetails) => {
            if (prevDetails) {
                if (name === 'end') {
                    value = new Date(value);
                }
                return {
                    ...prevDetails,
                    [name]: value,
                };
            } else {
                return null;
            }
        });
    };

    // const handleEventSubmit = (e) => {
    //     e.preventDefault();
    //     const { id, start, end, title, description } = eventDetails || {};
    //     if (id) {
    //         setEvents((prevEvents) =>
    //             prevEvents.map((event) => {
    //                 if (event.id === id) {
    //                     return {
    //                         ...event,
    //                         start,
    //                         end,
    //                         title,
    //                         extendedProps: {
    //                             ...event.extendedProps,
    //                             description,
    //                         },
    //                     };
    //                 }
    //                 return event;
    //             })
    //         );
    //         axios.put(`${API_URL}/${id}`, {
    //             start,
    //             end,
    //             title,
    //             description,
    //         });
    //     } else {
    //         const newEvent = {
    //             id: uuidv4(),
    //             start,
    //             end,
    //             title,
    //             extendedProps: {
    //                 description,
    //             },
    //         };
    //         setEvents((prevEvents) => [
    //             ...prevEvents,
    //             newEvent,
    //         ]);
    //         axios.post(API_URL, newEvent);
    //     }
    //     setEventDetails(null);
    // };


    const handleEventSubmit = (e) => {
        e.preventDefault();
        if (e.nativeEvent.submitter.id === 'cancel-button') {
            setEventDetails(null);
            return;
        }
        const { id, start, end, title, description } = eventDetails || {};
        if (id) {
            setEvents((prevEvents) =>
                prevEvents.map((event) => {
                    if (event.id === id) {
                        return {
                            ...event,
                            start,
                            end,
                            title,
                            extendedProps: {
                                ...event.extendedProps,
                                description,
                            },
                        };
                    }
                    return event;
                })
            );
        } else {
            setEvents((prevEvents) => [
                ...prevEvents,
                {
                    id: uuidv4(),
                    start,
                    end,
                    title,
                    extendedProps: {
                        description,
                    },
                },
            ]);
        }
        setEventDetails(null);
    };
    // const handleEventSubmit = (e) => {
    //     e.preventDefault();
    //     const { id, start, end, title, description } = eventDetails || {};
    //     if (id) {
    //         setEvents((prevEvents) =>
    //             prevEvents.map((event) => {
    //                 if (event.id === id) {
    //                     return {
    //                         ...event,
    //                         start,
    //                         end,
    //                         title,
    //                         extendedProps: {
    //                             ...event.extendedProps,
    //                             description,
    //                         },
    //                     };
    //                 }
    //                 return event;
    //             })
    //         );
    //     } else {
    //         setEvents((prevEvents) => [
    //             ...prevEvents,
    //             {
    //                 id: uuidv4(),
    //                 start,
    //                 end,
    //                 title,
    //                 extendedProps: {
    //                     description,
    //                 },
    //             },
    //         ]);
    //     }
    //     setEventDetails(null);
    // };

    return (
        <div className="calendar">
            <FullCalendar
                defaultAllDayEventDuration={{ days: 1 }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // add interactionPlugin to plugins
                initialView="dayGridMonth"
                events={events}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                selectable={true}
                editable={true}
                eventClick={handleEventClick}
                eventDoubleClick={handleEventDoubleClick}
                dateClick={handleDateClick}
                select={(arg) =>
                    setEventDetails({
                        start: arg.start,
                        end: arg.end,
                    })
                }
                eventDrop={({ event }) =>
                    setEvents((prevEvents) =>
                        prevEvents.map((prevEvent) => {
                            if (prevEvent.id === event.id) {
                                return {
                                    ...prevEvent,
                                    start: event.start,
                                    end: event.end,
                                };
                            }
                            return prevEvent;
                        })
                    )
                }
                eventResize={({ event }) =>
                    setEvents((prevEvents) =>
                        prevEvents.map((prevEvent) => {
                            if (prevEvent.id === event.id) {
                                return {
                                    ...prevEvent,
                                    start: event.start,
                                    end: event.end,
                                };
                            }
                            return prevEvent;
                        })
                    )
                }
                eventContent={({ event }) => (
                    <div>
                        <div>{event.title}</div>
                        <div>
                            {event.start && event.start.toLocaleDateString()} - {event.end && event.end.toLocaleDateString()}
                        </div>
                    </div>
                )}
                eventDisplay="block"
                dayMaxEvents={3}
            />
            {eventDetails && (
                <div className="event-details">
                    <form onSubmit={handleEventSubmit}>
                        <h2>{eventDetails.id ? 'Edit Event' : 'Add Event'}</h2>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={eventDetails.title || ''}
                            onChange={handleEventChange}
                            required
                        />
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={eventDetails.description || ''}
                            onChange={handleEventChange}
                        />
                        <div className="event-time">
                            <div>
                                <label htmlFor="start">Start Time</label>
                                <input
                                    type="datetime-local"
                                    id="start"
                                    name="start"
                                    value={
                                        eventDetails.start &&
                                        eventDetails.start.toISOString().slice(0, 16)
                                    }
                                    onChange={handleEventChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="end">End Time</label>
                                <input
                                    type="datetime-local"
                                    id="end"
                                    name="end"
                                    value={
                                        eventDetails.end instanceof Date &&
                                        eventDetails.end.toISOString().slice(0, 16)
                                    }
                                    onChange={handleEventChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit">{eventDetails.id ? 'Save' : 'Add'}</button>
                        {eventDetails.id && (
                            <button
                                type="button"
                                className="delete-button"
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            `Are you sure you want to delete "${eventDetails.title}"?`
                                        )
                                    ) {
                                        setEvents((prevEvents) =>
                                            prevEvents.filter((event) => event.id !== eventDetails.id)
                                        );
                                        setEventDetails(null);
                                    }
                                }}
                            >
                                Delete
                            </button>
                        )}
                    </form>
                </div>
            )}
        </div >
    );
};

export default Calendar;