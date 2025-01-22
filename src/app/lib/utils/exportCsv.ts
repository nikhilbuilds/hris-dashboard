export const exportToCSV = (data: any[], filename: string) => {
  if (!data || !data.length) {
    console.error("No data to export");
    return;
  }

  // Get headers from the object keys
  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add headers row
  csvRows.push(headers.join(","));

  // Add data rows
  for (const row of data) {
    const values = headers.map((header) => JSON.stringify(row[header] || ""));
    csvRows.push(values.join(","));
  }

  // Create a blob for the CSV content
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  // Create a link to trigger the download
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();

  // Cleanup the URL
  URL.revokeObjectURL(url);
};
