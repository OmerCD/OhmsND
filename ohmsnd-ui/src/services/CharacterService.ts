import {AxiosInstance} from "axios";
import {CharacterInfoModel} from "../models/CharacterInfoModel";

class CharacterService {
    private baseApi: AxiosInstance;
    constructor(baseApi : AxiosInstance) {
        this.baseApi = baseApi;
    }
    public async generateRandomCharacter() : Promise<CharacterInfoModel>{
        const response = await this.baseApi.post("CharacterTest/random")
        return response.data;
    }
}

export default CharacterService;
