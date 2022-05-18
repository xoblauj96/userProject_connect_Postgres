import { testHttpClient } from "../services/base.service"

const basePath = `http://localhost:30000/api/v1/laoapps_ewallet/wallet/`;

export const test_Pay = (count: number) => {
    let data: object = {
        sender: "1",
        receiver: "2",
        amount: 100
    }
    testHttpClient(basePath + `pay`, data, count);
}

export const test_total = (count: number) => {
    let data: object = {
        sender: "88"
    }
    testHttpClient(basePath + `total`, data, count);
}

export const test_report_total_expend_value = (count: number) => {
    let data: object = {
        sender: "88"
    }
    testHttpClient(basePath + `report_total_expend_value`, data, count);
}

export const test_total = (count: number) => {
    let data: object = {
        sender: "88"
    }
    testHttpClient(basePath + `total`, data, count);
}

export const test_report_rows = (count: number) => {
    let data: object = {
        page: 1,
        limit: 5,
        sender: "88"
    }
    testHttpClient(basePath + `report_rows`, data, count);
}

export const test_report_history_income = (count: number) => {
    let data: object = {
        page: 1,
        limit: 5,
        sender: "88"
    }
    testHttpClient(basePath + `report_history_income`, data, count);
}

export const test_report_history_expend = (count: number) => {
    let data: object = {
        page: 1,
        limit: 5,
        sender: "88"
    }
    testHttpClient(basePath + `report_history_expend`, data, count);
}

export const test_current_verify_hash_string = (count: number) => {
    let data: object = {
        sender: "88",
        hashM: ""
    }
    testHttpClient(basePath + `current_verify_hash_string`, data, count);
}