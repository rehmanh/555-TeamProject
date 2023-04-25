import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';


export default function Scheduler() {
    const calendarRef = useRef(null); 
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch('https://5art9sh86i.execute-api.us-east-1.amazonaws.com/UAT');
                if (response.ok) {
                    const data = await response.json();
                    setRequests(data);
                } else {
                    console.error('Failed to fetch requests:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRequests();
    }, []);


    const handleEventClick = (eventInfo) => {
        const requestId = eventInfo.event.extendedProps.requestId;
        const start = eventInfo.event.extendedProps.pref_install_start_date;
        const end = eventInfo.event.extendedProps.pref_install_end_date;
        console.log(requestId, start, end)
    };

    return (
        <div>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={requests.map(request => ({
                    title: `Request ID: ${request.request_id}`,
                    start: request.pref_install_start_date,
                    end: request.pref_install_end_date,
                    extendedProps: {
                        requestId: request.request_id,
                        pref_install_start_date: request.pref_install_start_date, // include start date in extendedProps
                        pref_install_end_date: request.pref_install_end_date // include end date in extendedProps
                    }
                }))}
                eventClick={handleEventClick}
            />
            <ToastContainer />
        </div>
    );
}