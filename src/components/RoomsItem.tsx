import React, { useEffect, useState } from 'react';
import { Card, Typography, Button } from '@material-ui/core'
import '../css/deviceitem.css'

type Props = roomProps & {
	deleteRoom: (_id: string) => void
  }

const Item: React.FC<Props> = ({ room, deleteRoom }) => {
	return (
		<Card className="card-admin">
			<Typography className="people">
				id: {room._id}<br></br>
				name: {room.name}<br></br>
			</Typography>
			<Button
				onClick={() => deleteRoom(room._id)}
			>
				Удалить
			</Button>
		</Card>
	)
}

export default Item