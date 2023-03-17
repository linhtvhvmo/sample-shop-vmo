import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"
dayjs.extend(isBetween);

export const getUnixTimestamp = async () => {
  const currentDate = dayjs(dayjs()).unix();
  return currentDate;
};

export const parseFieldsToObj = async (arr) => {
  return (object = arr.reduce(
    (obj, item) => Object.assign(obj, { [item.key]: item.value }),
    {}
  ));
};

export const checkDateBetween = async (from, to, current) => {
  return dayjs(current).isBetween(from, to,'[]');
}
