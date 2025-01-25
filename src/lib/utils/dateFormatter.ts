import moment from "moment";

export function formatDate(date: string): string {
  return moment(date).format("DD MMM YYYY");
}

export function formatToDateMonth(date: string): string {
  return moment(date).format("DD MMMM");
}
