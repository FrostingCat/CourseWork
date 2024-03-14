import React, { useEffect, useState } from 'react';
import { Card, Typography, Button } from '@material-ui/core'
import '../css/roomitem.css'

type Props = roomProps & {
	deleteRoom: (_id: string) => void
  }

const Item: React.FC<Props> = ({ room, deleteRoom }) => {
	return (
		<Card className="card-room">
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
			<Button className="people-room">
				{room.name}<br></br>
				<button className="material-icons delete-room pink darken-3" onClick={() => deleteRoom(room._id)}>delete</button>
			</Button>
		</Card>
	)
}

export default Item