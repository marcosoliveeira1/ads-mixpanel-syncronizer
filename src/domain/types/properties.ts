
export type Properties = {
    $insert_id: string
    distinct_id: string
    time: number
    source: 'Facebook'
    campaign: string,
    campaign_id: string
    campaign_status: string
    objective: string,
    attribution_spec?: string,
    results: Record<string, any>
    reach: number,
    frequency: number,
    cost_per_result: number,
    budget_amount: number,
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
