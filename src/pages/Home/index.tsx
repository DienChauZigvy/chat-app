import { useQueryClient } from "@tanstack/react-query";
import Websocket from "../../components/Websocket";
import styles from "./Home.module.scss";

export default function Home() {
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(["profile"]);
  // console.log(profile);
  return (
    <div className={styles.home}>
      <Websocket />
    </div>
  );
}
