export const findListid = (cardId, items) => {
    //eslint-disable-next-line
    if(items.scheduled.ids.some(id => id == cardId)) return items.scheduled.id
    //eslint-disable-next-line
    if(items.delayed.ids.some(id => id == cardId)) return items.delayed.id
    //eslint-disable-next-line
    if(items.in_progress.ids.some(id => id == cardId)) return items.in_progress.id
}