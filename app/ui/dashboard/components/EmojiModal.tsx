import React, { useState } from "react";
import { tabsLinks, emoticonesPersonnes } from "../test/emojis";

const EmojiModal = ({ emojiClick }: { emojiClick: (emoji: any) => void }) => {
  const [emoji, setEmoji] = useState(emoticonesPersonnes);
  const [isActive, setIsActive] = useState<number | null>(0);
  const handleSetEmoji = (emoji: any, index: number) => {
    setEmoji(emoji);
    setIsActive(index);
  };
  return (
    <div className="emoji-Modal">
      <div className="emoji-Modal_container">
        <div className="tabsLinks">
          {tabsLinks.map((link: any, index: number) => (
            <div
              className={`link ${isActive === index ? "active" : ""}`}
              onClick={() => {
                handleSetEmoji(link.tab, index);
              }}
              key={index}
            >
              {link.icon}
            </div>
          ))}
        </div>
        <div className="emoji-Modal_container_content">
          {emoji &&
            emoji.map((emoji: any, index: number) => (
              <div
                className="emoji"
                key={index}
                onClick={() => emojiClick(emoji.icon)}
              >
                {emoji.icon}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiModal;
