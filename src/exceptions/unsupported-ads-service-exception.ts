export class UnsupportedAdsServiceException extends Error {
    statusCode: number;
    constructor(adsService: string, supportedAdsServices: string[] = []) {
        super(`Unsupported ads service: ${adsService}. The supported ads services are: ${supportedAdsServices.join(', ')}.`);
        this.name = 'UnsupportedAdsServiceException';
        this.statusCode = 400; // or any other relevant status code
    }
}
