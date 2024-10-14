// Define um tipo para os objetivos
type AdsObjectiveType = {
    label: string;
    value: string;
};

// Define um objeto para mapear os objetivos aos rótulos e valores
const AdsObjectivesMap: { [key: string]: AdsObjectiveType } = {
    OUTCOME_LEADS: { label: "Resultado leads", value: "lead" },
    LINK_CLICKS: { label: "Cliques no link", value: "link_click" },
    OUTCOME_ENGAGEMENT: { label: "Resultado engajamento", value: "post_engagement" },
    OUTCOME_SALES: { label: "Resultado vendas", value: "sales" },
    OUTCOME_AWARENESS: { label: "Resultado conhecimento", value: "awareness" },
    CONVERSIONS: { label: "Conversões", value: "conversions" },
    VIDEO_VIEWS: { label: "Visualizações de vídeo", value: "video_views" },
    REACH: { label: "Alcance", value: "reach" },
    MESSAGES: { label: "Mensagens", value: "messages" },
    LEAD_GENERATION: { label: "Geração de leads", value: "lead_generation" },
    BRAND_AWARENESS: { label: "Conhecimento de marca", value: "brand_awareness" },
    POST_ENGAGEMENT: { label: "Engajamento de postagem", value: "post_engagement" },
};

export class AdsObjectives {
    static getLabel(objective: string): string {
        return AdsObjectivesMap[objective]?.label ?? objective;
    }
}