export interface CreatePollDto {
    question: string,
    answersList: string[]
}

export interface Poll {
    id: string
    question: string
    answers: Answer[]
    result: Vote[]
}

export interface PollDto extends Poll {}

export interface Answer{
    id: string
    title: string
}

export interface PollResultDto {
    [index: number]: Vote
}

export interface AddVoteDto {
    userName: string,
    answerId: string
}

export interface Vote {
    id: string,
    userName: string,
    answer: Answer
}
