import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import Layout from "@/components/layout";
import { CssBaseline } from "@mui/material";
import ErrorBoundary from "@/components/error-boundary";
import { AppStateProvider } from "@/context";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import translationEN from "../../public/locales/en/translation.json";
import translationHI from "../../public/locales/hi/translation.json";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    hi: {
      translation: translationHI,
    },
  },
  lng: "hi",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18next}>
          <AppStateProvider>
            <ErrorBoundary>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ErrorBoundary>
          </AppStateProvider>
        </I18nextProvider>
      </ThemeProvider>
    </>
  );
}
