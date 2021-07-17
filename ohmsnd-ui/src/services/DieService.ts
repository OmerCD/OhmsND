import {AxiosInstance} from "axios";

export enum DieType
{
    D2 = 2,
    D4 = 4,
    D6 = 6,
    D8 = 8,
    D100 = 100,
    D10 = 10,
    D12 = 12,
    D20 = 20
}
interface IDieRoll {
    count:number;
    dieType:DieType;
}
interface IRollDiceConfig {
    dice:IDieRoll[]
}

class DieService {
    private baseApi: AxiosInstance;
    constructor(baseApi: AxiosInstance) {
        this.baseApi = baseApi;
    }

    public async rollDice(config: IRollDiceConfig) : Promise<RollDiceCommandResponse[]>{
        const response = await this.baseApi.post("Die/roll", config);
        return response.data;
    }
}
export interface RollDiceCommandResponse {
    dieResults: RollDiceCommandResponseResult[];
    value: number;
    rollStatus: RollStatus;
}

export enum RollStatus {
    Failed,
    Neutral,
    Success
}

export interface RollDiceCommandResponseResult {
    value: number;
    dieStatus: DieStatus;
}

export enum DieStatus {
    Failed,
    Neutral,
    Success
}
export default DieService;
