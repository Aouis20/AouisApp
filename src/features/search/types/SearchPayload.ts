export type SearchPayload = {
    title?: string,
    min_price?: number,
    max_price?: number,
    conditions?: string[],
    categories?: string[],
    localization?: string,
}