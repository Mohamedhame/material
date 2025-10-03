import "./dialog.css";
import { forwardRef } from "react";

const Dialog = forwardRef(({ className, children, style }, ref) => {
  return (
    <div ref={ref} style={style} className={`dialog ${className}`}>
      {children}
    </div>
  );
});

export default Dialog;
