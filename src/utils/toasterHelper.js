import { toast } from "react-toastify";

export const showSuccessToaster = (message) => {
  toast.success(message, {
    // position: toast.POSITION.TOP_CENTER,
    style: {
      zIndex: 99999
    }
  });
};

export const showErrorToaster = (message) => {
  toast.error(message, {
    style: {
      zIndex: 99999
    }
  });
};

export const showInfoToaster = (message) => {
  toast.info(message, {
    style: {
      zIndex: 99999
    }
  });
};
