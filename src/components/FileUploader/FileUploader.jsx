import { useRef, useState } from "react";
import { toast } from "react-toastify";
import css from "./FileUploader.module.css";

export const FileUploader = ({ onFileSelect }) => {
  const fileInput = useRef(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    // console.log(file);

    if (file.type !== "image/jpeg") {
      toast.error("The file must conform to the jpeg format");
      return;
    }

    // if (file.size > 1024) {
    //   toast.error("File size cannot exceed more than 1MB");
    //   return;
    // }

    file ? setIsFileSelected(true) : setIsFileSelected(false);

    onFileSelect(file);
  };

  return (
    <div className="file-uploader">
      <input
        type="file"
        ref={fileInput}
        onChange={handleFileInput}
        className="visually-hidden"
      />
      <button
        onClick={(e) => fileInput.current && fileInput.current.click()}
        className={css["select-btn"]}
        type="button"
      >
        {isFileSelected ? "New file is selected..." : "Select new file"}
      </button>
    </div>
  );
};
