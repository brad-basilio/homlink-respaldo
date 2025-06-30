import BasicRest from "../BasicRest";

class SuccessStoriesRest extends BasicRest {
    path = "admin/success_stories";
    hasFiles = true;

    // Método para obtener servicios por IDs
    getServicesByIds = async (serviceIds) => {
        try {
            if (!serviceIds || serviceIds.length === 0) {
                return [];
            }
            
            // Método alternativo: usar el endpoint básico con parámetros de consulta
            const idsParam = serviceIds.join(',');
            const response = await fetch(`/api/admin/services/paginate`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-Xsrf-Token": decodeURIComponent(
                        document.cookie
                            .split("; ")
                            .find((row) => row.startsWith("XSRF-TOKEN="))
                            ?.split("=")[1] || ""
                    ),
                },
                body: JSON.stringify({
                    take: 100, // Aumentar para asegurar que obtengamos todos
                    skip: 0,
                    requireTotalCount: false,
                    isLoadingAll: true
                }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            const allServices = result.data || [];
            
            // Filtrar en el frontend los servicios que coincidan con los IDs
            const filteredServices = allServices.filter(service => 
                serviceIds.includes(service.id)
            );
            
            return filteredServices;
        } catch (error) {
            console.error("Error al obtener servicios por IDs:", error);
            return [];
        }
    };
}

export default SuccessStoriesRest;
