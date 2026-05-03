import dayjs, { Dayjs } from "dayjs";

export const formatDate = (
  date: Date | string | undefined | Dayjs | number,
  typeFormat: string = "YYYY-MM-DD",
) => {
  if (!date) return "";
  return dayjs(date).format(typeFormat);
};
