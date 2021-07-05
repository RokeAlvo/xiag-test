import {Store} from "./index";
import {makeAutoObservable} from "mobx";
import {PollService, pollService} from "../services/poll.service";
import {Answer, Vote} from "../../../common/poll";


export class PollPageStore {
    private pollService: PollService
    private _pollId = ''

    constructor(private root: Store) {
        makeAutoObservable(this)
        this.root = root
        this.pollService = pollService
    }

    async fetchPageData(pollId: string) {
        const poll = await this.pollService.load(pollId)
        if (poll) {
            this.title = poll.question
            this.answers = poll.answers
            this.pollResult = poll.result
            this._pollId = poll.id
        }
    }

    protected _title = ''
    public get title(): string {
        return this._title
    }
    private set title(v) {
        this._title = v
    }

    private _name = ''
    public set name(v: string) {
        this._name = v
    }
    public get name() {
        return this._name
    }

    private _answers: Answer[] = []
    public get answers() {
        return this._answers
    }
    private set answers(answers) {
        this._answers = answers
    }

    private _activeAnswerId: string | null = null
    public set activeAnswerId(id: string) {
        this._activeAnswerId = id
    }

    public async submitForm() {
        if (!this.isValid) return
         const poll = await this.pollService.addVote(this._pollId, {
            answerId: this._activeAnswerId!,
            userName: this._name
        })
        this.posted = true
        if(poll)  {
            this.pollResult = poll.result
        }
    }

    private _pollResult: Vote[] = []
    public get pollResult() {
        return this._pollResult
    }
    private set pollResult(v) {
        this._pollResult = v
    }

    public get isValid() {
        return this._name.length > 0 && this._activeAnswerId !== null
    }

    private _posted = false
    public get posted() {
        return this._posted
    }
    private set posted(v) {
        this._posted = v
    }

    public get disabled() {
        return this.posted || !this.isValid
    }
}
