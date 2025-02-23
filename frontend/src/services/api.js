// src/services/api.js
import axios from 'axios';

const API_BASE_URL = "http://localhost:5000";

export const getClientes = async () => {
  const response = await axios.get(`${API_BASE_URL}/clientes`);
  return response.data;
};

export const createCliente = async (clienteData) => {
  const response = await axios.post(`${API_BASE_URL}/clientes`, clienteData);
  return response.data;
};

export const getClienteById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/clientes/${id}`);
  return response.data;
};

export const actualizarCliente = async (clienteId, clienteData) => {
  const response = await axios.put(`${API_BASE_URL}/clientes/${clienteId}`, clienteData);
  return response.data;
};

export const eliminarCliente = async (clienteId) => {
  const response = await axios.delete(`${API_BASE_URL}/clientes/${clienteId}`);
  return response.data;
};

// (Las funciones relacionadas con rutinas ya las tienes implementadas)
export const getRutinas = async (clienteId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rutinas/${clienteId}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    if (error.response && error.response.status === 404) return [];
    throw error;
  }
};

export const generarRutina = async (clienteId) => {
  const response = await axios.post(`${API_BASE_URL}/rutinas/${clienteId}`);
  return response.data;
};

export const getRutinaById = async (rutinaId) => {
  const response = await axios.get(`${API_BASE_URL}/rutinas/detail/${rutinaId}`);
  return response.data;
};
