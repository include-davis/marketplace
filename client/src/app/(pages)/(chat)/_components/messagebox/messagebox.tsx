"use client"
import styles from "./messagesbox.module.scss";

interface MessageBoxProps {
    otherUserId: string,
    conversationId: string,
}

const MessageBox = ({otherUserId, conversationId}: MessageBoxProps) => {

    //get user with 'otherUserId'
    //get last send message with 'conversationId'

    
    const userName = 'placeholder'
    
    return (
    <div className={styles["message-box"]} data-id={conversationId}>
      <img
        src={ "https://i.pravatar.cc/100"} //placeholder
        alt="avatar"
        className={styles.avatar}
      />

      <div className={styles.content}>
        <div className={styles["top-row"]}>
          <span className={styles.username}>{userName}</span>
          <span className={styles.time}>{}</span>
        </div>

        <div className={styles.message}>{"placeholder (last sent message)"}</div>
      </div>
    </div>
  );
}


export default MessageBox