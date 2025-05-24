import { IListingItem } from "@/entities/Listings/model/types";
import { Flex, Watermark } from "antd";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { imagesToGallery } from "../lib/imagesToGallery";

interface Props {
  adItem: IListingItem;
}

function Gallery({ adItem }: Props) {
  return (
    <>
      {adItem.images.length ? (
        <div style={{ width: 920 }}>
          <ImageGallery
            useBrowserFullscreen={false}
            showPlayButton={false}
            thumbnailPosition="left"
            items={imagesToGallery(adItem?.images)}
            renderItem={(item) => (
              <img
                src={item.original}
                alt="Фото объявления"
                style={{
                  height: "550px",
                  objectFit: "cover",
                }}
              />
            )}
          />
        </div>
      ) : (
        <Flex gap={10}>
          <div style={{ width: 100, height: 62 }}>
            <Watermark gap={[10, 10]} zIndex={0} content="No image">
              <div
                style={{
                  width: 100,
                  height: 62,
                  border: "dashed 1px lightgray",
                }}
              />
            </Watermark>
          </div>
          <Watermark
            gap={[30, 50]}
            zIndex={0}
            font={{ fontSize: 20 }}
            content="No image"
          >
            <div
              style={{
                width: 810,
                height: 550,
                border: "dashed 1px lightgray",
              }}
            />
          </Watermark>
        </Flex>
      )}
    </>
  );
}

export default React.memo(Gallery);
