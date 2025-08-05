import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from '../Utils/CreateReactScript';
import BaseAdminto from '../Components/Adminto/Base';

const PropertyMetrics = ({ session }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('30');
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('overview');
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);
    const pieChartRef = useRef(null);
    const [chartInstances, setChartInstances] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);

    useEffect(() => {
        loadDashboardData();
    }, [selectedPeriod]);

    // Cargar Chart.js dinámicamente
    useEffect(() => {
        if (!window.Chart) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => {
                console.log('📊 Chart.js cargado correctamente');
                if (dashboardData) {
                    createCharts();
                }
            };
            document.head.appendChild(script);
        } else if (dashboardData) {
            createCharts();
        }
    }, [dashboardData]);

    // Limpiar gráficas al desmontar componente
    useEffect(() => {
        return () => {
            Object.values(chartInstances).forEach(chart => {
                if (chart && typeof chart.destroy === 'function') {
                    chart.destroy();
                }
            });
        };
    }, [chartInstances]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - parseInt(selectedPeriod) * 24 * 60 * 60 * 1000)
                .toISOString().split('T')[0];

            console.log('🔄 Cargando métricas del dashboard...', { startDate, endDate });

            const response = await fetch(`/api/admin-dashboard-metrics?date_from=${startDate}&date_to=${endDate}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('📊 Datos del dashboard recibidos:', data);
                setDashboardData(data);
                
                // Preparar datos para gráficas
                const globalMetrics = data.global_metrics || {};
                const chartInfo = {
                    labels: ['Vistas', 'Clicks Airbnb', 'Galería'],
                    data: [
                        globalMetrics.property_view || 0,
                        globalMetrics.airbnb_click || 0,
                        globalMetrics.gallery_view || 0
                    ],
                    colors: ['#727cf5', '#fa5c7c', '#0acf97']
                };
                setChartData(chartInfo);
            } else {
                console.error('❌ Error en respuesta del servidor:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('❌ Error cargando datos del dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    // Crear gráficas con Chart.js
    const createCharts = () => {
        if (!window.Chart || !chartData) return;

        // Destruir gráficas existentes
        Object.values(chartInstances).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });

        const newChartInstances = {};

        // Gráfica de barras
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            newChartInstances.barChart = new window.Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Interacciones',
                        data: chartData.data,
                        backgroundColor: chartData.colors.map(color => color + '40'),
                        borderColor: chartData.colors,
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: 'white',
                            bodyColor: 'white',
                            borderColor: '#727cf5',
                            borderWidth: 1
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: true,
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                color: '#8391a2'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#8391a2'
                            }
                        }
                    }
                }
            });
        }

        // Gráfica circular (pie chart)
        if (pieChartRef.current) {
            const ctx2 = pieChartRef.current.getContext('2d');
            newChartInstances.pieChart = new window.Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        data: chartData.data,
                        backgroundColor: chartData.colors.map(color => color + '80'),
                        borderColor: chartData.colors,
                        borderWidth: 2,
                        hoverBackgroundColor: chartData.colors.map(color => color + 'CC'),
                        hoverBorderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                color: '#8391a2'
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: 'white',
                            bodyColor: 'white',
                            borderColor: '#727cf5',
                            borderWidth: 1,
                            callbacks: {
                                label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                                    return `${context.label}: ${context.parsed} (${percentage}%)`;
                                }
                            }
                        }
                    },
                    cutout: '60%'
                }
            });
        }

        setChartInstances(newChartInstances);
        console.log('📊 Gráficas creadas exitosamente:', newChartInstances);
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

    const handleShowUserProperties = (user) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    const closeUserModal = () => {
        setShowUserModal(false);
        setSelectedUser(null);
    };

    const MetricCard = ({ title, value, icon, color, subtitle, trend }) => (
        <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <div className={`avatar-md bg-${color} bg-gradient rounded-circle d-flex align-items-center justify-content-center me-3`} style={{ width: '50px', height: '50px' }}>
                        <i className={`${icon} text-white`} style={{ fontSize: '20px' }}></i>
                    </div>
                    <div className="flex-grow-1">
                        <h6 className="text-muted mb-1 font-size-13">{title}</h6>
                        <h3 className={`mb-0 text-${color}`}>{formatNumber(value)}</h3>
                        {subtitle && <p className="text-muted mb-0 font-size-11">{subtitle}</p>}
                        {trend && (
                            <div className="mt-1">
                                <span className={`badge badge-soft-${trend.type} font-size-10`}>
                                    <i className={`mdi mdi-arrow-${trend.type === 'success' ? 'up' : 'down'}-bold me-1`}></i>
                                    {trend.value}%
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <h4 className="page-title text-dark">📊 Métricas de Propiedades</h4>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/admin" className="text-primary">Dashboard</a></li>
                                <li className="breadcrumb-item active text-muted">Métricas</li>
                            </ol>
                        </div>
                    </div>
                </div>
                
                <div className="row justify-content-center" style={{ minHeight: '400px' }}>
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <h5 className="text-dark mb-2">Cargando datos de métricas...</h5>
                            <p className="text-muted">Por favor espera mientras procesamos la información</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const globalMetrics = dashboardData?.global_metrics || {};
    const topProperties = dashboardData?.top_properties || [];
    const topUsers = dashboardData?.top_users || [];

    // Debug: Log the metrics data
    if (dashboardData) {
        console.log('📈 Métricas procesadas:', {
            globalMetrics,
            totalViews: globalMetrics.property_view || 0,
            totalAirbnb: globalMetrics.airbnb_click || 0,
            totalGallery: globalMetrics.gallery_view || 0,
            airbnbConversion: globalMetrics.property_view > 0 
                ? ((globalMetrics.airbnb_click || 0) / globalMetrics.property_view * 100).toFixed(1)
                : '0.0',
            galleryConversion: globalMetrics.property_view > 0 
                ? ((globalMetrics.gallery_view || 0) / globalMetrics.property_view * 100).toFixed(1)
                : '0.0'
        });
    }

    return (
        <div className="container-fluid">
            {/* Header mejorado */}
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box bg-primary text-white rounded p-4 mb-4" style={{ background: 'linear-gradient(135deg, #727cf5 0%, #5b69bc 100%)' }}>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h4 className="page-title text-white mb-1">
                                    <i className="mdi mdi-chart-line me-2"></i>Métricas de Propiedades
                                </h4>
                                <p className="text-white mb-0" style={{ opacity: '0.8' }}>
                                    Análisis detallado del rendimiento de las propiedades en la plataforma
                                </p>
                            </div>
                            <div className="text-end">
                                <div className="text-white font-size-12" style={{ opacity: '0.7' }}>Último período</div>
                                <div className="text-white font-weight-bold">
                                    {selectedPeriod === '7' && 'Últimos 7 días'}
                                    {selectedPeriod === '30' && 'Últimos 30 días'}
                                    {selectedPeriod === '90' && 'Últimos 3 meses'}
                                    {selectedPeriod === '365' && 'Último año'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selector de período mejorado */}
            <div className="row mb-4">
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body py-3">
                            <label htmlFor="period" className="form-label text-muted font-size-12 mb-2">
                                <i className="mdi mdi-calendar-range me-1"></i>PERÍODO DE ANÁLISIS
                            </label>
                            <select
                                id="period"
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="form-select border-0 bg-light"
                            >
                                <option value="7">📅 Últimos 7 días</option>
                                <option value="30">📊 Últimos 30 días</option>
                                <option value="90">📈 Últimos 3 meses</option>
                                <option value="365">📋 Último año</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body py-3 d-flex align-items-center">
                            <div className="avatar-sm bg-light rounded me-3">
                                <i className="mdi mdi-information-outline text-primary h5 mb-0"></i>
                            </div>
                            <div>
                                <h6 className="mb-1 text-dark">Información del Dashboard</h6>
                                <p className="text-muted mb-0 font-size-12">
                                    Los datos se actualizan en tiempo real. Selecciona diferentes períodos para obtener insights detallados.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navegación con tabs mejorada */}
            <div className="row">
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-bottom-0 py-3">
                            <ul className="nav nav-pills nav-justified" role="tablist">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${selectedTab === 'overview' ? 'active' : ''} d-flex align-items-center justify-content-center`}
                                        onClick={() => setSelectedTab('overview')}
                                        style={{ border: 'none', padding: '12px 20px' }}
                                    >
                                        <i className="mdi mdi-view-dashboard me-2"></i>
                                        Resumen General
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${selectedTab === 'properties' ? 'active' : ''} d-flex align-items-center justify-content-center`}
                                        onClick={() => setSelectedTab('properties')}
                                        style={{ border: 'none', padding: '12px 20px' }}
                                    >
                                        <i className="mdi mdi-home-city me-2"></i>
                                        Top Propiedades
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${selectedTab === 'users' ? 'active' : ''} d-flex align-items-center justify-content-center`}
                                        onClick={() => setSelectedTab('users')}
                                        style={{ border: 'none', padding: '12px 20px' }}
                                    >
                                        <i className="mdi mdi-account-group me-2"></i>
                                        Top Usuarios
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
                {/* Overview Tab */}
                {selectedTab === 'overview' && (
                    <div>
                        {/* Métricas Principales */}
                        <div className="row g-3 mb-4">
                            <div className="col-xl-3 col-md-6">
                                <MetricCard
                                    title="Total Visualizaciones"
                                    value={globalMetrics.property_view || 0}
                                    icon="mdi mdi-eye-outline"
                                    color="primary"
                                    subtitle="Vistas de propiedades"
                                    trend={{ type: 'success', value: '12.5' }}
                                />
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <MetricCard
                                    title="Clicks a Airbnb"
                                    value={globalMetrics.airbnb_click || 0}
                                    icon="mdi mdi-open-in-new"
                                    color="danger"
                                    subtitle="Redirecciones externas"
                                    trend={{ type: 'success', value: '8.2' }}
                                />
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <MetricCard
                                    title="Galería Visualizada"
                                    value={globalMetrics.gallery_view || 0}
                                    icon="mdi mdi-image-multiple"
                                    color="success"
                                    subtitle="Imágenes vistas"
                                    trend={{ type: 'success', value: '7.3' }}
                                />
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <MetricCard
                                    title="Total Interacciones"
                                    value={
                                        (globalMetrics.property_view || 0) + 
                                        (globalMetrics.airbnb_click || 0) + 
                                        (globalMetrics.gallery_view || 0)
                                    }
                                    icon="mdi mdi-chart-line"
                                    color="info"
                                    subtitle="Actividad total"
                                    trend={{ type: 'success', value: '15.7' }}
                                />
                            </div>
                        </div>

                        {/* Análisis de Conversión y Gráfica */}
                        <div className="row g-3">
                            <div className="col-lg-8">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-header bg-white border-bottom">
                                        <h5 className="card-title mb-0">
                                            <i className="mdi mdi-trending-up text-success me-2"></i>
                                            Análisis de Conversión y Tendencias
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row text-center mb-4">
                                            <div className="col-md-6 mb-3">
                                                <div className="border-end">
                                                    <div className="d-flex align-items-center justify-content-center mb-3">
                                                        <div className="avatar-md bg-danger bg-gradient rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                                            <i className="mdi mdi-open-in-new text-white" style={{ fontSize: '20px' }}></i>
                                                        </div>
                                                        <div>
                                                            <h6 className="text-muted mb-1">Vista → Airbnb</h6>
                                                            <h2 className="text-danger mb-0">
                                                                {globalMetrics.property_view > 0 
                                                                    ? ((globalMetrics.airbnb_click || 0) / globalMetrics.property_view * 100).toFixed(1)
                                                                    : '0.0'
                                                                }%
                                                            </h2>
                                                        </div>
                                                    </div>
                                                    <div className="progress mb-2" style={{ height: '6px' }}>
                                                        <div 
                                                            className="progress-bar bg-danger" 
                                                            style={{ 
                                                                width: `${globalMetrics.property_view > 0 
                                                                    ? ((globalMetrics.airbnb_click || 0) / globalMetrics.property_view * 100)
                                                                    : 0
                                                                }%` 
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p className="text-muted font-size-12 mb-0">
                                                        De {formatNumber(globalMetrics.property_view || 0)} vistas, 
                                                        {formatNumber(globalMetrics.airbnb_click || 0)} fueron a Airbnb
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="d-flex align-items-center justify-content-center mb-3">
                                                    <div className="avatar-md bg-success bg-gradient rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                                        <i className="mdi mdi-image-multiple text-white" style={{ fontSize: '20px' }}></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-muted mb-1">Vista → Galería</h6>
                                                        <h2 className="text-success mb-0">
                                                            {globalMetrics.property_view > 0 
                                                                ? ((globalMetrics.gallery_view || 0) / globalMetrics.property_view * 100).toFixed(1)
                                                                : '0.0'
                                                            }%
                                                        </h2>
                                                    </div>
                                                </div>
                                                <div className="progress mb-2" style={{ height: '6px' }}>
                                                    <div 
                                                        className="progress-bar bg-success" 
                                                        style={{ 
                                                            width: `${globalMetrics.property_view > 0 
                                                                ? ((globalMetrics.gallery_view || 0) / globalMetrics.property_view * 100)
                                                                : 0
                                                            }%` 
                                                        }}
                                                    ></div>
                                                </div>
                                                <p className="text-muted font-size-12 mb-0">
                                                    De {formatNumber(globalMetrics.property_view || 0)} vistas, 
                                                    {formatNumber(globalMetrics.gallery_view || 0)} vieron galería completa
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Gráfica de barras real con Chart.js */}
                                        <div className="mt-4">
                                            <h6 className="mb-3">
                                                <i className="mdi mdi-chart-bar text-primary me-2"></i>
                                                Distribución de Interacciones
                                            </h6>
                                            <div className="position-relative" style={{ height: '250px' }}>
                                                <canvas ref={chartRef} id="metricsBarChart"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-header bg-white border-bottom">
                                        <h5 className="card-title mb-0">
                                            <i className="mdi mdi-chart-donut text-info me-2"></i>
                                            Resumen de Actividad
                                        </h5>
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="mb-4">
                                            <div className="avatar-lg bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                                <i className="mdi mdi-chart-pie text-primary" style={{ fontSize: '32px' }}></i>
                                            </div>
                                            <h4 className="text-primary mb-1">
                                                {formatNumber(
                                                    (globalMetrics.airbnb_click || 0) + (globalMetrics.gallery_view || 0)
                                                )}
                                            </h4>
                                            <p className="text-muted mb-0">Total de Conversiones</p>
                                        </div>
                                        
                                        {/* Gráfico circular real con Chart.js */}
                                        <div className="mb-4">
                                            <div className="position-relative" style={{ height: '200px' }}>
                                                <canvas ref={pieChartRef} id="metricsPieChart"></canvas>
                                            </div>
                                        </div>
                                        
                                        <div className="row text-center">
                                            <div className="col-6">
                                                <div className="py-2">
                                                    <p className="text-muted mb-1 font-size-12">Engagement</p>
                                                    <h5 className="text-dark mb-0">
                                                        {globalMetrics.property_view > 0 ? 'Alto' : 'Bajo'}
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="py-2">
                                                    <p className="text-muted mb-1 font-size-12">Rendimiento</p>
                                                    <h5 className="text-dark mb-0">
                                                        {(globalMetrics.airbnb_click || 0) > 10 ? '🔥' : 
                                                         (globalMetrics.airbnb_click || 0) > 5 ? '⚡' : '📊'}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Nueva sección: Gráfica de tendencias */}
                        <div className="row mt-4">
                            <div className="col-12">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-header bg-white border-bottom">
                                        <h5 className="card-title mb-0">
                                            <i className="mdi mdi-chart-timeline-variant text-info me-2"></i>
                                            Tendencias de Actividad
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-md-8">
                                                <p className="text-muted mb-0">
                                                    Análisis de la actividad de usuarios en el período seleccionado
                                                </p>
                                            </div>
                                            <div className="col-md-4 text-end">
                                                <div className="btn-group btn-group-sm">
                                                    <button 
                                                        className={`btn ${selectedPeriod === '7' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                        onClick={() => setSelectedPeriod('7')}
                                                    >
                                                        7d
                                                    </button>
                                                    <button 
                                                        className={`btn ${selectedPeriod === '30' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                        onClick={() => setSelectedPeriod('30')}
                                                    >
                                                        30d
                                                    </button>
                                                    <button 
                                                        className={`btn ${selectedPeriod === '90' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                        onClick={() => setSelectedPeriod('90')}
                                                    >
                                                        90d
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Métricas rápidas */}
                                        <div className="row g-3">
                                            <div className="col-md-3">
                                                <div className="text-center p-3 bg-light rounded">
                                                    <h4 className="text-primary mb-1">{formatNumber(globalMetrics.property_view || 0)}</h4>
                                                    <p className="text-muted mb-0 font-size-12">Total Vistas</p>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="text-center p-3 bg-light rounded">
                                                    <h4 className="text-danger mb-1">{formatNumber(globalMetrics.airbnb_click || 0)}</h4>
                                                    <p className="text-muted mb-0 font-size-12">Clicks Airbnb</p>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="text-center p-3 bg-light rounded">
                                                    <h4 className="text-success mb-1">{formatNumber(globalMetrics.gallery_view || 0)}</h4>
                                                    <p className="text-muted mb-0 font-size-12">Galería Vista</p>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="text-center p-3 bg-light rounded">
                                                    <h4 className="text-info mb-1">
                                                        {globalMetrics.property_view > 0 
                                                            ? (((globalMetrics.airbnb_click || 0) + (globalMetrics.gallery_view || 0)) / globalMetrics.property_view * 100).toFixed(1)
                                                            : '0.0'
                                                        }%
                                                    </h4>
                                                    <p className="text-muted mb-0 font-size-12">CTR Global</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Top Properties Tab */}
                {selectedTab === 'properties' && (
                    <div>
                        <div className="card border-0 shadow-sm">
                            <div className="card-header text-white" style={{ background: 'linear-gradient(135deg, #727cf5 0%, #5b69bc 100%)' }}>
                                <h5 className="card-title mb-0 text-white">
                                    <i className="mdi mdi-trophy me-2"></i>
                                    🏆 Propiedades Más Populares
                                </h5>
                                <p className="text-white mb-0 font-size-12" style={{ opacity: '0.8' }}>
                                    Ranking de propiedades por número de visualizaciones en el período seleccionado
                                </p>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="border-0 font-size-12 text-muted text-uppercase">Ranking</th>
                                                <th className="border-0 font-size-12 text-muted text-uppercase">Propiedad</th>
                                                <th className="border-0 font-size-12 text-muted text-uppercase">Usuario</th>
                                                <th className="border-0 font-size-12 text-muted text-uppercase">Visualizaciones</th>
                                                <th className="border-0 font-size-12 text-muted text-uppercase">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topProperties.length > 0 ? topProperties.map((property, index) => (
                                                <tr key={property.id}>
                                                    <td className="py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className={`avatar-xs rounded-circle d-flex align-items-center justify-content-center me-2 ${
                                                                index === 0 ? 'bg-warning' : 
                                                                index === 1 ? 'bg-secondary' : 
                                                                index === 2 ? 'bg-danger' : 'bg-light'
                                                            }`}>
                                                                <span className={`font-size-12 font-weight-bold ${
                                                                    index < 3 ? 'text-white' : 'text-dark'
                                                                }`}>
                                                                    {index + 1}
                                                                </span>
                                                            </div>
                                                            {index === 0 && <i className="mdi mdi-crown text-warning"></i>}
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <div>
                                                            <h6 className="mb-1 font-size-14">
                                                                <strong>{property.title || 'Sin título'}</strong>
                                                            </h6>
                                                            <p className="text-muted mb-1 font-size-12">
                                                                📍 {property.district || 'N/A'}, {property.city || 'N/A'}
                                                            </p>
                                                            <p className="text-muted mb-0 font-size-11">
                                                                <code className="text-muted">/{property.slug || 'sin-slug'}</code>
                                                                {property.price_per_night && (
                                                                    <span className="ms-2 badge badge-soft-info">
                                                                        {property.currency || '$'}{property.price_per_night}/noche
                                                                    </span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar-xs bg-light rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                                                <i className="mdi mdi-account text-muted" style={{ fontSize: '14px' }}></i>
                                                            </div>
                                                            <div>
                                                                <span className="font-size-13 fw-bold">
                                                                    {property.user_name || `Usuario #${property.user_id}`}
                                                                </span>
                                                                {property.user_email && (
                                                                    <div className="text-muted font-size-11">
                                                                        {property.user_email}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="me-2">
                                                                <span className="badge badge-soft-success font-size-12">
                                                                    <i className="mdi mdi-eye me-1"></i>
                                                                    {formatNumber(property.views_count || 0)}
                                                                </span>
                                                            </div>
                                                            <div className="progress flex-grow-1" style={{ height: '6px', maxWidth: '80px' }}>
                                                                <div 
                                                                    className="progress-bar bg-success" 
                                                                    style={{ 
                                                                        width: `${Math.min((property.views_count || 0) / Math.max(...topProperties.map(p => p.views_count || 1)) * 100, 100)}%` 
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <a 
                                                            href={`/property/${property.slug}`}
                                                            target="_blank"
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            <i className="mdi mdi-open-in-new me-1"></i>
                                                            Ver Propiedad
                                                        </a>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center py-5">
                                                        <div className="text-muted">
                                                            <i className="mdi mdi-home-outline h1 text-muted"></i>
                                                            <h5 className="mt-3">No hay datos disponibles</h5>
                                                            <p>No se encontraron propiedades con visualizaciones en este período.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Top Users Tab */}
                {selectedTab === 'users' && (
                    <div>
                        <div className="card border-0 shadow-sm">
                            <div className="card-header text-white" style={{ background: 'linear-gradient(135deg, #0acf97 0%, #038969 100%)' }}>
                                <h5 className="card-title mb-0 text-white">
                                    <i className="mdi mdi-account-star me-2"></i>
                                    👥 Usuarios Más Activos
                                </h5>
                                <p className="text-white mb-0 font-size-12" style={{ opacity: '0.8' }}>
                                    Ranking de usuarios por mayor actividad e interacciones en sus propiedades
                                </p>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="border-0 font-size-12 text-muted text-uppercase">Ranking</th>
                                                <th className="border-0 font-size-12 text-muted text-uppercase">Usuario</th>
                                                <th className="border-0 font-size-12 text-muted text-uppercase">Email</th>
                                                <th className="border-0 font-size-12 text-muted text-uppercase">Propiedades</th>
                                                <th className="border-0 font-size-12 text-muted text-uppercase">Interacciones</th>
                                                <th className="border-0 font-size-12 text-muted text-uppercase">Estado</th>
                                                <th className="border-0 font-size-12 text-muted text-uppercase">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topUsers.length > 0 ? topUsers.map((user, index) => (
                                                <tr key={user.id}>
                                                    <td className="py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className={`avatar-sm rounded d-flex align-items-center justify-content-center me-2 ${
                                                                index === 0 ? 'bg-gradient-warning' : 
                                                                index === 1 ? 'bg-gradient-info' : 
                                                                index === 2 ? 'bg-gradient-danger' : 'bg-light'
                                                            }`}>
                                                                <span className={`font-size-14 font-weight-bold ${
                                                                    index < 3 ? 'text-white' : 'text-dark'
                                                                }`}>
                                                                    #{index + 1}
                                                                </span>
                                                            </div>
                                                            {index === 0 && <i className="mdi mdi-medal text-warning"></i>}
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar-sm bg-primary bg-gradient rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                                                <span className="text-white font-size-16 font-weight-bold">
                                                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-1 font-size-14 fw-bold">
                                                                    {user.name || 'Usuario sin nombre'}
                                                                </h6>
                                                                <p className="text-muted mb-0 font-size-12">
                                                                    ID: {user.id} 
                                                                    {user.created_at && (
                                                                        <span className="ms-2">
                                                                            • Desde {new Date(user.created_at).getFullYear()}
                                                                        </span>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <div>
                                                            <span className="font-size-13">
                                                                {user.email || 'No disponible'}
                                                            </span>
                                                            {user.email_verified_at && (
                                                                <div className="mt-1">
                                                                    <span className="badge badge-soft-success font-size-10">
                                                                        <i className="mdi mdi-check-circle me-1"></i>Verificado
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="text-center">
                                                            <div className="mb-1">
                                                                <span className="badge badge-soft-info font-size-14">
                                                                    <i className="mdi mdi-home-city me-1"></i>
                                                                    {user.properties_count || 0}
                                                                </span>
                                                            </div>
                                                            <small className="text-muted font-size-11">
                                                                {user.properties_count > 1 ? 'propiedades' : 'propiedad'}
                                                            </small>
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="d-flex align-items-center">
                                                            <span className="badge badge-soft-primary font-size-12 me-2">
                                                                <i className="mdi mdi-trending-up me-1"></i>
                                                                {formatNumber(user.total_interactions || 0)}
                                                            </span>
                                                            <div className="progress flex-grow-1" style={{ height: '6px', maxWidth: '60px' }}>
                                                                <div 
                                                                    className="progress-bar bg-primary" 
                                                                    style={{ 
                                                                        width: `${Math.min((user.total_interactions || 0) / Math.max(...topUsers.map(u => u.total_interactions || 1)) * 100, 100)}%` 
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <span className={`badge badge-soft-${(user.total_interactions || 0) > 50 ? 'success' : (user.total_interactions || 0) > 20 ? 'warning' : 'secondary'}`}>
                                                            {(user.total_interactions || 0) > 50 ? '🔥 Muy Activo' : 
                                                             (user.total_interactions || 0) > 20 ? '⚡ Activo' : '😴 Moderado'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="btn-group">
                                                            <button 
                                                                className="btn btn-sm btn-outline-info" 
                                                                title="Ver propiedades"
                                                                onClick={() => handleShowUserProperties(user)}
                                                            >
                                                                <i className="mdi mdi-home-city"></i>
                                                            </button>
                                                            <button className="btn btn-sm btn-outline-primary" title="Ver perfil">
                                                                <i className="mdi mdi-account-details"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center py-5">
                                                        <div className="text-muted">
                                                            <i className="mdi mdi-account-group-outline h1 text-muted"></i>
                                                            <h5 className="mt-3">No hay datos de usuarios</h5>
                                                            <p>No se encontraron usuarios con actividad en este período.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de Propiedades del Usuario */}
            {showUserModal && selectedUser && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={closeUserModal}>
                    <div className="modal-dialog modal-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header" style={{ background: 'linear-gradient(135deg, #727cf5 0%, #5b69bc 100%)' }}>
                                <div className="d-flex align-items-center">
                                    <div className="avatar-md bg-white bg-gradient rounded-circle me-3 d-flex align-items-center justify-content-center">
                                        <span className="text-primary font-size-18 font-weight-bold">
                                            {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                    <div>
                                        <h5 className="modal-title text-white mb-1">
                                            <i className="mdi mdi-home-city me-2"></i>
                                            Propiedades de {selectedUser.name || 'Usuario'}
                                        </h5>
                                        <p className="text-white mb-0" style={{ opacity: '0.8', fontSize: '14px' }}>
                                            {selectedUser.properties_count} propiedades • {formatNumber(selectedUser.total_interactions)} interacciones totales
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    type="button" 
                                    className="btn-close btn-close-white"
                                    onClick={closeUserModal}
                                ></button>
                            </div>
                            <div className="modal-body p-0">
                                {selectedUser.properties_details && selectedUser.properties_details.length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th className="border-0">#</th>
                                                    <th className="border-0">Propiedad</th>
                                                    <th className="border-0 text-center">Vistas</th>
                                                    <th className="border-0 text-center">Clicks Airbnb</th>
                                                    <th className="border-0 text-center">Galería</th>
                                                    <th className="border-0 text-center">Total</th>
                                                    <th className="border-0 text-center">Conversión</th>
                                                    <th className="border-0">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedUser.properties_details.map((property, index) => (
                                                    <tr key={property.id}>
                                                        <td className="py-3">
                                                            <div className="d-flex align-items-center">
                                                                <div className={`avatar-xs rounded-circle d-flex align-items-center justify-content-center me-2 ${
                                                                    index === 0 ? 'bg-warning' : 
                                                                    index === 1 ? 'bg-info' : 
                                                                    index === 2 ? 'bg-success' : 'bg-light'
                                                                }`}>
                                                                    <span className={`font-size-11 font-weight-bold ${
                                                                        index < 3 ? 'text-white' : 'text-dark'
                                                                    }`}>
                                                                        {index + 1}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3">
                                                            <div>
                                                                <h6 className="mb-1 font-size-14">
                                                                    <strong>{property.title || 'Sin título'}</strong>
                                                                </h6>
                                                                <p className="text-muted mb-1 font-size-12">
                                                                    📍 {property.district || 'N/A'}, {property.city || 'N/A'}
                                                                </p>
                                                                <p className="text-muted mb-0 font-size-11">
                                                                    <code className="text-muted">/{property.slug || 'sin-slug'}</code>
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 text-center">
                                                            <span className="badge badge-soft-primary">
                                                                <i className="mdi mdi-eye me-1"></i>
                                                                {property.views}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 text-center">
                                                            <span className="badge badge-soft-danger">
                                                                <i className="mdi mdi-open-in-new me-1"></i>
                                                                {property.airbnb_clicks}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 text-center">
                                                            <span className="badge badge-soft-success">
                                                                <i className="mdi mdi-image-multiple me-1"></i>
                                                                {property.gallery_views}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 text-center">
                                                            <span className="badge badge-soft-info font-size-12">
                                                                <i className="mdi mdi-chart-line me-1"></i>
                                                                <strong>{property.total_interactions}</strong>
                                                            </span>
                                                        </td>
                                                        <td className="py-3 text-center">
                                                            <span className={`badge badge-soft-${
                                                                property.views > 0 && (property.airbnb_clicks + property.gallery_views) / property.views > 0.1 ? 'success' :
                                                                property.views > 0 && (property.airbnb_clicks + property.gallery_views) / property.views > 0.05 ? 'warning' : 'secondary'
                                                            }`}>
                                                                {property.views > 0 ? 
                                                                    `${((property.airbnb_clicks + property.gallery_views) / property.views * 100).toFixed(1)}%` : 
                                                                    '0.0%'
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className="py-3">
                                                            <a 
                                                                href={`/property/${property.slug}`}
                                                                target="_blank"
                                                                className="btn btn-sm btn-outline-primary"
                                                            >
                                                                <i className="mdi mdi-open-in-new me-1"></i>
                                                                Ver
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-5">
                                        <div className="text-muted">
                                            <i className="mdi mdi-home-outline h1 text-muted"></i>
                                            <h5 className="mt-3">No hay propiedades con actividad</h5>
                                            <p>Este usuario no tiene propiedades con interacciones en el período seleccionado.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer bg-light">
                                <div className="w-100 d-flex justify-content-between align-items-center">
                                    <div>
                                        <small className="text-muted">
                                            <i className="mdi mdi-information-outline me-1"></i>
                                            Datos del período: {selectedPeriod === '7' && 'Últimos 7 días'}{selectedPeriod === '30' && 'Últimos 30 días'}{selectedPeriod === '90' && 'Últimos 3 meses'}{selectedPeriod === '365' && 'Último año'}
                                        </small>
                                    </div>
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                        onClick={closeUserModal}
                                    >
                                        <i className="mdi mdi-close me-1"></i>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <BaseAdminto {...properties} title="Métricas de Propiedades">
            <PropertyMetrics {...properties} />
        </BaseAdminto>
    );
});
