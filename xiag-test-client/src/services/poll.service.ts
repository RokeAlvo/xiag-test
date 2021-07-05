import {http, HttpService, routes} from "./http.service";
import {CreatePollDto, PollDto, AddVoteDto} from '../../../common/poll'
import {AxiosResponse} from "axios";

export class PollService {
    constructor(private http: HttpService) {
    }

    async load(id: string): Promise<PollDto | undefined>  {
        try {
            const {data} = await this.http.get(routes.poll + '/' + id)
            if(data) return data
        } catch (e) {
            console.error("poll's request error")
        }
    }

    async create(createPollDto: CreatePollDto): Promise<PollDto | undefined> {
        try {
            const {data} = await this.http.post(routes.poll, createPollDto) as AxiosResponse<PollDto>
            if (data) return data
        } catch (e) {
            console.error('error when creating a poll')
        }
    }

    async addVote(pollId: string, vote: AddVoteDto): Promise<PollDto | undefined> {
        try {
            const {data} = await this.http.patch(routes.poll + '/' + pollId, vote)
            return data
        } catch (e) {
            console.error("poll's patch error")
        }
    }
}

export const pollService = new PollService(http)
