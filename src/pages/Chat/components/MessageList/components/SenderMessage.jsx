// @ts-check
import moment from "moment";
import React from "react";
import ClockIcon from "./ClockIcon";
import OnlineIndicator from "../../OnlineIndicator";
import AvatarImage from '@/components/AvatarImage';
import { RichMessage } from './ReceiverMessage'
const SenderMessage = ({
  user,
  message = "Lorem ipsum dolor...",
  date,
  onUserClicked,
}) => (
  <div className="flex">
    <div style={{ width: "50%" }} className="mb-4 text-left">
      <div
        className="px-3 py-2"
        style={{ borderRadius: 12, backgroundColor: "rgba(85, 110, 230, 0.1)" }}
      >
        <div className="ctext-wrap">
          {user && (
            <div className="flex items-center">
              <div
                className="mr-2 flex items-center space-x-2"
                style={{
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={onUserClicked}
              >
                <AvatarImage width={22} height={22} name={user.username} />
                <div>{user.username}</div>
              </div>
              <OnlineIndicator width={7} height={7} online={user.online} />
            </div>
          )}
          {
            message.includes('-splits-') ?
              <RichMessage message={message} />
              :
              <p className="text-left py-3 border-y-2 border-gray-100 w-full break-words">{message}</p>
          }
          <p className="flex items-center justify-end text-xs text-gray-600 mt-2">
            <ClockIcon />
            <span className="ml-1">{moment.unix(date).calendar()}</span>
          </p>
        </div>
      </div>
    </div>
    <div style={{ flex: 1 }} />
  </div>
);

export default SenderMessage;
