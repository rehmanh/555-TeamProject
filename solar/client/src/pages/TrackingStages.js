import React from "react";
import styles from "./styles.module.css";

export const TrackingStages = (props) => {
  return (
    <div className={styles.container}>
      <h1>Solar Installation Progress</h1>
      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: "75%" }}></div>
      </div>
      <div className={styles.status}>
        <div className={styles.statusLabel}>Status:</div>
        <div className={styles.statusMessage}>{props.Tstatus}</div>
      </div>
      <div className={styles.details}>
        <div className={styles.detailsLabel}>Tracking Number:</div>
        <div className={styles.detailsValue}>1234567890</div>

        <div className={styles.detailsLabel}>Shipped From:</div>
        <div className={styles.detailsValue}>Seattle, WA</div>
        <div className={styles.detailsLabel}>Delivered To:</div>
        <div className={styles.detailsValue}>John Smith</div>
        
        <div className={styles.detailsLabel}>Estimated Installation:</div>
        <div className={styles.detailsValue}>March 21, 2023</div>
        
      </div>
    </div>
  );
};
