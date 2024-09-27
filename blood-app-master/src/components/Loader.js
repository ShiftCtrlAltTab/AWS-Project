import { useLoader } from "@/contexts/LoaderContext";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Loader  () {
    const { loading } = useLoader();
  
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };
  