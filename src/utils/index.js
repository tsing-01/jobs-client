/*
applicant: /applicantInfo
employer: /employerinfo
*/
// return router
export function getRedirectTo(type,header){  
    console.log(type,header)
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
