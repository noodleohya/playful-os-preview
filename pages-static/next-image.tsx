import type { ImgHTMLAttributes } from "react";
import { publicAsset } from "../app/publicAsset";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  sizes?: string;
};

export default function Image({
  src,
  alt,
  fill,
  className,
  style,
  width,
  height,
  sizes,
  priority,
  unoptimized,
  ...rest
}: Props) {
  const resolved = src.startsWith("/") ? publicAsset(src) : src;
  const fillStyle = fill
    ? {
        position: "absolute" as const,
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover" as const,
      }
    : undefined;

  return (
    <img
      src={resolved}
      alt={alt}
      className={className}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      style={{ ...fillStyle, ...style }}
      {...rest}
    />
  );
}
