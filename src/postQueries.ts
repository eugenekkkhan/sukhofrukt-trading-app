import axios from "axios";
import { data } from "react-router";

const apiUrl = 'api/v1/';

type WorkingSideType = "OL" | "OS" | "ALL";
type TimeFrameType = "H" | "M";

const changeOptions = async (
		id: number, 
		workingSide: WorkingSideType, 
		timeFrame: TimeFrameType
	) => {
	console.log(id, workingSide, timeFrame);
	return await axios.post(import.meta.env.VITE_BASE_URL + apiUrl +"private/changeOptions", 
		{
			id: id,
			timeFrame: timeFrame.toString(),
			workingSide: workingSide.toString()
		},

		{
			params: {
				id: id,
			},
		}
	);
};
  
export type { WorkingSideType, TimeFrameType }
export { changeOptions }