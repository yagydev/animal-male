import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { IAvatar } from "@/types";

const URL = "https://wa.me";

type CardFooterProps = {
  phone: string;
  name: string;
  avatar: IAvatar;
};

export default function CardFooter({ phone, name, avatar }: CardFooterProps) {
  const openWhatsApp = () => {
    if (window) {
      let url = `${URL}/91${phone}`;
      const w = window.open(url);
      setTimeout(() => {
        if (w) w.close();
      }, 500);
    }
  };
  return (
    <Box sx={{ borderTop: 1, borderColor: "lightgrey" }}>
      <CardActions sx={{ justifyContent: "end" }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Avatar alt={name} src={avatar && avatar.url}></Avatar>
          <Typography color="primary">{name}</Typography>
        </Box>
        <IconButton aria-label="call to seller" href={`tel:+91${phone}`}>
          <CallIcon color="primary" />
        </IconButton>
        <IconButton aria-label="WhatsApp to seller" onClick={openWhatsApp}>
          <WhatsAppIcon color="primary" />
        </IconButton>
      </CardActions>
    </Box>
  );
}
