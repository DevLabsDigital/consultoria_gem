import React, {useState} from 'react';
import DatePicker from 'react-datepicker'
import Input from "./Input";

const MyDatePicker = ({placeholder}) => {

    const [startDate, setStartDate] = useState();

    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            customInput={<Input width={11.6} placeholderText={placeholder} icon={'far fa-calendar-alt'}/>}
        />
    );
};

export default MyDatePicker;
