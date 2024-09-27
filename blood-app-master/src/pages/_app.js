import "@/styles/globals.css";
import Layout from '@/components/Layout';
import { AuthProvider } from "@/contexts/AuthContext";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from "@mui/x-date-pickers";

export default function App({ Component, pageProps }) {
  return (        <LocalizationProvider dateAdapter={AdapterDayjs}>


    <LoaderProvider>

    <AuthProvider>
  <Layout>

  <Component {...pageProps} />  </Layout>
    </AuthProvider>
    </LoaderProvider>
  </LocalizationProvider>
);
}
