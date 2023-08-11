import React from "react";
import styles from "./title.module.scss";

type TitleProps = {
  children: React.ReactNode | string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  textPosition?: "left" | "center" | "right";
  titleStyle?: "default" | "underlined";
  customClass?: string;
} & React.ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

export default function Title({
  tag = "h2",
  textPosition = "left",
  titleStyle = "default",
  customClass = "",
  children,
  ...rest
}: TitleProps) {
  const TagName = tag;
  const classes = [
    styles.title,
    styles[titleStyle],
    styles[textPosition],
    customClass,
  ].join(" ");

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TagName className={classes} {...rest}>
      {children}
    </TagName>
  );
}

Title.defaultProps = {
  tag: "h2",
  textPosition: "left",
  titleStyle: "default",
  customClass: "",
};
