import { Toaster } from "sonner";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "Promptekey",
  description: "Discover and share AI promts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
};

export default RootLayout;
