import { testHttpClient } from "../services/base.service"

const basePath = `http://localhost:30000/api/v1/laoapps_ewallet/issuer/`;

export const test_Issue = (count: number) => {
    let data: object = {
        amount: 100000
    }
    testHttpClient(basePath + `issue`, data, count);
}

export const test_IssuerPay = (count: number) => {
    let data: object = {
        receiver: "1",
        amount: 100
    }
    testHttpClient(basePath + `pay`, data, count);
}

// export const test_total = (count:number) => {
//     let data:object = {

//     }
//     testHttpClient(basePath + `total`, data, count);
// }

// export const test_report_total_expend_value = (count:number) => {
//     let data:object = {

//     }
//     testHttpClient(basePath + `report_total_expend_value`, data, count);
// }

// export const test_total = (count:number) => {
//     let data:object = {

//     }
//     testHttpClient(basePath + `total`, data, count);
// }

// export const test_report_rows = (count:number) => {
//     let data:object = {
//         page: 1,
//         limit: 5,
//     }
//     testHttpClient(basePath + `report_rows`, data, count);
// }

// export const test_report_history_income = (count:number) => {
//     let data:object = {
//         page: 1,
//         limit: 5,
//     }
//     testHttpClient(basePath + `report_history_income`, data, count);
// }

// export const test_report_history_expend = (count:number) => {
//     let data:object = {
//         page: 1,
//         limit: 5,
//     }
//     testHttpClient(basePath + `report_history_expend`, data, count);
// }

// export const test_current_verify_hash_string = (count:number) => {
//     let data:object = {
//         hashM: ""
//     }
//     testHttpClient(basePath + `current_verify_hash_string`, data, count);
// }