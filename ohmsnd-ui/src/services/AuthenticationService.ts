import {AxiosInstance} from "axios";
import qs from 'qs';

interface IUserInfo{
    fullName?:string;
    token:string;
    expiryDate?:Date;
}
interface ILoginResponse{
    isSuccessful:boolean;
    username:string;
    token:string;
}
class AuthenticationService{
    private _baseApiAxios: AxiosInstance;
    private readonly _identityApiAxios?: AxiosInstance;
    constructor(baseApiAxios: AxiosInstance, identityApiAxios?: AxiosInstance) {
        this._baseApiAxios = baseApiAxios;
        this._identityApiAxios = identityApiAxios;
    }
    setToken(token:string){
        const userInfo: IUserInfo = {
            token: token
        }
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    setBaseApi(baseApi: AxiosInstance){
        this._baseApiAxios = baseApi;
    }
    async login(username:string, password:string): Promise<ILoginResponse>{
        const requestData = {
            client_id: "ohmsndui.client",
            client_secret: "10d570c5-64a6-4656-94da-cf6506e51106",
            grant_type: 'password',
            username: username,
            password: password,
            scope: 'ohmsndscope'
        };
        if (!this._identityApiAxios){
            return {isSuccessful:false, username:'', token:''};
        }
        // @ts-ignore
        const response = await this._identityApiAxios.post('/connect/token', qs.stringify(requestData));
        this.setToken(response.data.access_token);
        return {
            isSuccessful:response.status === 200,
            username:username,
            token:response.data.access_token
        };
    }
    isAuthenticated() : boolean{
        return localStorage.getItem("userInfo") != null;
    }
    getUserInfo() : IUserInfo{
        return JSON.parse(localStorage.getItem("userInfo") as string);
    }
    logout(){
        console.log("Logout")
        localStorage.removeItem("userInfo");
    }
}

export default AuthenticationService;
