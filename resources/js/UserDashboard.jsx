import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import Base from './components/Tailwind/Base';
import Header from './components/Tailwind/Header';
import Footer from './components/Tailwind/Footer';
import { CarritoProvider } from './context/CarritoContext';

const UserDashboard = ({ user, properties: initialProperties, userStats: initialStats }) => {
    const [properties, setProperties] = useState(initialProperties || []);
    const [userStats, setUserStats] = useState(initialStats || {});
    const [selectedPeriod, setSelectedPeriod] = useState('30');
    const [loading, setLoading] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [showPropertyModal, setShowPropertyModal] = useState(false);

    console.log('🏠 UserDashboard mounted with data:', {
        user,
        properties: initialProperties,
        userStats: initialStats
    });

    // Cargar datos del dashboard
    useEffect(() => {
        if (selectedPeriod) {
            loadDashboardData();
        }
    }, [selectedPeriod]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            console.log('📊 Loading dashboard data for period:', selectedPeriod);
            
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - parseInt(selectedPeriod) * 24 * 60 * 60 * 1000)
                .toISOString().split('T')[0];

            const response = await fetch(`/api/user-dashboard-metrics?start_date=${startDate}&end_date=${endDate}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('📈 Dashboard data received:', data);
                setProperties(data.properties || []);
                
                // Calcular estadísticas
                const stats = {
                    total_properties: data.properties?.length || 0,
                    active_properties: data.properties?.filter(p => p.active && p.admin_approved).length || 0,
                    pending_properties: data.properties?.filter(p => !p.admin_approved).length || 0,
                    featured_properties: data.properties?.filter(p => p.featured).length || 0,
                    total_views: data.total_metrics?.property_view || 0,
                    total_airbnb_clicks: data.total_metrics?.airbnb_click || 0,
                    total_gallery_views: data.total_metrics?.gallery_view || 0,
                };
                
                stats.conversion_rate = stats.total_views > 0 
                    ? ((stats.total_airbnb_clicks / stats.total_views) * 100).toFixed(1)
                    : '0.0';
                    
                setUserStats(stats);
            } else {
                console.error('❌ Error loading dashboard data:', response.status);
            }
        } catch (error) {
            console.error('❌ Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePropertySelect = (property) => {
        setSelectedProperty(property);
        setShowPropertyModal(true);
    };

    const getStatusBadge = (property) => {
        if (!property.admin_approved) {
            return (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border border-orange-200 shadow-sm">
                    <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Pendiente Aprobación
                </span>
            );
        }
        if (!property.active) {
            return (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200 shadow-sm">
                    <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Inactiva
                </span>
            );
        }
        if (property.featured) {
            return (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200 shadow-sm">
                    <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    ⭐ Destacada
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200 shadow-sm">
                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Activa
            </span>
        );
    };

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num?.toString() || '0';
    };

    // Componente de tarjeta de métrica mejorado
    const MetricCard = ({ title, value, icon, gradient, description, trend, suffix = "" }) => (
        <div className="group relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
            <div className="relative bg-white backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                        <i className={`${icon} text-white text-2xl`}></i>
                    </div>
                    {trend && (
                        <div className={`text-sm font-bold px-2 py-1 rounded-lg ${trend.positive ? 'text-emerald-700 bg-emerald-100' : 'text-red-700 bg-red-100'}`}>
                            <i className={`mdi mdi-arrow-${trend.positive ? 'up' : 'down'} mr-1`}></i>
                            {trend.value}%
                        </div>
                    )}
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">{title}</p>
                    <p className="text-3xl font-bold text-neutral-dark mb-1">
                        {formatNumber(value)}{suffix}
                    </p>
                    {description && <p className="text-xs text-gray-500">{description}</p>}
                </div>
            </div>
        </div>
    );

    // Componente para mostrar imagen de propiedad
    const PropertyImage = ({ property, className = "w-16 h-16" }) => {
        // Aquí puedes agregar lógica para mostrar la imagen real de la propiedad
        // Por ahora usaremos un placeholder con gradiente
        const gradients = [
            'from-primary to-accent',
            'from-secondary to-primary',
            'from-accent to-secondary',
            'from-emerald-500 to-teal-600',
            'from-purple-500 to-pink-500'
        ];
        
        const gradient = gradients[property.id % gradients.length];
        
        return (
            <div className={`${className} bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-md overflow-hidden`}>
                {property?.main_image ? (
                    <img 
                         src={`/api/property/media/${property.main_image}`}
                        alt={property.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <i className="mdi mdi-home text-white text-2xl"></i>
                )}
            </div>
        );
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-6 shadow-lg"></div>
                    <p className="text-neutral-dark font-semibold text-lg">Verificando usuario...</p>
                    <p className="text-gray-500 text-sm mt-2">Un momento por favor</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Header />
            
            <div className="px-[5%] mx-auto  py-8">
                {/* Hero Header con diseño mejorado */}
                <div className="relative mb-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-90"></div>
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="relative rounded-3xl p-8 md:p-12 text-white">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-6 md:mb-0">
                               
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                    ¡Hola, <span className="text-yellow-300">{user?.name || 'Usuario'}</span>! 👋
                                </h1>
                                <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                                    Bienvenido a tu centro de control. Aquí puedes gestionar y monitorear el rendimiento de todas tus propiedades en tiempo real.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="w-32 h-32 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-2xl">
                                    <i className="mdi mdi-view-dashboard text-6xl text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selector de período mejorado */}
                <div className="mb-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="mb-4 sm:mb-0">
                                <label className="block text-sm font-bold text-neutral-dark mb-3">
                                    📊 Período de análisis
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedPeriod}
                                        onChange={(e) => setSelectedPeriod(e.target.value)}
                                        className="appearance-none bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl px-6 py-3 pr-10 shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-200"
                                        disabled={loading}
                                    >
                                        <option value="7" className="bg-white text-neutral-dark">📅 Últimos 7 días</option>
                                        <option value="30" className="bg-white text-neutral-dark">📊 Últimos 30 días</option>
                                        <option value="90" className="bg-white text-neutral-dark">📈 Últimos 3 meses</option>
                                        <option value="365" className="bg-white text-neutral-dark">📋 Último año</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <i className="mdi mdi-chevron-down text-white text-xl"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                                <i className="mdi mdi-clock-outline mr-2 text-primary"></i>
                                <span className="font-semibold">Actualizado:</span>
                                <span className="ml-1">{new Date().toLocaleDateString('es-ES', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs mejorados */}
                <div className="border-b-2 border-gray-200 mb-8">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`group relative py-4 px-1 border-b-4 font-bold text-lg transition-all duration-300 ${
                                activeTab === 'overview'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-neutral-dark hover:border-gray-300'
                            }`}
                        >
                            <i className="mdi mdi-view-dashboard mr-3 text-xl"></i>
                            Resumen General
                            {activeTab === 'overview' && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('properties')}
                            className={`group relative py-4 px-1 border-b-4 font-bold text-lg transition-all duration-300 ${
                                activeTab === 'properties'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-neutral-dark hover:border-gray-300'
                            }`}
                        >
                            <i className="mdi mdi-home-city mr-3 text-xl"></i>
                            Mis Propiedades 
                            <span className="ml-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                                {properties.length}
                            </span>
                            {activeTab === 'properties' && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                            )}
                        </button>
                    </nav>
                </div>

                {loading ? (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-6 shadow-lg"></div>
                        <p className="text-neutral-dark font-semibold text-xl">Cargando datos...</p>
                        <p className="text-gray-500 text-sm mt-2">Analizando métricas de rendimiento</p>
                    </div>
                ) : (
                    <>
                        {/* Tab: Resumen General */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                {/* Métricas Principales con diseño mejorado */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <MetricCard
                                        title="Total Visualizaciones"
                                        value={userStats.total_views || 0}
                                        icon="mdi mdi-eye-outline"
                                        gradient="from-blue-500 to-primary"
                                        description="Vistas de todas tus propiedades"
                                        trend={{ positive: true, value: 12.5 }}
                                    />
                                    <MetricCard
                                        title="Clicks a Airbnb"
                                        value={userStats.total_airbnb_clicks || 0}
                                        icon="mdi mdi-open-in-new"
                                        gradient="from-secondary to-red-600"
                                        description="Redirecciones efectivas a Airbnb"
                                        trend={{ positive: true, value: 8.2 }}
                                    />
                                    <MetricCard
                                        title="Visualizaciones Galería"
                                        value={userStats.total_gallery_views || 0}
                                        icon="mdi mdi-image-multiple"
                                        gradient="from-emerald-500 to-teal-600"
                                        description="Interacciones con galerías de fotos"
                                        trend={{ positive: true, value: 15.3 }}
                                    />
                                    <MetricCard
                                        title="Tasa de Conversión"
                                        value={userStats.conversion_rate || '0.0'}
                                        icon="mdi mdi-chart-line"
                                        gradient="from-purple-500 to-accent"
                                        description="Porcentaje de clicks por vista"
                                        suffix="%"
                                    />
                                </div>

                                {/* Estadísticas de Propiedades con diseño premium */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Estado de Propiedades */}
                                    <div className="relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5"></div>
                                        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                                            <div className="flex items-center mb-6">
                                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                                    <i className="mdi mdi-home-city text-white text-2xl"></i>
                                                </div>
                                                <h3 className="text-2xl font-bold text-neutral-dark">Estado de Propiedades</h3>
                                            </div>
                                            <div className="space-y-5">
                                                <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200 hover:from-emerald-100 hover:to-green-100 transition-all duration-300">
                                                    <div className="flex items-center">
                                                        <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-4 shadow-md"></div>
                                                        <span className="text-lg font-semibold text-emerald-800">Activas</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-emerald-700">
                                                            {userStats.active_properties || 0}
                                                        </div>
                                                        <div className="text-xs text-emerald-600 font-medium">Publicadas</div>
                                                    </div>
                                                </div>
                                                <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 hover:from-orange-100 hover:to-yellow-100 transition-all duration-300">
                                                    <div className="flex items-center">
                                                        <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mr-4 shadow-md"></div>
                                                        <span className="text-lg font-semibold text-orange-800">Pendientes</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-orange-700">
                                                            {userStats.pending_properties || 0}
                                                        </div>
                                                        <div className="text-xs text-orange-600 font-medium">En revisión</div>
                                                    </div>
                                                </div>
                                                <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-violet-100 transition-all duration-300">
                                                    <div className="flex items-center">
                                                        <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mr-4 shadow-md"></div>
                                                        <span className="text-lg font-semibold text-purple-800">Destacadas</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-purple-700">
                                                            {userStats.featured_properties || 0}
                                                        </div>
                                                        <div className="text-xs text-purple-600 font-medium">Premium</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Resumen de Actividad */}
                                    <div className="relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                                        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                                            <div className="flex items-center mb-6">
                                                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                                    <i className="mdi mdi-chart-donut text-white text-2xl"></i>
                                                </div>
                                                <h3 className="text-2xl font-bold text-neutral-dark">Resumen de Actividad</h3>
                                            </div>
                                            <div className="text-center mb-6">
                                                <div className="relative inline-flex items-center justify-center">
                                                    <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                                        {formatNumber(
                                                            (userStats.total_airbnb_clicks || 0) + (userStats.total_gallery_views || 0)
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-lg text-gray-600 font-semibold mt-2">Total de Interacciones</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-primary/10 rounded-xl border border-blue-200">
                                                    <div className="text-2xl font-bold text-primary mb-1">
                                                        {userStats.conversion_rate || '0.0'}%
                                                    </div>
                                                    <div className="text-sm text-blue-700 font-semibold">Tasa de Conversión</div>
                                                </div>
                                                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-accent/10 rounded-xl border border-purple-200">
                                                    <div className="text-2xl font-bold text-accent mb-1">
                                                        {userStats.total_properties || 0}
                                                    </div>
                                                    <div className="text-sm text-purple-700 font-semibold">Total Propiedades</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab: Mis Propiedades con tabla elegante */}
                        {activeTab === 'properties' && (
                            <div className="space-y-6">
                                {properties.length > 0 ? (
                                    <>
                                        {/* Header de propiedades */}
                                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                                        <i className="mdi mdi-home-city text-white text-2xl"></i>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-neutral-dark">Mis Propiedades</h3>
                                                        <p className="text-gray-600 mt-1">Gestiona y monitorea el rendimiento de tus propiedades</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-3xl font-bold text-primary">{properties.length}</div>
                                                    <div className="text-sm text-gray-500 font-semibold">propiedades registradas</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tabla de propiedades elegante */}
                                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                                        <tr>
                                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Propiedad</th>
                                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Ubicación</th>
                                                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Detalles</th>
                                                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Métricas</th>
                                                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Estado</th>
                                                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {properties.map((property, index) => {
                                                            const views = property.metrics_summary?.property_view || 0;
                                                            const clicks = property.metrics_summary?.airbnb_click || 0;
                                                            const gallery = property.metrics_summary?.gallery_view || 0;
                                                            const conversion = property.conversion_rate || 0;
                                                            
                                                            return (
                                                                <tr key={property.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                                    {/* Columna de Propiedad */}
                                                                    <td className="px-6 py-4">
                                                                        <div className="flex items-center space-x-4">
                                                                            <div className="flex-shrink-0">
                                                                                {property?.main_image ? (
                                                                                    <img 
                                                                                        src={`/api/property/media/${property.main_image}`}
                                                                                        alt={property.title}
                                                                                        className="w-16 h-12 object-cover rounded-lg shadow-md"
                                                                                    />
                                                                                ) : (
                                                                                    <div className="w-16 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md">
                                                                                        <i className="mdi mdi-home text-white text-lg"></i>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <div className="min-w-0 flex-1">
                                                                                <p className="text-sm font-bold text-gray-900 truncate max-w-xs" title={property.title}>
                                                                                    {property.title || 'Sin título'}
                                                                                </p>
                                                                                <p className="text-xs text-gray-500 font-mono">/{property.slug}</p>
                                                                                {property.price_per_night && (
                                                                                    <p className="text-sm font-semibold text-primary">
                                                                                        {property.currency || '$'} {property.price_per_night}/noche
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    {/* Columna de Ubicación */}
                                                                    <td className="px-6 py-4">
                                                                        <div>
                                                                            <p className="text-sm font-semibold text-gray-900">{property.district}</p>
                                                                            <p className="text-xs text-gray-500">{property.city}</p>
                                                                            <p className="text-xs text-gray-400 capitalize">{property.platform || 'N/A'}</p>
                                                                        </div>
                                                                    </td>

                                                                    {/* Columna de Detalles */}
                                                                    <td className="px-6 py-4 text-center">
                                                                        <div className="flex justify-center space-x-4 text-xs">
                                                                            <div className="text-center">
                                                                                <div className="font-bold text-gray-800">{property.bedrooms || '-'}</div>
                                                                                <div className="text-gray-500">Hab.</div>
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <div className="font-bold text-gray-800">{property.bathrooms || '-'}</div>
                                                                                <div className="text-gray-500">Baños</div>
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <div className="font-bold text-gray-800">{property.max_guests || '-'}</div>
                                                                                <div className="text-gray-500">Hués.</div>
                                                                            </div>
                                                                        </div>
                                                                        {property.rating && (
                                                                            <div className="mt-2">
                                                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                                                                    <i className="mdi mdi-star mr-1"></i>
                                                                                    {property.rating}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </td>

                                                                    {/* Columna de Métricas */}
                                                                    <td className="px-6 py-4">
                                                                        <div className="space-y-1">
                                                                            <div className="flex justify-between items-center text-xs">
                                                                                <span className="text-gray-600">Vistas:</span>
                                                                                <span className="font-bold text-primary">{formatNumber(views)}</span>
                                                                            </div>
                                                                            <div className="flex justify-between items-center text-xs">
                                                                                <span className="text-gray-600">Clicks:</span>
                                                                                <span className="font-bold text-secondary">{formatNumber(clicks)}</span>
                                                                            </div>
                                                                            <div className="flex justify-between items-center text-xs">
                                                                                <span className="text-gray-600">Galería:</span>
                                                                                <span className="font-bold text-emerald-600">{formatNumber(gallery)}</span>
                                                                            </div>
                                                                            <div className="pt-1 border-t border-gray-100">
                                                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                                                                                    conversion >= 10 ? 'bg-emerald-100 text-emerald-800' :
                                                                                    conversion >= 5 ? 'bg-yellow-100 text-yellow-800' :
                                                                                    'bg-gray-100 text-gray-600'
                                                                                }`}>
                                                                                    {conversion}% conv.
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    {/* Columna de Estado */}
                                                                    <td className="px-6 py-4 text-center">
                                                                        {getStatusBadge(property)}
                                                                    </td>

                                                                    {/* Columna de Acciones */}
                                                                    <td className="px-6 py-4 text-center">
                                                                        <div className="flex justify-center space-x-2">
                                                                            <button
                                                                                onClick={() => handlePropertySelect(property)}
                                                                                className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
                                                                                title="Ver detalles completos"
                                                                            >
                                                                                <i className="mdi mdi-eye mr-1"></i>
                                                                                Detalles
                                                                            </button>
                                                                            <a
                                                                                href={`/property/${property.slug}`}
                                                                                target="_blank"
                                                                                className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:border-primary hover:text-primary hover:shadow-lg hover:scale-105 transition-all duration-200"
                                                                                title="Ver en el sitio"
                                                                            >
                                                                                <i className="mdi mdi-open-in-new mr-1"></i>
                                                                                Ver
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    /* Estado vacío mejorado */
                                    <div className="text-center py-16">
                                        <div className="relative inline-block mb-8">
                                            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                                                <i className="mdi mdi-home-outline text-5xl text-gray-400"></i>
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                                                <i className="mdi mdi-plus text-white text-lg"></i>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-neutral-dark mb-4">
                                            ¡Comienza tu viaje en Homlink!
                                        </h3>
                                        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                                            No tienes propiedades registradas aún. Agrega tu primera propiedad y comienza a generar ingresos.
                                        </p>
                                        <a
                                            href="/properties/create"
                                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                        >
                                            <i className="mdi mdi-plus-circle mr-3 text-xl"></i>
                                            Agregar Mi Primera Propiedad
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* Modal de detalles de propiedad estilo admin */}
                {showPropertyModal && selectedProperty && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={() => setShowPropertyModal(false)}>
                        <div className="bg-white rounded-xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                            
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-center space-x-4">
                                    {selectedProperty?.main_image ? (
                                        <img 
                                            src={`/api/property/media/${selectedProperty.main_image}`}
                                            alt={selectedProperty.title}
                                            className="w-16 h-16 object-cover rounded-lg shadow-md"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                                            <i className="mdi mdi-home text-white text-2xl"></i>
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{selectedProperty.title}</h3>
                                        <p className="text-sm text-gray-600">
                                            <i className="mdi mdi-map-marker mr-1"></i>
                                            {selectedProperty.district}, {selectedProperty.city}
                                        </p>
                                        <p className="text-xs text-gray-500 font-mono">/{selectedProperty.slug}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowPropertyModal(false)}
                                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                                >
                                    <i className="mdi mdi-close text-xl"></i>
                                </button>
                            </div>

                            {/* Contenido */}
                            <div className="p-6">
                                
                                {/* Métricas principales */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {formatNumber(selectedProperty.metrics_summary?.property_view || 0)}
                                        </div>
                                        <div className="text-sm text-blue-700 font-semibold">Visualizaciones</div>
                                    </div>
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-red-600">
                                            {formatNumber(selectedProperty.metrics_summary?.airbnb_click || 0)}
                                        </div>
                                        <div className="text-sm text-red-700 font-semibold">Clicks</div>
                                    </div>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {formatNumber(selectedProperty.metrics_summary?.gallery_view || 0)}
                                        </div>
                                        <div className="text-sm text-green-700 font-semibold">Galería</div>
                                    </div>
                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {selectedProperty.conversion_rate || 0}%
                                        </div>
                                        <div className="text-sm text-purple-700 font-semibold">Conversión</div>
                                    </div>
                                </div>

                                {/* Grid de información */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    
                                    {/* Información básica */}
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                                            <i className="mdi mdi-information-outline text-primary mr-2"></i>
                                            Información Básica
                                        </h4>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <div className="text-sm text-gray-600">Habitaciones</div>
                                                <div className="text-lg font-bold text-gray-900">{selectedProperty.bedrooms || 'N/A'}</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <div className="text-sm text-gray-600">Baños</div>
                                                <div className="text-lg font-bold text-gray-900">{selectedProperty.bathrooms || 'N/A'}</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <div className="text-sm text-gray-600">Huéspedes</div>
                                                <div className="text-lg font-bold text-gray-900">{selectedProperty.max_guests || 'N/A'}</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <div className="text-sm text-gray-600">Área</div>
                                                <div className="text-lg font-bold text-gray-900">{selectedProperty.area_m2 ? selectedProperty.area_m2 + ' m²' : 'N/A'}</div>
                                            </div>
                                        </div>

                                        {selectedProperty.price_per_night && (
                                            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                                                <div className="text-sm text-primary font-semibold">Precio por noche</div>
                                                <div className="text-2xl font-bold text-primary">
                                                    {selectedProperty.currency || '$'} {selectedProperty.price_per_night}
                                                </div>
                                            </div>
                                        )}

                                        {selectedProperty.rating && (
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-sm text-yellow-700 font-semibold">Rating</div>
                                                        <div className="flex items-center">
                                                            <i className="mdi mdi-star text-yellow-500 text-xl mr-1"></i>
                                                            <span className="text-xl font-bold text-yellow-800">{selectedProperty.rating}</span>
                                                        </div>
                                                    </div>
                                                    {selectedProperty.reviews_count && (
                                                        <div className="text-right">
                                                            <div className="text-lg font-bold text-yellow-800">{selectedProperty.reviews_count}</div>
                                                            <div className="text-xs text-yellow-700">reseñas</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Información adicional */}
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                                            <i className="mdi mdi-cog text-primary mr-2"></i>
                                            Detalles Adicionales
                                        </h4>
                                        
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm text-gray-600">Plataforma:</span>
                                                <span className="font-semibold text-gray-900 capitalize">{selectedProperty.platform || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm text-gray-600">Estado:</span>
                                                {getStatusBadge(selectedProperty)}
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm text-gray-600">Disponibilidad:</span>
                                                <span className="font-semibold text-gray-900 capitalize">{selectedProperty.availability_status || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm text-gray-600">Registrada:</span>
                                                <span className="font-semibold text-gray-900">
                                                    {new Date(selectedProperty.created_at).toLocaleDateString('es-ES')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Descripción */}
                                {selectedProperty.description && (
                                    <div className="mt-6">
                                        <h4 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                                            <i className="mdi mdi-text text-primary mr-2"></i>
                                            Descripción
                                        </h4>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-gray-700 leading-relaxed">{selectedProperty.description}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Amenidades */}
                                {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                                            <i className="mdi mdi-star text-primary mr-2"></i>
                                            Amenidades ({selectedProperty.amenities.length})
                                        </h4>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {selectedProperty.amenities.map((amenity, index) => (
                                                    <div key={index} className="flex items-center p-2 bg-white rounded border">
                                                        <i className="mdi mdi-check-circle text-green-500 mr-2"></i>
                                                        <span className="text-sm text-gray-700">{amenity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Servicios */}
                                {selectedProperty.services && selectedProperty.services.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                                            <i className="mdi mdi-room-service text-primary mr-2"></i>
                                            Servicios ({selectedProperty.services.length})
                                        </h4>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {selectedProperty.services.map((service, index) => (
                                                    <div key={index} className="flex items-center p-2 bg-white rounded border">
                                                        <i className="mdi mdi-cog text-blue-500 mr-2"></i>
                                                        <span className="text-sm text-gray-700">{service}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Características */}
                                {selectedProperty.characteristics && selectedProperty.characteristics.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                                            <i className="mdi mdi-format-list-bulleted text-primary mr-2"></i>
                                            Características ({selectedProperty.characteristics.length})
                                        </h4>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {selectedProperty.characteristics.map((characteristic, index) => (
                                                    <div key={index} className="flex items-center p-2 bg-white rounded border">
                                                        <i className="mdi mdi-tag text-purple-500 mr-2"></i>
                                                        <span className="text-sm text-gray-700">{characteristic}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Galería */}
                                {selectedProperty.gallery && selectedProperty.gallery.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                                            <i className="mdi mdi-image-multiple text-primary mr-2"></i>
                                            Galería de Imágenes ({selectedProperty.gallery.length})
                                        </h4>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {selectedProperty.gallery.map((image, index) => (
                                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-white shadow-md">
                                                        <img 
                                                            src={`/api/property/media/${image}`}
                                                            alt={`Imagen ${index + 1}`}
                                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer con acciones */}
                            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                                    <a
                                        href={`/property/${selectedProperty.slug}`}
                                        target="_blank"
                                        className="inline-flex items-center justify-center px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        <i className="mdi mdi-open-in-new mr-2"></i>
                                        Ver en el Sitio
                                    </a>
                                    {selectedProperty.external_link && (
                                        <a
                                            href={selectedProperty.external_link}
                                            target="_blank"
                                            className="inline-flex items-center justify-center px-6 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
                                        >
                                            <i className="mdi mdi-link mr-2"></i>
                                            Ir a Plataforma
                                        </a>
                                    )}
                                    <button
                                        onClick={() => setShowPropertyModal(false)}
                                        className="inline-flex items-center justify-center px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
                                    >
                                        <i className="mdi mdi-close mr-2"></i>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <UserDashboard {...properties} />
            </Base>
        </CarritoProvider>
    );
});
