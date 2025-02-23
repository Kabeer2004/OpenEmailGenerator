import JsxParser from "react-jsx-parser";
import { useRef, useEffect } from "react";

export default function EmailPreview({ code, setHtml }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setHtml(ref.current.innerHTML);
    }
  }, [code]);

  try {
    return (
      <div ref={ref}>
        <JsxParser
          jsx={code}
          components={
            {
              /* Add allowed components if needed */
            }
          }
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500">
        Error rendering preview: {error.message}
      </div>
    );
  }
}
