import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MetabaseDashboard = () => {
    const [iframeUrl, setIframeUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetabaseUrl = async () => {
            try {
                // Intentar obtener el token usando la sesión (cookies)
                const response = await axios.get('http://localhost:8000/metabase-token');
                setIframeUrl(response.data.iframeUrl);
            } catch (err) {
                console.error("Error al obtener la URL de Metabase:", err);

                // Si falla, intentar con los datos del localStorage como respaldo
                try {
                    const userData = JSON.parse(localStorage.getItem('usuarioLogueado'));
                    if (userData && userData.email && userData.rol) {
                        // Hacer la petición con parámetros de consulta
                        const fallbackResponse = await axios.get(`http://localhost:8000/api/metabase-token?email=${userData.email}&rol=${userData.rol}`);
                        setIframeUrl(fallbackResponse.data.iframeUrl);
                    } else {
                        throw new Error("No hay datos de usuario disponibles");
                    }
                } catch (fallbackErr) {
                    console.error("Error en el método de respaldo:", fallbackErr);
                    setError("No se pudo cargar el dashboard. Por favor, intenta iniciar sesión de nuevo.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMetabaseUrl();
    }, []);


    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Cargando dashboard de Metabase...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>;
    }

    return (
        <div style={{ width: '100%', height: '1500px', border: 'none', backgroundColor: 'red' }}>
            {iframeUrl ? (
                <iframe
                    src={iframeUrl}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    allowtransparency="true"
                    title="Metabase Dashboard"
                ></iframe>
            ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>No se encontró la URL del dashboard.</div>
            )}
        </div>
    );
};

export default MetabaseDashboard;
