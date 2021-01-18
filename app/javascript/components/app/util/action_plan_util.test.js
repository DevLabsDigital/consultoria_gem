import {findListid} from "./action_plan_util";

test('need find correct list by card id', () => {
    const mockItems = {
        scheduled: {
            ids: ["1"],
            id: 1,
        }
    }

    const cardIdMock = "1"
    const result = findListid(cardIdMock, mockItems)
    expect(result).toBe(mockItems.scheduled.id)
})