import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">पृष्ठ नहीं मिला</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          आप जिस पृष्ठ की तलाश कर रहे हैं वह उपलब्ध नहीं है।
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-divine">मुख्य पृष्ठ पर जाएँ</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">कुछ त्रुटि हुई</h1>
        <p className="mt-2 text-sm text-muted-foreground">कृपया पुनः प्रयास करें।</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-divine">
            पुनः प्रयास करें
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "धीरज पांडेय — शाहपुर घराना | भक्ति संगीत, पटना बिहार" },
      { name: "description", content: "धीरज पांडेय - शाहपुर घराना के प्रसिद्ध भजन गायक। भजन संध्या, सुंदरकांड, जागरण, अखंड रामायण, तिलक महोत्सव। पटना, बिहार के सभी जिलों में बुकिंग उपलब्ध।" },
      { property: "og:title", content: "धीरज पांडेय — शाहपुर घराना | भक्ति संगीत, पटना बिहार" },
      { property: "og:description", content: "धीरज पांडेय - शाहपुर घराना के प्रसिद्ध भजन गायक। भजन संध्या, सुंदरकांड, जागरण, अखंड रामायण, तिलक महोत्सव। पटना, बिहार के सभी जिलों में बुकिंग उपलब्ध।" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "धीरज पांडेय — शाहपुर घराना | भक्ति संगीत, पटना बिहार" },
      { name: "twitter:description", content: "धीरज पांडेय - शाहपुर घराना के प्रसिद्ध भजन गायक। भजन संध्या, सुंदरकांड, जागरण, अखंड रामायण, तिलक महोत्सव। पटना, बिहार के सभी जिलों में बुकिंग उपलब्ध।" },
      { property: "og:locale", content: "hi_IN" },
      { property: "og:site_name", content: "शाहपुर घराना" },

      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Yatra+One&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
