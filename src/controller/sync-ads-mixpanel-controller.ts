import { AdsGatewayFactory } from "../factories/ads-gateway-factory";
import { MixpanelGateway } from "../gateways/mixpanel/mixpanel-gateway";
import { SyncAdsMixpanelUseCase } from "../use-cases/sync-ads-mixpanel-use-case";

export class SyncAdsMixpanelController {
    async execute({ adsService, date }: { adsService: string, date?: string }): Promise<void> {        

        const adsGateway = AdsGatewayFactory.create(adsService);
        const mixpanelGateway = new MixpanelGateway();

        const syncAdsServiceUseCase = new SyncAdsMixpanelUseCase(adsGateway, mixpanelGateway);
        await syncAdsServiceUseCase.execute({ date });

    }
}
