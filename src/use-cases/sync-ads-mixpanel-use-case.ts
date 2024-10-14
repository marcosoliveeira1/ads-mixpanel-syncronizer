import { EventFactory } from "../domain/factories/event-factory";
import { MixpanelGateway } from "../gateways/mixpanel/mixpanel-gateway";
import { IAdsGateway } from "../interfaces/i-ads-gateway";


export class SyncAdsMixpanelUseCase {


    constructor(private readonly adsGateway: IAdsGateway, private readonly mixpanelGateway: MixpanelGateway) {

    }


    async execute({ date }: Input): Promise<any> {
        const validDate = this.getDate(date);

        const campaigns = await this.adsGateway.getCampaigns(validDate);

        const events = EventFactory.createFromList('Ads Data teste', campaigns, validDate);

        await this.mixpanelGateway.save(events);

        return campaigns;
    }

    getDate(date?: string): Date {
        if (date) {
            return new Date(date);
        }
        let defaultDate = new Date();

        defaultDate.setDate(defaultDate.getDate() - 1);
        return defaultDate;
    }
}

type Input = {
    date?: string
}