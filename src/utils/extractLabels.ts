export function extractLabelsFromDescription(description: string): string[] {
    const regex = /#([\p{L}\d_-]+)/gu;
    const matches = description.match(regex)
    return matches?.map(tag => tag.slice(1)) ?? []
}