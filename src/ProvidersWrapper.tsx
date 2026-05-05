import React, { type ReactNode, useLayoutEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactQueryProvider from "@app/providers/ReactQueryProvider";
import LoadingScreen from "@app/components/LoadingScreen";

// Mock localization function (replace with actual implementation later)
const GetCloudLocalizations = async () => {
  return Promise.resolve();
};

const ProvidersWrapper: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    GetCloudLocalizations().finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingScreen isLoading={true} />;
  else
    return (
      <ReactQueryProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ReactQueryProvider>
    );
};

export default ProvidersWrapper;

interface Props {
  children: ReactNode;
}
