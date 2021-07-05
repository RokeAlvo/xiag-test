import {Store} from "./index";
import {makeAutoObservable} from "mobx";
import {PollService, pollService} from "../services/poll.service";
import {PollDto} from '../../../common/poll'


export class SettingsFormStore {
    private pollService: PollService
    constructor(private root: Store) {
        makeAutoObservable(this)
        this.root = root
        this.pollService = pollService
    }

    protected _answerList = ['', '']
    public get answerList(): string[] {
        return this._answerList
    }
    public set answerList(list: string[]) {
        this._answerList = list
    }

    private _question = ''
    public set question(v: string) {
        this._question = v
    }
    public get question() {
        return this._question
    }

    public async createPoll(): Promise<PollDto | undefined> {
        // this.isLoading = true
        return await pollService.create({
            question: this._question,
            answersList: this._answerList.filter(a => !!a)
        })
    }

    private _isLoading = false
    public get isLoading() {
        return this._isLoading
    }
    private set isLoading(v) {
        this._isLoading = v
    }

    public get isValid() {
        return this._answerList.filter(a => !!a).length>1 && this._question.length > 2
    }

    public get disabled() {
        return !this.isValid || this.isLoading
    }
}
