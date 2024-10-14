import { AdsType } from "../../interfaces/i-ads-gateway"
import { DateUtils } from "../../utils/date-utils";
import { EventAds } from "../types/event-ads"

export class EventFactory {
    static create(event: string, properties: AdsType, date?: Date): EventAds {
        const currentDate = date ? date : new Date();
        const time = Math.floor(currentDate.getTime() / 1000)
        const formattedDate = DateUtils.dateToIso8601(currentDate);
        const eventId = `F-${formattedDate}-${properties.id}`;

        return {
            event,
            properties: {
                $insert_id: eventId,
                distinct_id: eventId,
                time: time,
                source: 'Facebook',
                campaign: properties.name,
                campaign_id: properties.id,
                campaign_status: properties.status,
                objective: properties.objective,
                results: properties.results,
                reach: properties.reach,
                frequency: properties.frequency,
                cost_per_result: properties.cost_per_result,
                budget_amount: properties.daily_budget,
                spend: properties.spend,
                end_date: properties.end_date,
                impressions: properties.impressions,
                cpm: properties.cpm,
                inline_link_clicks: properties.inline_link_clicks,
                cost_per_inline_link_click: properties.cost_per_inline_link_click,
                click_through_rate_link_click: properties.click_through_rate_link_click,
                clicks: properties.clicks,
                ctr: properties.ctr,
                cpc: properties.cpc,
            }
        }
    }

    static createFromList(event: string, properties: AdsType[], date?: Date): EventAds[] {
        return properties.map(p => this.create(event, p, date))
    }
}