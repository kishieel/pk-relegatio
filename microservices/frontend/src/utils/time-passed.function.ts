import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';

export const timePassed = (date: string) => {
  const now = new Date();
  const daysPassed = differenceInDays(now, date);
  const monthsPassed = differenceInMonths(now, date);
  const yearsPassed = differenceInYears(now, date);

  if (monthsPassed >= 12) {
    return `${yearsPassed} year${yearsPassed > 1 ? 's' : ''}`;
  } else if (monthsPassed >= 1) {
    return `${monthsPassed} month${monthsPassed > 1 ? 's' : ''}`;
  } else {
    return `${daysPassed} day${daysPassed > 1 ? 's' : ''}`;
  }
};
