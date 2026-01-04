import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { RoomsProvider } from "@/contexts/RoomsContext";

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <RoomsProvider>
          <AuthProvider>{children}</AuthProvider>
        </RoomsProvider>
      </body>
    </html>
  );
}
