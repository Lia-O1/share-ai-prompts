import { Toaster } from "sonner";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "Promptekey",
  description:
    "Promptekey is a platform that allows you to discover, create and share AI prompts",
  image: "/assets/images/emeraldhandmade-website.png",
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
