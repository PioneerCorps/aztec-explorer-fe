// api.js
import axios from "axios";

const BASE_URL = "https://api.aztecexplorer.xyz"; // Replace with your API's base URL

// Block-related functions
export const getBlockByNumber = async (blockNumber) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/blocks/getByBlockNumber/${blockNumber}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching block by number:", error);
    throw error;
  }
};

export const getBlockByHash = async (hash) => {
  try {
    const response = await axios.get(`${BASE_URL}/blocks/getByHash/${hash}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching block by hash:", error);
    throw error;
  }
};

export const getBlocks = async (page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/blocks/get`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blocks:", error);
    throw error;
  }
};

// Transaction-related functions
export const getTransactionsByBlockNumber = async (blockNumber) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/transactions/getByBlockNumber/${blockNumber}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions by block number:", error);
    throw error;
  }
};

export const getTransactionByHash = async (hash) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/transactions/getByHash/${hash}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction by hash:", error);
    throw error;
  }
};

export const getTransactions = async (page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions/get`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
