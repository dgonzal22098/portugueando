import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MetabaseDashboard = () => {
    const [iframeUrl, setIframeUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetabaseUrl = async () => {
            try {
                // Ajusta esta URL si tu servidor Express está en una dirección diferente
                const response = await axios.get('http://localhost:3001/metabase-url');
                setIframeUrl(response.data.iframeUrl);
            } catch (err) {
                console.error("Error al obtener la URL de Metabase:", err);
                setError("No se pudo cargar el dashboard de Metabase. Por favor, intenta de nuevo más tarde.");
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