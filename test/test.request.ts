import axios from "axios";

let data: any = {
    sender: "88",
    receiver: "99",
    amount: 5
}

for (let i = 0; i < 1000; i++) {
    axios.post(`http://localhost:25000/api/v1/laoapps_ewallet/wallet/pay`, data).then(res => {
        console.log(data);
        console.log(`res ------->`, res.data);
    });
}

