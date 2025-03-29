import React from "react";
import { ToastContainer } from "react-toastify";
import { useColorScheme } from "@mui/joy";

export default function Toast() {
    const { mode } = useColorScheme();

    return (
        <ToastContainer
            position="top-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={mode}
        />
    );
}
