import request from './request'
import requests from "./requestTo"

const {postUtil, getUtil} = requests

const baseIp=`http://172.20.36.228:60010`
//const baseIp = `http://15.226.3.16:60024`
let queryTableList = baseIp + `/queryTableList`;//查询所有表,get
let queryMockData = baseIp + `/queryMockData`;//查询对应表数据,post
let saveMockData = baseIp + `/saveMockData`;//新增,修改,post
let removeMockData = baseIp + `/removeMockData`;//删除
//============================================================================
//责任区部分
let queryAreaResponsibilityUrl = baseIp + `/queryAllLeftData`; //查询
let addAreaResponsibilityUrl = baseIp + `/savePersonLiable`; //新增
let editAreaResponsibilityUrl = baseIp + `/updatePersonLiable`; //修改
let deleteAreaResponsibilityUrl = baseIp + `/deletePersonLiable`; //删除
//整个页面整体数据
let queryAllLeftUrl = baseIp + `/queryAllLeftDataDetail`; //查询
let editLeftDataUrl = baseIp + `/updateLeftDataByPage`; //修改
//停车场统计数据维护
let queryParkingInfoUrl = baseIp + `/queryParkingInfo`; //查询
let saveParkingInfoUrl = baseIp + `/saveParkingInfo`; //修改
//停车场出入口设备维护
let saveParkingDeviceDataUrl = baseIp + `/saveParkingInfo/deviceData`; //修改出入口设备
//停车场是否启用真实数据
let querySwitchMethodUrl = baseIp + `/querySwitchMethod`; //查询
let updateParkingDataStatusUrl = baseIp + `/updateParkingDataStatus`; //修改
//停车场轨交数据维护
let queryGjslInfoUrl = baseIp + `/queryGjslInfo`; //查询
let saveGjslInfoUrl = baseIp + `/saveGjslInfo`; //修改

//战果总计-本日数据维护
let queryVictoryDataUrl = baseIp + `/queryVictoryData`; //查询
let saveVictoryDataUrl = baseIp + `/saveVictoryData`; //修改、

export function alltableList() {
    return request({
        url: queryTableList,
        method: 'get',
    })
}

export function tableData(params) {
    return request({
        url: queryMockData,
        method: 'post',
        data: params
    })
}

export function editMockData(params) {
    return postUtil(saveMockData, JSON.stringify(params))
}

export function delMockData(params) {
    return postUtil(removeMockData, params)
}

/**
 * 查询责任区
 */
export function queryAreaResponsibility() {
    return request({
        url: queryAreaResponsibilityUrl,
        method: 'get',
    })
}

export function addAreaResponsibility(params) {
    return request({
        url: addAreaResponsibilityUrl,
        method: 'post',
        data: params
    })
    //return postUtil(addAreaResponsibilityUrl,JSON.stringify(params))
}

export function editAreaResponsibility(params) {
    return request({
        url: editAreaResponsibilityUrl,
        method: 'post',
        data: params
    })
}

export function deleteAreaResponsibility(params) {
    return request({
        url: deleteAreaResponsibilityUrl,
        method: 'post',
        data: params
    })
}

//查询左屏所有数据
export function queryAllLeft() {
    return request({
        url: queryAllLeftUrl,
        method: 'get',
    })
}

//修改所有数据

export function editLeftData(params) {
    return request({
        url: editLeftDataUrl,
        method: 'post',
        data: params
    })
}

//查询停车场数据维护
export function queryParkingInfo() {
    return request({
        url: queryParkingInfoUrl,
        method: 'get',
    })
}

//修改停车场数据维护
export function saveParkingInfo(params) {
    return request({
        url: saveParkingInfoUrl,
        method: 'post',
        data: params
    })
}

//修改停车场出入口设备维护
export function saveParkingDeviceData(params) {
    return request({
        url: saveParkingDeviceDataUrl,
        method: 'post',
        data: params
    })
}

//查询停车场轨交数据维护
export function queryGjslInfo() {
    return request({
        url: queryGjslInfoUrl,
        method: 'get',
    })
}

//修改停车场轨交数据维护
export function saveGjslInfo(params) {
    return request({
        url: saveGjslInfoUrl,
        method: 'post',
        data: params
    })
}

//查询//停车场是否启用真实数据
export function querySwitchMethod() {
    return request({
        url: querySwitchMethodUrl,
        method: 'get',
    })
}

//修改//停车场是否启用真实数据
export function updateParkingDataStatus(params) {
    return request({
        url: updateParkingDataStatusUrl,
        method: 'post',
        data: params
    })
}

//查询战果总计-本日数据维护
export function queryVictoryData() {
    return request({
        url: queryVictoryDataUrl,
        method: 'get',
    })
}

//修改战果总计-本日数据维护
export function saveVictoryData(params) {
    return request({
        url: saveVictoryDataUrl,
        method: 'post',
        data: params
    })
}
