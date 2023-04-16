import React from 'react';
import Calendar from '../components/Calender';
import Scheduler from '../components/Scheduler';
import Email from '../components/Email';

export default function scheduling() {
    return (
        <div>
            {/* <Email /> */}
            <Calendar />
            <Scheduler />
        </div>
    )
}

