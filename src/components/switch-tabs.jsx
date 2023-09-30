import React, { useState } from "react";

function SwitchTabs({ tabData = [], tabChangeMethod, classes }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    tabChangeMethod(tab, index);
  };

  return (
    <div
      className={
        "switchingTabs h-[34px] p-0.5 rounded-full bg-white " + classes
      }
    >
      <div className="tabItems h-[30px] flex items-center relative">
        {tabData.map((tab, index) => (
          <span
            key={index}
            className={` ${
              selectedTab === index ? "text-white" : " text-black1 "
            } w-100px h-full flex items-center justify-center  relative z-10 text-sm cursor-pointer transition-color ease-in-out duration-300 `}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span
          className="movingBg w-100px h-[30px] rounded-[15px] absolute transition-[left] ease-[ cubic-bezier(0.88, -0.35, 0.565, 1.35)] duration-400   bg-gradient-to-r from-[#f89e00] from-0.99% to-[#da2f68] to-99%"
          style={{ left }}
        ></span>
      </div>
    </div>
  );
}

export default SwitchTabs;
