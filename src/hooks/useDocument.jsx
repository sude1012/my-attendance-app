import { useEffect } from "react";
function useDocument(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}

export default useDocument;
