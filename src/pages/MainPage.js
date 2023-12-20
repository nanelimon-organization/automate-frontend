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
function MainPage() {
  const [isAsked, setIsAsked] = useState(false);

  const [hasError, setHasError] = useState(false);

  const locations = [
    {
      name: "Borusan Oto Adana - Mersin",
      address: "Yenice Mah. Cemal Gürsel Blv. No: 160/A Tarsus / Mersin",
      phone: "0850 755 06 06",
      lat: 36.977588,
      lng: 35.080323,
    },
    {
      name: "Borusan Oto Avcılar",
      address: "Firuzköy Bulvarı No 21 Avcılar / İstanbul",
      phone: "0850 755 06 06",
      lat: 40.992769,
      lng: 28.716821,
    },
    {
      name: "Borusan Oto Bodrum",
      address: "Konacık Mah. Atatürk Bulvarı No:214/1 Bodrum / Muğla",
      phone: "0850 755 06 06",
      lat: 37.056024,
      lng: 27.371859,
    },
    {
      name: "Borusan Oto Çayyolu",
      address: "Konutkent Mah. 3028 Cad. No:6 İç Kapı No:130  Çankaya/Ankara",
      phone: "0850 755 06 06",
      lat: 39.879158,
      lng: 32.655756,
    },
    {
      name: "Borusan Oto Çorlu",
      address: "E-5 Karayolu üzeri İstanbul Cad. No:39 Çorlu / Tekirdağ",
      phone: "0850 755 06 06",
      lat: 41.142448,
      lng: 27.862961,
    },
    {
      name: "Borusan Oto Diyarbakır",
      address:
        "Mezopotamya Mah. Mahabad Bulvarı No: 61 D Kayapınar / Diyarbakır",
      phone: "0850 755 06 06",
      lat: 37.934383,
      lng: 40.155239,
    },
    {
      name: "Borusan Oto Esenboğa",
      address: "Saracalar Mahallesi Özal Bulvarı No: 228 Akyurt / Ankara",
      phone: "0850 755 06 06",
      lat: 40.087867,
      lng: 32.974723,
    },
    {
      name: "Borusan Oto Gaziantep",
      address:
        "15 Temmuz Mah. Prof. Dr. Necmettin Erbakan Bulvarı No: 73/49 Prime Cadde  ŞEHİTKAMİL/GAZİANTEP",
      phone: "0850 755 06 06",
      lat: 37.050919,
      lng: 37.316005,
    },
    {
      name: "Borusan Oto İstinye",
      address: "Poligon Mahallesi Sarıyer Cad. No 77 Sarıyer / İstanbul",
      phone: "0850 755 06 06",
      lat: 41.120336,
      lng: 29.047132,
    },
    {
      name: "Borusan Oto Kıbrıs",
      address: "Organize Sanayi Bölgesi 1. Cadde No: 21 Lefkoşa / K.K.T.C.",
      phone: "0392 225 27 22",
      lat: 35.213077,
      lng: 33.344071,
    },
    {
      name: "Borusan Oto Samandıra",
      address: "Akpınar mah. Bilim cad. No:2 Sancaktepe / İstanbul",
      phone: "0850 755 06 06",
      lat: 40.975616,
      lng: 29.228871,
    },
    {
      name: "Borusan Oto Vadi",
      address:
        "Hamidiye Mahallesi, Selçuklu Caddesi, No:10 C Blok Vadi Park / Kağıthane / İstanbul",
      phone: "0850 755 06 06",
      lat: 41.1022,
      lng: 28.973314,
    },
  ];

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

  const answers = [
    "Sayın " +
      data.name +
      " gönderdiğiniz talebiniz AutoMate tarafından işleme alınmıştır. En kısa zamanda sizinle iletişime geçilecektir.",
    "Sayın " +
      data.name +
      " " +
      data.serie +
      " serili " +
      data.sasi +
      " şasi numarasına sahip " +
      data.package +
      " aracınızın " +
      data.yearkm +
      " km için ücret bilgisi tespit edilip tarafınıza dönüş sağlanacaktır.",
    "Yaptığınız işlemden vazgeçtiniz, başka bir talep veya sorunuz varsa memnuniyet ile cevap verebilirim.",
  ];

  function submitHandler() {
    setQuestions((prev) => [...prev, answers[0]]);
    setOpenDialog2(false);
    setIsAsked(false);
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

  function submit1Handler() {
    setOpenDialog1(false);
    setQuestions((prev) => [...prev, answers[1]]);
    setIsAsked(false);
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
    setQuestions((prev) => [...prev, answers[2]]);
    setIsAsked(false);
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
  };
  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
    setQuestions((prev) => [...prev, answers[2]]);
    setIsAsked(false);
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
  };

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  let bayi = {};
  const toRadians = (degree) => {
    return degree * (Math.PI / 180);
  };

  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    let distance = 999;
    const R = 6371;

    for (let i = 0; i < locations.length; i++) {
      const dLat = toRadians(locations[i].lat - crd.latitude);
      const dLon = toRadians(locations[i].lng - crd.longitude);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(crd.latitude)) *
          Math.cos(toRadians(locations[i].lat)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      if (d < distance) {
        distance = R * c;
        bayi = locations[i];
      }
    }
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
    

    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function getLocation() {
    setQuestions((prev) => [...prev, "Bana en yakın servis nerede?"]);
    setText("");
    console.log(questions);
    setIsAsked(true);
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            console.log("izin var!");
            navigator.geolocation.getCurrentPosition(
              success,
              errorsHandler,
              options
            );
          } else if (result.state === "prompt") {
            console.log("bell değil sanırım");
            navigator.geolocation.getCurrentPosition(
              success,
              errorsHandler,
              options
            );
          } else if (result.state === "denied") {
            console.log("izin yok!");
            navigator.geolocation.getCurrentPosition(
              success,
              errorsHandler,
              options
            );
          }
        });
    } else {
      console.log("bu tarayıcıda geolocation desteklenmiyor!");
    }
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
        console.log(response.type);
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
