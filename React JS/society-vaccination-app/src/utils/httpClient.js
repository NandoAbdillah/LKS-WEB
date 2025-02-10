export const httpClient = async (url, { method = "GET", body, token } = {}) => {
    const headers = new Headers({
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json",
    });

    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }

    const options = {
        method,
        headers,
        body : body ? JSON.stringify(body) : undefined,
        mode: "cors", // ✅ Jangan gunakan "no-cors"
        cache: "no-cache",
    };

  try {
        const response = await fetch(url, options);

        let data;
        try {
            data = await response.json(); // ✅ Coba parse JSON
        } catch {
            data = await response.text(); // ✅ Jika JSON gagal, ambil sebagai teks biasa
        }

        if (!response.ok) {
            throw {
                status: response.status,
                message: data.message || data || "Unknown error",
                violations : data.violations || {}
            };
        }

        return {
            status: response.status,
            message: data.message || "Success",
            data,
        };
    } catch (error) {
        console.error(`Fetch Error: ${error.message}`);

        throw {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
            violations : error.violations || {  }
        };
    }
};