export const findListid = (cardId, items) => {
    
    if(items.scheduled.ids.some(id => id == cardId)) return items.scheduled.id
    
    if(items.delayed.ids.some(id => id == cardId)) return items.delayed.id
    
    if(items.in_progress.ids.some(id => id == cardId)) return items.in_progress.id
    
    if(items.completed.ids.some(id => id == cardId)) return items.completed.id
}