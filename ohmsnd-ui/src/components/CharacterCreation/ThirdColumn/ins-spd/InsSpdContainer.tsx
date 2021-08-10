import React from "react";

interface InsSpdContainerPropType {
  Value: string;
  Title: string;
}
export default function InsSpdContainer(props: InsSpdContainerPropType) {
  return (
    <div className="ins-spd-border">
      <div className="value">{props.Value}</div>
      <div className="title">{props.Title}</div>
    </div>
  );
}
