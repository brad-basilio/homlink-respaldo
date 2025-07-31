import BasicRest from "../BasicRest";

class PropertiesRest extends BasicRest {
    path = "admin/properties";
    hasFiles = true;

    // Método para obtener propiedades públicas
    async getPublicProperties(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`/api/properties/public?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            return await response.json();
        } catch (error) {
            console.error('Error fetching public properties:', error);
            throw error;
        }
    }
}

export default PropertiesRest;
