export function getDeadlineCountdown(deadline: number | null): string {
    if (!deadline) return ''

    const today = new Date()
    const target = new Date(deadline)
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (diff > 0) return `Через ${diff} дней.`
    if (diff === 0) return 'Срок сегодня'
    return `Просрочено на ${Math.abs(diff)} дней.`
}