import React from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import BaseAdminto from '../components/Adminto/Base';

const PropertyMetricsTest = ({ session }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Test - Métricas de Propiedades</h4>
                        </div>
                        <div className="card-body">
                            <p>Si ves este mensaje, el archivo se está cargando correctamente.</p>
                            <p>Esto es una versión de prueba del PropertyMetrics.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Test - Métricas de Propiedades">
            <PropertyMetricsTest {...properties} />
        </BaseAdminto>
    );
});
