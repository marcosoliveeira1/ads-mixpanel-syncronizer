import { AdAccount, FacebookAdsApi } from "facebook-nodejs-business-sdk";
import { IAdsGateway, AdsType } from "../../interfaces/i-ads-gateway";
import { DateUtils } from "../../utils/date-utils";
import Cursor from "facebook-nodejs-business-sdk/src/cursor";
import { NumberUtils } from "../../utils/number-utils";
import { AdsObjectives } from "./enum-ads-objectives";

export class FacebookAdsGateway implements IAdsGateway {
    private readonly accountId: string;
    private readonly api: FacebookAdsApi;
    private readonly account: AdAccount;

    constructor() {
        const token = process.env.FACEBOOK_TOKEN as string;
        const debug = process.env.FACEBOOK_DEBUG === 'true' ? true : false;

        this.api = FacebookAdsApi.init(token);


        if (debug) {
            this.api.setDebug(true);
        }

        this.accountId = 'act_' + process.env.FACEBOOK_AD_ACCOUNT_ID as string;

        this.account = new AdAccount(this.accountId);

    }

    async getCampaigns(date: Date): Promise<AdsType[]> {
        const startDate = DateUtils.dateToIso8601(date);
        const endDate = DateUtils.dateToIso8601(date);

        const fields = [
            "id",
            "name",
            "daily_budget",
            "status",
            "stop_time",
            `insights.time_range({'since':'${startDate}','until':'${endDate}'}){attribution_setting,reach,frequency,spend,impressions,cpm,inline_link_clicks,cpc,clicks,ctr,cost_per_inline_link_click,cost_per_unique_action_type,cost_per_action_type,actions,objective}`,
            `adsets.time_range({'since':'${startDate}','until':'${endDate}'}){attribution_spec}`,
        ];

        const params = {
            time_range: {
                since: startDate,
                until: endDate
            },
            limit: 50,
            use_unified_attribution_setting: true
        }

        const campaigns = await this.getAllResults(
            await this.account.getCampaigns(fields, params, false),
        );

        const ads = campaigns.map(this.toEventAds.bind(this));

        return ads
    }

    private toEventAds(campaign: any): AdsType {
        const insights = campaign.insights.data[0];

        const costPerUniqueActionType = this.transformToKeyValueObject(insights?.cost_per_unique_action_type ?? []);

        const actions = this.transformToKeyValueObject(insights?.actions ?? []);

        const costPerResult = NumberUtils.toTwoDecimalPlaces(costPerUniqueActionType?.lead);

        const clickThroughRateLinkClick = NumberUtils.toTwoDecimalPlaces(insights?.inline_link_clicks / insights?.impressions * 100);

        const endDate = DateUtils.isValidDate(campaign.stop_time) ? campaign.stop_time : "Campanhas contínuas";

        return {
            id: campaign.id,
            name: campaign.name,
            status: campaign.status === 'ACTIVE' ? 'Ativo' : 'Desativado',
            // attribution_spec: null,
            objective: AdsObjectives.getLabel(insights?.objective),
            results: actions,
            reach: NumberUtils.toTwoDecimalPlaces(insights?.reach),
            frequency: NumberUtils.toTwoDecimalPlaces(insights?.frequency),
            cost_per_result: costPerResult,
            daily_budget: NumberUtils.toTwoDecimalPlaces(campaign.daily_budget) / 100,
            spend: NumberUtils.toTwoDecimalPlaces(insights?.spend),
            end_date: endDate,
            impressions: NumberUtils.toTwoDecimalPlaces(insights?.impressions),
            cpm: NumberUtils.toTwoDecimalPlaces(insights?.cpm),
            inline_link_clicks: NumberUtils.toTwoDecimalPlaces(insights?.inline_link_clicks),
            cost_per_inline_link_click: NumberUtils.toTwoDecimalPlaces(insights?.cost_per_inline_link_click),
            click_through_rate_link_click: clickThroughRateLinkClick,
            clicks: NumberUtils.toTwoDecimalPlaces(insights?.clicks),
            ctr: NumberUtils.toTwoDecimalPlaces(insights?.ctr),
            cpc: NumberUtils.toTwoDecimalPlaces(insights?.cpc),
        }
    }

    private async getAllResults(obj: Cursor): Promise<Record<string, any>[]> {

        const allObjects = [...obj];

        while (obj?.hasNext()) {
            const nextObj = await obj.next();

            allObjects.push(...nextObj);
        }

        return allObjects;
    }

    transformToKeyValueObject(data: any[]): Record<string, string> {

        if (data === undefined || !data.length) {
            return {};
        }

        return data.reduce((acc, item) => {
            acc[item.action_type] = item.value;
            return acc;
        }, {} as Record<string, string>);
    }

}