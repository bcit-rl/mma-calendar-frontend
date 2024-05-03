import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ReactNode } from "react";

interface FightModalProps {
  children?: ReactNode;
  clickable: ReactNode;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 350, 
  maxWidth: 800,
  width: 0.7,
  height:"90vh",
  minHeight: 500,
  maxHeight: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const FightModal = ({ clickable, children }: FightModalProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box onClick={handleOpen}>{clickable}</Box>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>{children}</Box>
          </Modal>

    </>
  );
};

export default FightModal;
