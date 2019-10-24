import {alltableList,tableData,editMockData,delMockData} from '../../api/app'


export default {
    namespaced: 'baseSetting',
    state: {
        editModal:false,//修改框状态
        addModal:false,//添加框状态
        columnsData:[
            {
                type:"QP_TEST_MOCKDATA",
                columns:[
                    {
                        type:"selection",
                        width:60,
                        align:"center",
                    },
                ],
                data:[
                    // {
                    //     name:"李一",
                    //     age:"15",
                    //     sex:"男",
                    // },
                    // {
                    //     name:"李二",
                    //     age:"16",
                    //     sex:"男"
                    // },
                    // {
                    //     name:"李三",
                    //     age:"17",
                    //     sex:"男"
                    // },
                    // {
                    //     name:"李四",
                    //     age:"18",
                    //     sex:"男"
                    // },
                ]
            },
            {
                type:"T_SCREEN_ALARM_DECISION_INFO",
                columns:[
                    {
                        type:"selection",
                        width:60,
                        align:"center",
                    }
                ],
                data:[
                    // {
                    //     name:"李一",
                    //     address:"中国上海",
                    //     sex:"男",
                    //     like:"玩"
                    // },
                    // {
                    //     name:"李二",
                    //     address:"中国上海",
                    //     sex:"男",
                    //     like:"玩"
                    // },
                    // {
                    //     name:"李三",
                    //     address:"中国上海",
                    //     sex:"男",
                    //     like:"玩"
                    // },
                    // {
                    //     name:"李四",
                    //     address:"中国上海",
                    //     sex:"男",
                    //     like:"玩"
                    // },
                ]
            }
        ],//对应表字段
        selectType:"QP_TEST_MOCKDATA",//默认selet框数据
        currentColumns:[{
            columns:[],
            data:[]
        }],
        optionsList:[
            {
                name:"QP_TEST_MOCKDATA",
                lable:"QP_TEST_MOCKDATA"
            },
            {
                name:"T_SCREEN_ALARM_DECISION_INFO",
                lable:"T_SCREEN_ALARM_DECISION_INFO"
            }
        ],//下拉框数据 不用二次设置
        defaultOption:'QP_TEST_MOCKDATA',
        formItemList:[
            {
                type:"QP_TEST_MOCKDATA",
                formItem:[
                    // {
                    //     label:"姓名",
                    //     model:"",
                    //     key:"name",
                    // },
                    // {
                    //     label:"年龄",
                    //     model:"",
                    //     key:"age",
                    // },
                    // {
                    //     label:"性别",
                    //     model:"",
                    //     key:"sex"
                    // }
                ],
            },
            {
                type:"T_SCREEN_ALARM_DECISION_INFO",
                formItem:[
                    // {
                    //     label:"姓名",
                    //     model:"",
                    //     key:"name"
                    // },
                    // {
                    //     label:"籍贯",
                    //     model:"",
                    //     key:"address"
                    // },
                    // {
                    //     label:"性别",
                    //     model:"",
                    //     key:"sex"
                    // },
                    // {
                    //     label:"爱好",
                    //     model:"",
                    //     key:"like"
                    // }
                ],
            },
        ],//增加修改表单数据
        currentAddFormItem:[{
            formItem:[
                // {
                //     label:"姓名",
                //     model:"",
                //     key:"name",
                // },
                // {
                //     label:"年龄",
                //     model:"",
                //     key:"age",
                // },
                // {
                //     label:"性别",
                //     model:"",
                //     key:"sex"
                // }
            ],
        }],
        currentEditFormItem:[{
            formItem:[
                // {
                //     label:"姓名",
                //     model:"",
                //     key:"name",
                // },
                // {
                //     label:"年龄",
                //     model:"",
                //     key:"age",
                // },
                // {
                //     label:"性别",
                //     model:"",
                //     key:"sex"
                // }
            ],
        }],//点击修改时候,当前点击项的modal数据
        copyformItemList:[
            {
                type:"QP_TEST_MOCKDATA",
                formItem:[
                    // {
                    //     label:"姓名",
                    //     model:"",
                    //     key:"name",
                    // },
                    // {
                    //     label:"年龄",
                    //     model:"",
                    //     key:"age",
                    // },
                    // {
                    //     label:"性别",
                    //     model:"",
                    //     key:"sex"
                    // }
                ],
            },
            {
                type:"T_SCREEN_ALARM_DECISION_INFO",
                formItem:[
                    // {
                    //     label:"姓名",
                    //     model:"",
                    //     key:"name"
                    // },
                    // {
                    //     label:"籍贯",
                    //     model:"",
                    //     key:"address"
                    // },
                    // {
                    //     label:"性别",
                    //     model:"",
                    //     key:"sex"
                    // },
                    // {
                    //     label:"爱好",
                    //     model:"",
                    //     key:"like"
                    // }
                ],
            },
        ],//增加时候form modal显示项目
        loading:true,
    },
    getters: {},
    actions: {
        updateState(context, params) {
            context.commit("updateState", params)
        },
    },
    mutations: {
        updateState(state, data) {
            getStateUpdate(state,data);
        },
        updateTableColums(state, params){
            let flag=true;
            state.columnsData.map(item=>{
                if(item.type==state.selectType){
                    item.columns=item.columns.filter(val=>{
                        console.log(val.key)
                        return val.key!="emptyActions"
                    })
                    for (let i in item.columns){
                        if(item.columns[i].key=="actions"){
                            return
                        }
                    }
                    item.columns.push(params)
                    state.currentColumns=[item]
                }
            })
            // state.loading=false
        },
        updateStateEditFormItemMsg(state,params){
            let editItemMsg=state.copyformItemList.filter(item=>{
                return item.type==state.selectType
            })
            for(let i in params.row){
                editItemMsg[0].formItem.map((item,key)=>{
                    if(i==item.key){
                        item.model= params.row[i]
                    }
                })
            }
            state.currentEditFormItem=editItemMsg;
            state.editModal=true;
        },
        updateStateEditedItem(state,params){
            state.currentEditFormItem[0].formItem.map(item=>{
                if(item.key==params.key){
                    item.model=params.val
                }
            })
        },
        updateStateAddItem(state,params){
            state.currentAddFormItem[0].formItem.map(item=>{
                if(item.key==params.key){
                    item.model=params.val
                }
            })
        },
        optionListonChange(state,params){
            let option=[];
            alltableList().then(e=>{
                e.map((item,key)=>{
                    let obj={
                        name:item,
                        lable:item,
                    }
                    option.push(obj)
                })

            })
        },
        updateStateTableData(state,params){
            let obj={
                title:"Actions",
                key:"emptyActions",
                align:"center",
                width:200,
                render:(h,parms) => {
                    return h('div',[
                        h('Button',{props:{type:"primary",size:"small"},on:{click:e=>{

                        }},style:{margin:"0 20px"}},'修改'),
                        h('Poptip',{props:{
                            title:"确定删除这条数据吗？",confirm:true,content:"确定删除这条数据吗",placement:"left",transfer:true,
                        },on:{
                            'on-ok':()=>{
                            }
                        }},[h('Button',{props:{type:"warning",size:"small"},style:{margin:"0 20px"}},'删除')])
                    ])
                }
            }
            let arr1=[{
                type:"selection",
                width:60,
                align:"center",
            },];

            let arr2=[];
            let arr3=[];
            let arr=state.columnsData.map(item=>{
                if(item.type==params.type){
                    item.data=params.val;
                    if(params.action){return}
                    for (var i in params.val[0]) {
                        arr1.push({
                            title:i,
                            key:i
                        })
                    }
                    arr1.push(obj)
                    if(item.columns.length){
                        if(item.columns.length>arr1.length-1){

                        }else{
                            item.columns=arr1;
                        }
                    }else {
                        item.columns=arr1;
                    }

                }
            })
            state.formItemList.map(item=>{
                if(params.action){return}
                if(item.type==params.type) {
                    for (var i in params.val[0]) {
                        arr2.push({
                            label:i,
                            key:i,
                            model:""
                        })
                    }
                    item.formItem=arr2
                }
              })
            state.copyformItemList.map(item=>{
                if(params.action){return}
                if(item.type==params.type) {
                    for (var i in params.val[0]) {
                        arr3.push({
                            label:i,
                            key:i,
                            model:""
                        })
                    }
                    item.formItem=arr3
                }
            })
            state.loading=false
        },
        clearStateForAdd(state,params){
                state.copyformItemList.map(item=>{
                    item.formItem.map(val=>{
                        val.model=''
                    })
                })
            state.loading=false;
        },
        setAllState(state,parms){
            let arrcolumsData=[];
            let arrformItemList=[];
            parms.map(item=>{
                arrcolumsData.push({
                    type:item,
                    columns:[
                        {
                            type:"selection",
                            width:60,
                            align:"center",
                        },
                    ],
                    data:[]
                })
                arrformItemList.push({
                    type:item,
                    formItem:[]
                })
            })
            state.copyformItemList=arrformItemList
            state.formItemList=arrformItemList
            state.columnsData=arrcolumsData
        },
    }
}


function getStateUpdate(state, payload) {
    Object.keys(payload).map((item, key) => {
        state[item] = payload[item]
        if (payload[item] === 'object') {
            getStateUpdate(state[item], payload[item])
        }
    })
}

