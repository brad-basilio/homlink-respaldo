import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import Base from './Components/Tailwind/Base';
import Header from './components/Tailwind/Header';
import Footer from './components/Tailwind/Footer';

const UserDashboard = ({ user, properties: initialProperties }) => {
    const [properties, setProperties] = useState(initialProperties || []);
    const [selectedPeriod, setSelectedPeriod] = useState('30'); // días
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [propertyMetrics, setPropertyMetrics] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // Cargar datos del dashboard
    useEffect(() => {
        loadDashboardData();
    }, [selectedPeriod]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - parseInt(selectedPeriod) * 24 * 60 * 60 * 1000)
                .toISOString().split('T')[0];

            const response = await fetch(`/api/user-dashboard?start_date=${startDate}&end_date=${endDate}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setDashboardData(data);
                setProperties(data.properties);
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadPropertyMetrics = async (propertyId) => {
        try {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - parseInt(selectedPeriod) * 24 * 60 * 60 * 1000)
                .toISOString().split('T')[0];

            const response = await fetch(`/api/property-metrics/${propertyId}?start_date=${startDate}&end_date=${endDate}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPropertyMetrics(data);
            }
        } catch (error) {
            console.error('Error loading property metrics:', error);
        }
    };

    const handlePropertySelect = (property) => {
        setSelectedProperty(property);
        setActiveTab('metrics');
        loadPropertyMetrics(property.id);
    };

    const getStatusBadge = (property) => {
        if (!property.admin_approved) {
            return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pendiente Aprobación</span>;
        }
        if (!property.active) {
            return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Inactiva</span>;
        }
        if (property.featured) {
            return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Activa • Destacada</span>;
        }
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Activa</span>;
    };

    const totalMetrics = dashboardData?.total_metrics || {};

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header del Dashboard */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Mi Dashboard</h1>
                    <p className="text-gray-600">Bienvenido, {user.name}. Aquí puedes ver el rendimiento de tus propiedades.</p>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'overview'
                                    ? 'border-red-500 text-red-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Resumen General
                        </button>
                        <button
                            onClick={() => setActiveTab('properties')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'properties'
                                    ? 'border-red-500 text-red-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Mis Propiedades
                        </button>
                        {selectedProperty && (
                            <button
                                onClick={() => setActiveTab('metrics')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'metrics'
                                        ? 'border-red-500 text-red-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Métricas: {selectedProperty.title}
                            </button>
                        )}
                    </nav>
                </div>

                {/* Selector de período */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Período de análisis:</label>
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    >
                        <option value="7">Últimos 7 días</option>
                        <option value="30">Últimos 30 días</option>
                        <option value="90">Últimos 3 meses</option>
                        <option value="365">Último año</option>
                    </select>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Cargando datos...</p>
                    </div>
                ) : (
                    <>
                        {/* Tab: Resumen General */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Métricas Generales */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-600">Total Visualizaciones</p>
                                                <p className="text-2xl font-semibold text-gray-900">{totalMetrics.view || 0}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow p-6">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-600">Clicks a Airbnb</p>
                                                <p className="text-2xl font-semibold text-gray-900">{totalMetrics.click_airbnb || 0}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow p-6">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-8 w-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-600">Clicks a WhatsApp</p>
                                                <p className="text-2xl font-semibold text-gray-900">{totalMetrics.click_whatsapp || 0}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow p-6">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-600">Mis Propiedades</p>
                                                <p className="text-2xl font-semibold text-gray-900">{properties.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Resumen de Propiedades */}
                                <div className="bg-white rounded-lg shadow">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900">Resumen de Propiedades</h3>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-green-600">
                                                    {properties.filter(p => p.admin_approved && p.active).length}
                                                </div>
                                                <div className="text-sm text-gray-600">Activas</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-yellow-600">
                                                    {properties.filter(p => !p.admin_approved).length}
                                                </div>
                                                <div className="text-sm text-gray-600">Pendiente Aprobación</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-blue-600">
                                                    {properties.filter(p => p.featured).length}
                                                </div>
                                                <div className="text-sm text-gray-600">Destacadas</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab: Mis Propiedades */}
                        {activeTab === 'properties' && (
                            <div className="bg-white rounded-lg shadow">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900">Mis Propiedades</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Propiedad
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Estado
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Visualizaciones
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Clicks Airbnb
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Clicks WhatsApp
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {properties.map((property) => (
                                                <tr key={property.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                                                    <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {property.title}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {property.slug}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {getStatusBadge(property)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {property.metrics?.view || 0}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {property.metrics?.click_airbnb || 0}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {property.metrics?.click_whatsapp || 0}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium space-x-2">
                                                        <button
                                                            onClick={() => handlePropertySelect(property)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Ver Métricas
                                                        </button>
                                                        <a
                                                            href={`/property/${property.slug}`}
                                                            target="_blank"
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            Ver Propiedad
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Tab: Métricas de Propiedad */}
                        {activeTab === 'metrics' && selectedProperty && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Métricas detalladas: {selectedProperty.title}
                                    </h3>
                                    
                                    {propertyMetrics ? (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {propertyMetrics.summary.view || 0}
                                                </div>
                                                <div className="text-sm text-gray-600">Visualizaciones</div>
                                            </div>
                                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                                <div className="text-2xl font-bold text-red-600">
                                                    {propertyMetrics.summary.click_airbnb || 0}
                                                </div>
                                                <div className="text-sm text-gray-600">Clicks a Airbnb</div>
                                            </div>
                                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {propertyMetrics.summary.click_whatsapp || 0}
                                                </div>
                                                <div className="text-sm text-gray-600">Clicks a WhatsApp</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-4">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
                                            <p className="mt-2 text-gray-600">Cargando métricas...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <Base {...properties}>
            <UserDashboard {...properties} />
        </Base>
    );
});
