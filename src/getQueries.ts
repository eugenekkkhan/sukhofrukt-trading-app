import axios from "axios";

const apiUrl = 'api/v1/';

const verifyID = async (id: string) => {
  return await axios.get(import.meta.env.VITE_BASE_URL + apiUrl +"public/verifyID", {
    params: { id: id },
	validateStatus: (status)=> {
		return status < 500
	}
  });
};

const fetchHistory = async (id: string) => {
  return await axios.get(import.meta.env.VITE_BASE_URL + apiUrl +"private/fetchHistory", {
    params: { id: id },
  });
};

const fetchPositions = async (id: string) => {
  return await axios.get(import.meta.env.VITE_BASE_URL + apiUrl +"private/fetchPositions", {
    params: { id: id },
  });
};

const fetchUserOptions = async (id: string) => {
  return await axios.get(
    import.meta.env.VITE_BASE_URL + apiUrl +"private/fetchUserOptions",
    { params: { id: id } },
  );
};

const getAllCoinValues = async (id: string) => {
  return await axios.get(
    import.meta.env.VITE_BASE_URL + apiUrl +"private/getAllCoinValues",
    { params: { id: id } },
  );
};

export { verifyID, fetchHistory, fetchPositions, fetchUserOptions, getAllCoinValues };
