import Mixpanel, { Mixpanel as MixpanelType } from "mixpanel";
import { EventAds } from "../../domain/types/event-ads";

export class MixpanelGateway {
    private readonly api?: MixpanelType
    constructor() {
        const token = process.env.MIXPANEL_TOKEN as string;
        const secret = process.env.MIXPANEL_SECRET as string;
        // @ts-ignore
        this.api = Mixpanel.init(token, { secret });
    }

    async save(data: EventAds[]) {
        this.api?.import_batch(data);
    }
}