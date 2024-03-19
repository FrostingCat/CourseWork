import React, { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { manageAlarm, manageLight, manageTime } from '../Api/ApiDevices';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../css/alarmtime.css'
import dayjs, { Dayjs } from 'dayjs';
import { Button } from '@material-ui/core';

type Props = deviceProps;
const Time: React.FC<Props> = ({ device }) => {
	const [time, setTime] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

	const editTime = (): void => {
		const hour = time?.get('hour');
		const minute = time?.get('minute');
		var timeString = hour + ':' + minute;
		manageTime(device._id, timeString)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Device not managed")
				}
			})
			.catch(err => console.log(err))
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
			<div className='time-picker'>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<TimePicker
						label="Выберите время на часах"
						value={time}
						onChange={(newValue) => setTime(newValue)}
					/>
				</LocalizationProvider>
			</div>
			<Button disabled={time === dayjs('2022-04-17T15:30') ? true : false} onClick={() =>
				editTime()}>
				Изменить
			</Button>
		</div>
	);
};

export default Time;
