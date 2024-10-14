export interface IAdsGateway {
    getCampaigns(date: Date): Promise<AdsType[]>;
}

export type AdsType = {
    id: string
    name: string,
    status: string
    objective: string,
    attribution_spec?: string,
    results: Record<string, any>
    reach: number,
    frequency: number,
    cost_per_result: number,
    daily_budget: number,
    spend: number,
    end_date: string | Date,
    impressions: number,
    cpm: number,
    inline_link_clicks: number,
    cost_per_inline_link_click: number,
    click_through_rate_link_click: number,
    clicks: number,
    ctr: number,
    cpc: number,
}