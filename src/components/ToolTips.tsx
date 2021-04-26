import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Icon from "./Icon";

interface ToolTipsProps {
    placement?: any,
    label: string,
    message: string,
}

const ToolTips = ({ placement, label, message }: ToolTipsProps) => {
    const p = placement || 'auto';
    return <>
          <OverlayTrigger
            key={p}
            placement={p}
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip">
                {message}
              </Tooltip>
            }
            >
              <span><Icon name="info" className="icon icon-xs svg-outline-muted" />{label? label: null}</span>
            </OverlayTrigger>
          </>;
}

export default ToolTips;
