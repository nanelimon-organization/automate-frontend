import axios from "axios";

export async function postQuestion(question) {
  try {
    const response = await axios.post(
      "https://automate-service.onrender.com/chat_router?question=" + question
    );
    return response.data;
  } catch (e) {
    console.log("hata!");
  }
}

export async function postQuestionWithImage(formData) {
  try {
    const response = await axios.post(
      "https://automate-service.onrender.com/vision_router",
      formData,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log("hata!");

  }
}

