import moment from "moment";

export function formatDate(date: string): string {
  // Format: "DD MMM YYYY" -> "15 Mar 2024"
  return moment(date).format("DD MMM YYYY");
}
