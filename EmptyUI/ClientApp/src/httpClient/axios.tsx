import axios, { HttpStatusCode } from "axios";


export const httpClient = axios.create({
    headers: {
        "Content-type": "application/json"
    },
    baseURL: `${process.env.PUBLIC_URL}/api`
})

//httpClient.interceptors.response.use(undefined, function (error) {
//    if (error?.response?.status === HttpStatusCode.Unauthorized) {
//        window.location.href = `${window.location.origin.replace(process.env.PUBLIC_URL, '')}/Account/Login?returnUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`;
//    }

//    if(error.code !== "ERR_CANCELED"){
//        let message;

//        switch(error?.response?.status){
//            case HttpStatusCode.UnprocessableEntity:
//                message = RS.common.unprocessableEntity;
//                break;
//            default:
//                message = error?.response?.data;
//        }

//        if(!message)
//            message = RS.common.error;

//        let operationId = error?.response?.headers?.operationid;
//        toast.error(<ErrorMsg operationId={operationId} message={message} />);
//    }

//    return Promise.reject(error);
//});
