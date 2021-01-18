const addSecondZero = value => {
    const strValue = value.toString();
    if (strValue.length === 1) return `0${strValue}`;
    return strValue;
};

export const formatDateTime = orignalDate => {
    const date = new Date(orignalDate);
    return `${addSecondZero(date.getDate())}/${addSecondZero(date.getMonth() + 1)}/${date.getFullYear()} ${addSecondZero(date.getHours())}:${addSecondZero(date.getMinutes())}`;
};