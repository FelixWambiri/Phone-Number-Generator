import React from "react";
import { Icon } from "react-icons-kit";
import Tooltip from "@material-ui/core/Tooltip";

export default function Button({
  title,
  placement,
  iconClassName,
  size,
  icon,
  onClick
}) {
  return (
    <Tooltip title={title} placement={placement}>
      <div className={iconClassName} onClick={onClick}>
        <Icon size={size} icon={icon} />
      </div>
    </Tooltip>
  );
}
