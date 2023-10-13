import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { AiOutlineClear } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const EditIcon = ({ size = 12, color = undefined }) => (
  <BiEdit size={size} color={color} />
);
export const DeleteIcon = ({ size = 12, color = undefined }) => (
  <MdDeleteForever size={size} color={color} />
);
export const ClearIcon = ({ size = 12, color = undefined }) => (
  <AiOutlineClear size={size} color={color} />
);
export const CloseIcon = ({ size = 12, color = undefined }) => (
  <AiOutlineCloseCircle size={size} color={color} />
);
export const LogOutIcon = ({ size = 12, color = undefined }) => (
  <BiLogOut size={size} color={color} />
);
export const LogInIcon = ({ size = 12, color = undefined }) => (
  <BiLogIn size={size} color={color} />
);
export const MessageIcon = ({ size = 12, color = undefined }) => (
  <BsFillEnvelopeAtFill size={size} color={color} />
);
export const CallIcon = ({ size = 12, color = undefined }) => (
  <BiSolidPhoneCall size={size} color={color} />
);
export const AddToFavIcon = ({ size = 12, color = undefined }) => (
  <MdFavoriteBorder size={size} color={color} />
);
export const RemoveFromFavIcon = ({ size = 12, color = undefined }) => (
  <MdFavorite size={size} color={color} />
);
export const InfoIcon = ({ size = 12, color = undefined }) => (
  <AiOutlineInfoCircle size={size} color={color} />
);
