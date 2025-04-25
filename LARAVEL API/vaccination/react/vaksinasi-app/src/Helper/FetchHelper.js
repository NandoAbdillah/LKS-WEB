const FetchHelper = {
    base: 'http://127.0.0.1:8000/api',
    get: async (url, params = {}) => {
        const user = localStorage.getItem('user')
        const token = user ? JSON.parse(user).login_tokens : null
        if (!token) {
            window.location.href = '#login'
        }
        params['token'] = token
        url = FetchHelper.base + "/" + url + '?' + new URLSearchParams(params).toString()
        const response = await fetch(url);
        const data = await response.json();
        if (response.status !== 200 && response.status !== 201) {
            data.status = false
        } else {
            data.status = true
        }
        return data;
    },
    post: async (url, body = {}) => {
        url = FetchHelper.base + "/" + url
        if (!url.includes('login')) {
            const user = localStorage.getItem('user')
            const token = user ? JSON.parse(user).login_tokens : null
            if (!token) {
                window.location.href = '#login'
            }
            url = url + '?token=' + token
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (response.status !== 200 && response.status !== 201) {
            data.status = false
        } else {
            data.status = true
        }
        if (data.status === false && data.message === 'Unauthorized user') {
            window.location.href = '#login'
        }
        return data;
    }
}
export default FetchHelper;