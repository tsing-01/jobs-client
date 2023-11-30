//包含n个工具函数的模块



/*
用户主界面路由
applicant: /applicant
employer: /employer
用户信息完善界面路由
applicant: /applicantInfo
employer: /employerinfo
*/
// return router
export function getRedirectTo(type,header){  
    let path
    if(type==="employer"){
        path='/employer'
    }
    else{
        path='/applicant'
    }

    if(!header){
        path=path+'info'
    }

    return path
}
