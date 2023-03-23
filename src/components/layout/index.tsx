import { ReactNode } from "react";
// import dynamic from "next/dynamic";
import styles from "./Layout.module.scss";
// import Skeleton from "@mui/material/Skeleton";
import { Container } from "@mui/material";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth="sm">
      <main className={styles.container}>{children}</main>
    </Container>
  );
}
