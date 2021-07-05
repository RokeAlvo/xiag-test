import {SettingsFormStore} from "./settingsForm.store";
import {PollPageStore} from "./pollPage.store";

export class Store {
    public settingsFormStore: SettingsFormStore
    public pollPageStore: PollPageStore
    constructor() {
        this.settingsFormStore = new SettingsFormStore(this)
        this.pollPageStore = new PollPageStore(this)
    }
}
