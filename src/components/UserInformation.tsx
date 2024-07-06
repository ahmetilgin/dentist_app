import { Grid } from "@mui/material";
import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useRootService,
  useRootStore,
} from "../providers/context_provider/ContextProvider";
import After from "../static/after.png";
import Before from "../static/before.jpg";
import ScanViewer from "./ScanViewer";

const UserInformation = observer(() => {
  const { bookmarkStore } = useRootStore();
  const { bookmarksService } = useRootService();

  const { t } = useTranslation();
  const images = [
    {
      src: After,
      alt: t("after"),
      downloadUrl: "",
    },
    {
      src: Before,
      alt: t("before"),
      downloadUrl: "",
    },
  ];

  const fetchBookmarks = useCallback(() => {
    bookmarksService.getBookmarks();
  }, [bookmarksService]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const [state, setState] = useState({ visible: false, activeImageIndex: 0 });
  return (
    <Grid container style={{ padding: 0 }}>
      {images.map((item, index) => {
        return (
          <div key={index.toString()} className="img-item">
            <img
              src={item.src}
              alt={item.alt}
              className={"responsive"}
              onClick={() => {
                setState({
                  visible: true,
                  activeImageIndex: index,
                });
              }}
            />
          </div>
        );
      })}
      <ScanViewer
        imageURLs={images}
        index={state.activeImageIndex}
        visible={state.visible}
        onClose={() =>
          setState({
            visible: false,
            activeImageIndex: 0,
          })
        }
      />

      {bookmarkStore.bookmarks.length > 0 &&
        bookmarkStore.bookmarks.map((data, idx) => {
          return (
            <div key={idx} style={{ paddingLeft: 20 }}>
              <div>
                {data.id} / {data.title} / {data.url}
              </div>
            </div>
          );
        })}
    </Grid>
  );
});

export default UserInformation;
