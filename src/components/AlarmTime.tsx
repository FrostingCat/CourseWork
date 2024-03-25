import React, { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { manageAlarm, manageLed } from '../Api/ApiDevices';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../css/alarmtime.css'
import dayjs, { Dayjs } from 'dayjs';
import { Button } from '@material-ui/core';

type Props = deviceProps;
const AlarmTime: React.FC<Props> = ({ device }) => {
	const [isOn, setOn] = useState(false);
	const [time, setTime] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

	const handleState = () => {
		setOn(!isOn);
	};

	const editAlarm = (): void => {
		const hour = time?.get('hour');
		const minute = time?.get('minute');
		var timeString = hour + ':' + minute;
		manageAlarm(device.id, isOn, timeString)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Device not managed")
				}
			})
			.catch(err => console.log(err))
	}

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			minHeight: '200px'
		}}>
			<div className="switch switch-time">
				<label>
					Off
					<input type="checkbox" onChange={handleState}/>
					<span className="lever"></span>
					On
				</label>
			</div>
			<div className='time-picker'>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<TimePicker
						label="Выберите время будильника"
						value={time}
						onChange={(newValue) => setTime(newValue)}
					/>
				</LocalizationProvider>
			</div>
			<div className="buttons">
				<a className="waves-effect purple darken-1 btn-large button" onClick={editAlarm}>
					Изменить
				</a>
			</div>
		</div>
	);
};

export default AlarmTime;
