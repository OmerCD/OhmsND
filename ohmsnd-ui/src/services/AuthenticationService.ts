import {AxiosInstance} from "axios";
import qs from 'qs';

interface IUserInfo{
    fullName?:string;
    token:string;
    expiryDate?:Date;
}
interface ISetToken{
    (token: string): void
}
class AuthenticationService{
    private readonly _setAxiosToken: ISetToken;
    private _baseApiAxios: AxiosInstance;
    private readonly _identityApiAxios: AxiosInstance;
    constructor(setAxiosToken:ISetToken, baseApiAxios: AxiosInstance, identityApiAxios: AxiosInstance) {
        this._setAxiosToken = setAxiosToken;
        this._baseApiAxios = baseApiAxios;
        this._identityApiAxios = identityApiAxios;
    }
    setToken(token:string){
        const userInfo: IUserInfo = {
            token: token
        }
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this._setAxiosToken(token);
    }
    setBaseApi(baseApi: AxiosInstance){
        this._baseApiAxios = baseApi;
    }
    async login(username:string, password:string): Promise<boolean>{
        const requestData = {
            client_id: "ohmsndui.client",
            client_secret: "10d570c5-64a6-4656-94da-cf6506e51106",
            grant_type: 'password',
            username: username,
            password: password,
            scope: 'ohmsndscope'
        };
        const response = await this._identityApiAxios.post('/connect/token', qs.stringify(requestData));
        this.setToken(response.data.access_token);
        return response.status === 200;
    }
    isAuthenticated() : boolean{
        return localStorage.getItem("userInfo") != null;
    }
    getUserInfo() : IUserInfo{
        return JSON.parse(localStorage.getItem("userInfo") as string);
    }
    logout(){

    }
}

export default AuthenticationService;
