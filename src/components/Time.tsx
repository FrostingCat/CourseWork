import React, {useState} from 'react';
import {manageTime} from '../Api/ApiDevices';
import {TimePicker} from '@mui/x-date-pickers';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import '../css/alarmtime.css'
import dayjs, {Dayjs} from 'dayjs';

type Props = deviceProps;
const Time: React.FC<Props> = ({ device }) => {
	const [time, setTime] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

	const editTime = (): void => {
		const hour = time?.get('hour');
		const minute = time?.get('minute');
		var timeString = hour + ':' + minute;
		manageTime(device.id, timeString)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Time not managed")
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
			<div className='time-picker'>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<TimePicker
						label="Выберите время на часах"
						value={time}
						onChange={(newValue) => setTime(newValue)}
					/>
				</LocalizationProvider>
			</div>
			<div className="buttons">
				<a className="waves-effect purple darken-1 btn-large button" onClick={editTime}>
					Изменить
				</a>
			</div>
		</div>
	);
};

export default Time;
