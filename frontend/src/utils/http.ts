export class $http {
    static request(method: string, url: string, data: any, config: any) {
        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();


            // @ts-ignore
            const BASE_URL = import.meta.env.VITE_API_BASE_URL;

            xhr.open(method, `${BASE_URL}${url}`);

           // Add bearer header with session id to request header if it exists

            console.log('session ID:', localStorage.getItem('sessionId'));

               if (localStorage.getItem('sessionId')) {
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('sessionId')}`);
               }


               
            xhr.setRequestHeader('Content-Type', 'application/json')

            xhr.onload = () => {
                let parsedResponse: any

                try {
                    parsedResponse = JSON.parse(xhr.response);
                } catch (e) {
                    parsedResponse = {message: xhr.response};
                }

                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(parsedResponse);
                    return;
                }





                // Check if config contains error property
                if (config && !config.disableErrorHandling) {
                    // Check if parsedResponse contains error property
                    if (parsedResponse.error) {
                        alert(parsedResponse.error);
                    } else {
                        alert(xhr.response)
                    }
                }

                reject({
                    status: xhr.status,
                    statusText: xhr.statusText,
                    body: parsedResponse

                });

                return;

            };
            xhr.onerror = () => {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send(JSON.stringify(data));
        });

    }

    static post(url: string, data: any, config = {}) {
        return this.request('POST', url, data, config);
    }
}
