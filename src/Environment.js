// const environment = {};
// environment.baseUrl = 'http://localhost:8080/master';
// export default environment;

import axios from 'axios';

const baseUrl = 'http://localhost:80880/master';

class Environment {
    getBaseUrl() {
        axios.post(baseUrl);
    }
}

export default Environment;
