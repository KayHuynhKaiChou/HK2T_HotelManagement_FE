const API_URL_PUBLIC = import.meta.env.VITE_API_IMAGE_UPLOAD
const API_KEY = import.meta.env.VITE_API_KEY_IMAGE

export const uploadImageService = async (data: FormData) => {
    let response = await fetch(
        `${API_URL_PUBLIC}?key=${API_KEY}`,
        {
            method: 'POST',
            body: data
        }
    )
    let result = await response.json()
    return result
}