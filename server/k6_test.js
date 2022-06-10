import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '30s',
      preAllocatedVUs: 2000, // how large the initial pool of VUs would be
      maxVUs: 5000, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

// export default function () {
//   var randomProductId = Math.floor(Math.random() * (1000000 - 900000)) + 900000;

//   http.get(`http://localhost:5000/products/${randomProductId}/related`);

// }

export default function () {
  var randomCount = Math.floor(Math.random() * 100) + 1;
  var randomPage = Math.floor(Math.random() * (1000011 / randomCount)) + 1;
  http.get(`http://localhost:5000/products?page=${randomPage}&count=${randomCount}`);

}
