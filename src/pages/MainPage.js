import { Box, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";
import Loading from "../components/Loading";
import Input from "../components/Input";
import Dialog1 from "../components/Dialog1";
import Dialog2 from "../components/Dialog2";
import { useFilePicker } from "use-file-picker";
import { postQuestion, postQuestionWithImage } from "../util/requests";
function MainPage() {
  const [isAsked, setIsAsked] = useState(false);

  const [hasError, setHasError] = useState(false);

  const [data, setData] = useState({
    name: "",
    serie: "",
    package: "",
    yearkm: "",
  });

  const answers = [
    "Sayın " +
      data.name +
      " gönderdiğiniz talebiniz AutoMate tarafından işleme alınmıştır. En kısa zamanda sizinle iletişime geçilecektir.",
    data.serie +
      " serili " +
      data.package +
      " aracınızın " +
      data.yearkm +
      " km için ücret bilgisi tespit edilip tarafınıza dönüş sağlanacaktır.",
    "Verdiğiniz bilgilere göre serisi " +
      data.serie +
      ", paketi " +
      data.package +
      " olan ve yıl/kilometresi " +
      data.yearkm +
      " olan aracın",
  ];

  function submitHandler() {
    handleCloseDialog2();
    setQuestions((prev) => [...prev, answers[0]]);
    setIsAsked(false);
    setData({ name: "", serie: "", package: "", yearkm: "" });
  }

  function submit1Handler() {
    setOpenDialog1(false);
    setQuestions((prev) => [...prev, answers[1]]);
    setIsAsked(false);
    setData({ name: "", serie: "", package: "", yearkm: "" });
  }
  const [questions, setQuestions] = useState([]);

  const [form1Message, setForm1Message] = useState("");
  const [form2Message, setForm2Message] = useState("");

  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);

  const handleOpen = () => {
    setOpenDialog1(true);
  };
  const handleCloseDialog2 = () => {
    setOpenDialog2(false);
    // setQuestions((prev) => [...prev, answers[Math.floor(Math.random() * 3)]]);
  };
  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
    // setQuestions((prev) => [...prev, answers[Math.floor(Math.random() * 3)]]);
  };

  function getLocation() {
    setQuestions((prev) => [...prev, "Bana en yakın servis nerede?"]);
    setText("");
    console.log(questions);
    setIsAsked(true);
    setTimeout(function () {
      setQuestions((prev) => [...prev, "location"]);

      setIsAsked(false);
    }, 2000);
  }

  async function askQuestion(text) {
    if (isAsked) {
      return;
    }
    if (text.trim().length === 0) {
      setHasError(true);
      return;
    }

    if (!hasError) {
      setQuestions((prev) => [...prev, text]);
      setText("");
      clear();

      setIsAsked(true);
      if (filesContent.length === 0) {
        const response = await postQuestion(text);
        console.log(response.type)
        if (response.type == null) {
          setQuestions((prev) => [...prev, response.result]);
          setIsAsked(false);
          return;
        }
        if (response.type == "form-2") {
          setOpenDialog2(true);
          setForm2Message(response.result);
          return;
        }
        if (response.type == "form-1") {
          setOpenDialog1(true);
          setForm1Message(response.result);
          return;
        } else {
          setQuestions((prev) => [
            ...prev,
            "Oops! ufak bir sorun çıktı, hemen hallediyorum...",
          ]);
          setIsAsked(false);
          return;
        }
      }
      var formData = new FormData();
      formData.append("question", text);
      formData.append("file", plainFiles[0]);

      const response = await postQuestionWithImage(formData);

      setQuestions((prev) => [...prev, response.result]);
      setIsAsked(false);
    }
  }

  const { openFilePicker, filesContent, plainFiles, loading, errors, clear } =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      multiple: false,
    });

  function clearChat() {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
    clear();
    if (!isAsked) {
      setQuestions([]);
      setIsAsked(false);
    }
  }

  const [text, setText] = useState("");

  function textFieldHandler(value) {
    setHasError(false);
    setText(value.target.value);
  }
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [isAsked]);

  return (
    <>
      <Grid container>
        <Navbar />

        <Dialog1
          open={openDialog1}
          handleClose={handleCloseDialog1}
          submit1Handler={submit1Handler}
          setData={setData}
          data={data}
          message={form1Message}
        />
        <Dialog2
          open={openDialog2}
          handleClose={handleCloseDialog2}
          submitHandler={submitHandler}
          setData={setData}
          data={data}
          message={form2Message}
        />
        <Chat questions={questions} />

        <Loading isAsked={isAsked} />
        <div ref={lastMessageRef} />
        <Grid container display="flex" flexDirection="row">
          <Input
            clearChat={clearChat}
            hasError={hasError}
            text={text}
            textFieldHandler={textFieldHandler}
            askQuestion={askQuestion}
            isAsked={isAsked}
            handleOpen={handleOpen}
            openFilePicker={openFilePicker}
            filesContent={filesContent}
            getLocation={getLocation}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default MainPage;
