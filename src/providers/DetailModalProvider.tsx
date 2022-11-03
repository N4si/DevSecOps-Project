import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import createSafeContext from "src/lib/createSafeContext";
import { MEDIA_TYPE } from "src/types/Common";

export interface DetailModalConsumerProps {
  detailType: {
    mediaType: MEDIA_TYPE;
    id: number | null;
  };
  setDetailType: ({
    mediaType,
    id,
  }: {
    mediaType: MEDIA_TYPE;
    id: number | null;
  }) => void;
}

export const [useDetailModal, Provider] =
  createSafeContext<DetailModalConsumerProps>();

export default function DetailModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [detailType, setDetailType] = useState<{
    mediaType: MEDIA_TYPE;
    id: number | null;
  }>({ mediaType: MEDIA_TYPE.Movie, id: null });
  const location = useLocation();

  useEffect(() => {
    setDetailType({ mediaType: MEDIA_TYPE.Movie, id: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return <Provider value={{ setDetailType, detailType }}>{children}</Provider>;
}
