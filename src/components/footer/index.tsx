import Typography from "@mui/material/Typography";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Typography>
        Copyright © 2023 AnimalMela - All Rights Reserved.
      </Typography>
    </footer>
  );
}
