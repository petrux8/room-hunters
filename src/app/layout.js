import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import PageWrapper from "@/components/PageWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
