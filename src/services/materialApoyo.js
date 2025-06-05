import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const materialApoyoService = {
    obtenerMateriales: async (grupoId = 0) => {
        try {
            const url = `${API_URL}/main/material_apoyo/${grupoId ? `?grupo_id=${grupoId}` : ''}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error al obtener materiales:', error);
            throw error;
        }
    },

    crearMaterial: async (materialData) => {
        try {
            const response = await axios.post(`${API_URL}/main/material_apoyo/`, materialData);
            return response.data;
        } catch (error) {
            console.error('Error al crear material:', error);
            throw error;
        }
    },

    obtenerMaterialPorId: async (materialId) => {
        try {
            const response = await axios.get(`${API_URL}/main/material_apoyo/${materialId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener material por ID:', error);
            throw error;
        }
    },

    crearContenido: async (contenidoData) => {
        try {
            const response = await axios.post(
                `${API_URL}/main/material_apoyo/${contenidoData.coleccion_id}/contenidos/`,
                contenidoData
            );
            return response.data;
        } catch (error) {
            console.error('Error al crear contenido:', error);
            throw error;
        }
    },

    obtenerContenidos: async (coleccionId) => {
        try {
            const response = await axios.get(
                `${API_URL}/main/material_apoyo/${coleccionId}/contenidos/`
            );
            return response.data;
        } catch (error) {
            console.error('Error al obtener contenidos:', error);
            throw error;
        }
    },

    obtenerContenidoPorId: async (coleccionId, contenidoId) => {
        try {
            const response = await axios.get(
                `${API_URL}/main/material_apoyo/${coleccionId}/contenidos/${contenidoId}`
            );
            return response.data;
        } catch (error) {
            console.error('Error al obtener contenido por ID:', error);
            throw error;
        }
    }
};
