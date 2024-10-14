import { UnsupportedAdsServiceException } from "../exceptions/unsupported-ads-service-exception";
import { FacebookAdsGateway } from "../gateways/facebook/facebook-ads-gateway";
import { IAdsGateway } from "../interfaces/i-ads-gateway";

export class AdsGatewayFactory {
    static create(adsService: string): IAdsGateway {
        const gateways: { [key: string]: new () => IAdsGateway } = {
            "facebook-ads": FacebookAdsGateway
        };

        const Gateway = gateways[adsService];

        if (!Gateway) {
            throw new UnsupportedAdsServiceException(adsService, Object.keys(gateways));
        }

        return new Gateway();
    }
}
