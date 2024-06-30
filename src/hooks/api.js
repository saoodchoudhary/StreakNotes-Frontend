export const submitFormData = async (formData, endPoint) => {

    try {
        const response = await fetch(import.meta.env.VITE_API_URI+'/user/'+endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const message = `An error occurred: ${response.status}`;
            throw new Error(message);
        }

        return await response.json();

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};
