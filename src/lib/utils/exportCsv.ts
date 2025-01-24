export const exportToCSV = (data: any[], filename: string) => {
  if (!data || !data.length) {
    console.error("No data to export");
    return;
  }

  const sanitizedData = data.map((item) => {
    const { __typename, ...rest } = item;
    return rest;
  });

  const headers = Object.keys(sanitizedData[0]);
  const csvRows = [];

  csvRows.push(headers.join(","));

  for (const row of sanitizedData) {
    const values = headers.map((header) => JSON.stringify(row[header] || ""));
    csvRows.push(values.join(","));
  }

  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();

  URL.revokeObjectURL(url);
};
