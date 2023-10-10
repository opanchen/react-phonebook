import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { AiOutlineClear } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";

export const EditIcon = ({ size = 12 }) => <BiEdit size={size} />;
export const DeleteIcon = ({ size = 12 }) => <MdDeleteForever size={size} />;
export const ClearIcon = ({ size = 12 }) => <AiOutlineClear size={size} />;
export const CloseIcon = ({ size = 12 }) => (
  <AiOutlineCloseCircle size={size} />
);
export const LogOutIcon = ({ size = 12 }) => <BiLogOut size={size} />;
export const LogInIcon = ({ size = 12 }) => <BiLogIn size={size} />;
export const MessageIcon = ({ size = 12 }) => (
  <BsFillEnvelopeAtFill size={size} />
);
export const CallIcon = ({ size = 12 }) => <BiSolidPhoneCall size={size} />;
