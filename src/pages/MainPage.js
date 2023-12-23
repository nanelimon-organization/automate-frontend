import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";
import Loading from "../components/Loading";
import Input from "../components/Input";
import Dialog1 from "../components/Dialog1";
import Dialog2 from "../components/Dialog2";
import { useFilePicker } from "use-file-picker";
import { postQuestion, postQuestionWithImage } from "../util/requests";
import { calculateDistance, getCurrentLocation } from "../util/getLocation";

function MainPage() {

  const [isAsked, setIsAsked] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [form1Answer, setForm1Answer] = useState("");
  const [form2Answer, setForm2Answer] = useState("");
  const [openForm1, setOpenForm1] = useState(false);
  const [openForm2, setOpenForm2] = useState(false);
  const [data, setData] = useState({
    name: "",
    surname: "",
    serie: "",
    phone: "",
    email: "",
    package: "",
    yearkm: "",
    sasi: "",
    plaka: "",
    seri: "",
    model: "",
    adres: "",
  });

  const lastMessageRef = useRef(null);
  
  function clearData() {
    setData({
      name: "",
      surname: "",
      serie: "",
      phone: "",
      email: "",
      package: "",
      yearkm: "",
      sasi: "",
      plaka: "",
      seri: "",
      model: "",
      adres: "",
    });
  }

  let form1SubmitAnswer = `Sayın ${data.name}, ${data.serie} serili ${data.sasi} şasi numarasına sahip ${data.package} aracınızın ${data.yearkm} km için ücret bilgisi tespit alınıp tarafınıza dönüş sağlanacaktır.`;
  let form2SubmitAnswer = `Sayın ${data.name} gönderdiğiniz talebiniz AutoMate tarafından işleme alınmıştır. En kısa zamanda sizinle iletişime geçilecektir.`;
  let cancelAnswer =
    "Yaptığınız işlemden vazgeçtiniz, başka bir talep veya sorunuz varsa memnuniyet ile cevap verebilirim.";

  function submitForm2Handler() {
    setOpenForm2(false);
    setQuestions((prev) => [...prev, form2SubmitAnswer]);
    setIsAsked(false);
    clearData();
  }

  function submitForm1Handler() {
    setOpenForm1(false);
    setQuestions((prev) => [...prev, form1SubmitAnswer]);
    setIsAsked(false);
    clearData();
  }

  const handleCloseForm2 = () => {
    setOpenForm2(false);
    setQuestions((prev) => [...prev, cancelAnswer]);
    setIsAsked(false);
    clearData();
  };

  const handleCloseForm1 = () => {
    setOpenForm1(false);
    setQuestions((prev) => [...prev, cancelAnswer]);
    setIsAsked(false);
    clearData();
  };

  function success(pos) {
    let bayi = calculateDistance(pos);
    setQuestions((prev) => [...prev, { key: "location", value: bayi }]);
    setIsAsked(false);
  }

  function errorsHandler(err) {
    setQuestions((prev) => [
      ...prev,
      {
        key: "location",
        value:
          "Size en yakın servisi gösterebilmem için konum izni almam gerekiyor...",
      },
    ]);
    setIsAsked(false);
  }

  function getLocation() {
    setQuestions((prev) => [...prev, "Bana en yakın servis nerede?"]);
    setText("");
    setIsAsked(true);
    getCurrentLocation(success, errorsHandler);
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
        try {
          const response = await postQuestion(text);
          console.log(response.type);
          if (response.type == null) {
            setQuestions((prev) => [...prev, response.result]);
            setIsAsked(false);
            return;
          }
          if (response.type === "form-2") {
            setOpenForm2(true);
            setForm2Answer(response.result);
            return;
          }
          if (response.type === "form-1") {
            setOpenForm1(true);
            setForm1Answer(response.result);
            return;
          } else {
            setQuestions((prev) => [
              ...prev,
              "Oops! ufak bir sorun çıktı, hemen hallediyorum...",
            ]);
            setIsAsked(false);
            return;
          }
        } catch (error) {
          setQuestions((prev) => [...prev, "Bir hata oluşmuş olabilir, bağlantıyı kontrol ediniz"]);
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

  const { openFilePicker, filesContent, plainFiles, clear } = useFilePicker({
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

  function textFieldHandler(value) {
    setHasError(false);
    setText(value.target.value);
  }

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 700);
  }, [isAsked, questions, setIsAsked]);

  return (
    <>
      <Grid container>
        <Navbar />

        <Dialog1
          open={openForm1}
          handleClose={handleCloseForm1}
          submit1Handler={submitForm1Handler}
          setData={setData}
          data={data}
          message={form1Answer}
        />
        <Dialog2
          open={openForm2}
          handleClose={handleCloseForm2}
          submitHandler={submitForm2Handler}
          setData={setData}
          data={data}
          message={form2Answer}
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
