import { showErrorToaster, showSuccessToaster } from "./toasterHelper";

const handleApiResponse = async (method, showToaster) => {
  try {
    const response = await method;
    const { data = null, success, message,metaData = null } = response.data;
    const result = {
      success,
      message,
      data,
      metaData
    };
    if (success) {
      showToaster && showSuccessToaster(result?.message);
    } else {
      showToaster && showErrorToaster(result?.message);
    }

    return result;
  } catch (error) {
    const { message } = error?.response?.data || {statusCode:500,message:"Something went wrong"};
    const result = {
      success: false,
      message: message || "Something went wrong!",
      data: null,
      metaData: null
    };
    showToaster && showErrorToaster(result.message);
    return result;
  }
};

export default handleApiResponse;
