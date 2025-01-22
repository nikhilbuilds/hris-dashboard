import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import Grid from "@mui/material/Grid2";
import { Stack } from "@mui/material";

export const metadata = {
  title: "HRIS Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Stack direction="row" spacing={2}>
          <div>
            <Sidebar />
          </div>

          <div>{children}</div>
        </Stack>
      </body>
    </html>
  );
}
