import "bootstrap/dist/css/bootstrap.min.css";

import BootstrapClient from "@/components/wrappers/BootstrapClient";
// import ClientProviders from "@/components/wrappers/ClientProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        {/* Bootstrap Icons, loaded from a CDN so we don't need an extra npm package */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>
        {children}

        {/* Loads Bootstrap's JavaScript (needed for things like dropdowns) */}
        <BootstrapClient />
      </body>
    </html>
  );
}
