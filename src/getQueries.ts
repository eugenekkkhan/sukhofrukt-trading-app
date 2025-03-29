import axios from "axios";

const verifyID = async (id: string) => {
  return await axios.get(import.meta.env.VITE_BASE_URL + "api/verifyID", {
    params: { id: id },
  });
};

const fetchPositions = async (id: string) => {
  return await axios.get(import.meta.env.VITE_BASE_URL + "api/fetchPositions", {
    params: { id: id },
  });
};

const fetchUserOptions = async (id: string) => {
  return await axios.get(
    import.meta.env.VITE_BASE_URL + "api/fetchUserOptions",
    { params: { id: id } },
  );
};

const getAllCoinValues = async (id: string) => {
  return await axios.get(
    import.meta.env.VITE_BASE_URL + "api/getAllCoinValues",
    { params: { id: id } },
  );
};

export { verifyID, fetchPositions, fetchUserOptions, getAllCoinValues };
