import React, { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { manageLight } from '../Api/ApiDevices';

type Props = deviceProps;
const ColorPicker: React.FC<Props> = ({device}) => {
  const [color, setColor] = useState('#446AD9');

  const handleChange = (selectedColor: ColorResult) => {
    setColor(selectedColor.hex);
	handleManageLight();
  };

  const handleManageLight = (): void => {
	manageLight(device.id, color, true)
		.then(({ status, data }) => {
			if (status !== 200) {
				throw new Error("Error! Device not managed")
			}
		})
		.catch(err => console.log(err))
}

  return (
    <div>
      <ChromePicker color={color} onChange={handleChange} />
      <div style={{ backgroundColor: color, width: '100px', height: '50px' }}></div>
    </div>
  );
};

export default ColorPicker;
