import React, { useEffect, useRef, useState } from "react";

const Tabs = ({ children }) => {
  const [active, setActive] = useState(0);
  const [defaultFocus, setDefaultFocus] = useState(false);
  const tabRefs = useRef([]);

  useEffect(() => {
    if (defaultFocus) {
      tabRefs.current[active]?.focus();
    } else {
      setDefaultFocus(true);
    }
  }, [active]);

  const rawHTML = children?.props?.value || "";
  
  // Split the HTML safely at the start of each tab div, avoiding brittle regex on closing tags
  const panes = rawHTML.split(/(?=<div\s+data-name="[^"]+"[^>]*>)/);
  const validPanes = panes.filter(pane => pane.trim().startsWith('<div'));

  const tabData = validPanes.map(pane => {
    const match = pane.match(/data-name="([^"]+)"/);
    return {
      name: match ? match[1] : "Tab",
      html: pane
    };
  });

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      setActive(index);
    } else if (event.key === "ArrowRight") {
      setActive((active + 1) % tabData.length);
    } else if (event.key === "ArrowLeft") {
      setActive((active - 1 + tabData.length) % tabData.length);
    }
  };

  return (
    <div className="tab">
      <ul className="tab-nav">
        {tabData.map((item, index) => (
          <li
            key={index}
            className={`tab-nav-item ${index === active ? "active" : ""}`}
            role="tab"
            tabIndex={index === active ? 0 : -1}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onClick={() => setActive(index)}
            ref={(ref) => (tabRefs.current[index] = ref)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      {tabData.map((item, i) => (
        <div
          key={i}
          className={active === i ? "tab-content block px-5" : "hidden"}
          dangerouslySetInnerHTML={{ __html: item.html }}
        />
      ))}
    </div>
  );
};

export default Tabs;
