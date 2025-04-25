import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [currentPage, setCurrentPage] = useState("/");

  useEffect(() => {
    const storedUser = localStorage.getItem("USER_DATA");
      // storedToken = localStorage.getItem("TOKEN");

    setUser(JSON.parse(storedUser));
    // setToken(storedToken);
  }, []);

  const userData = [
    {
      nik: 3515161606060003,
      password: "salam354",
      age: 15,
      role: "civil",
    },
    {
      id: 354313,
      accessToken: 12345678,
      password: "admin354",
      role: "admin",
    },
  ];

  const userVoice = [
      {
        voteType: "dpr",
        choiceId: 2,
        party : "Partai Harmoni Sejahtera"
      },
  ];

  const DPRdata = [
    {
      id: 1,
      partyId: 1,
      name: "Aditya Pangestu",
      image: "/img/Soal 1/Partai Demokrasi Sedjahtera/Caleg (1).png",
    },
    {
      id: 2,
      partyId: 2,
      name: "Ricky Soppeng",
      image: "/img/Soal 1/Partai Harmoni Sejahtera/Caleg (3).png",
    },
    {
      id: 3,
      partyId: 3,
      name: "Hasan Ali",
      image: "/img/Soal 1/Partai integritas Indonesia/Caleg (5).png",
    },
    {
      id: 4,
      partyId: 4,
      name: "Alan Sulaiman",
      image: "/img/Soal 1/Partai Keadilan Mandiri Indonesia/Caleg (2).png",
    },
    {
      id: 5,
      partyId: 5,
      name: "Dito Kusumo",
      image: "/img/Soal 1/Partai Persatuan Rakyat Indonesia/Caleg (4).png",
    },
    {
      id: 6,
      partyId: 1,
      name: "Ayu Rahayu",
      image: "/img/Soal 1/Partai Demokrasi Sedjahtera/Caleg (5).png",
    },
  ];

  const partyImage = [
    {
      id: 1,
      name: "Partai Demokrasi Sedjahtera",
      logo: "/img/Soal 1/Partai Demokrasi Sedjahtera/Partai Demokrasi Indonesia.png",
    },
    {
      id: 2,
      name: "Partai Harmoni Sejahtera",
      logo: "/img/Soal 1/Partai Harmoni Sejahtera/Partai Harmoni Sejahtera.png",
    },
    {
      id: 3,
      name: "Partai Integritas Indonesia",
      logo: "/img/Soal 1/Partai integritas Indonesia/Partai integritas Indonesia.png",
    },
    {
      id: 4,
      name: "Partai Keadilan Mandiri Indonesia",
      logo: "/img/Soal 1/Partai Keadilan Mandiri Indonesia/Partai Keadilan Mandiri Indonesia.png",
    },
    {
      id: 5,
      name: "Partai Persatuan Rakyat Indonesia",
      logo: "/img/Soal 1/Partai Persatuan Rakyat Indonesia/Partai Persatuan Rakyat Indonesia.png",
    },
    {
      id: 6,
      name: "Partai Rakyat Bersatu Indonesia",
      logo: "/img/Soal 1/Partai Rakyat Bersatu Indonesia/Partai Rakyat Bersatu Indonesia.png",
    },
    {
      id: 7,
      name: "Partai Reformasi Indonesia",
      logo: "/img/Soal 1/Partai Reformasi Indonesia/Partai Reformasi Indonesia.png",
    },
  ];

  const presidentDetail = [
    {
      id: 1,
      president: "Anas Baswara",
      vicePresident: "Muhaiyyin Ismail",
      image: "/img/Soal 1/Partai Presiden 1/Presiden (1).png",
      partyId: 1,
    },
    {
      id: 2,
      president: "Praproro Sugianto",
      vicePresident: "Ghufron Reksabuna Reksa",
      image: "/img/Soal 1/Partai Presiden 2/Presiden (2).png",
      partyId: 5,
    },
    {
      id: 3,
      president: "Ginanjar Purnoworo",
      vicePresident: "Mas'ud MC",
      image: "/img/Soal 1/Partai Presiden 3/Presiden (3).png",
      partyId: 6,
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressShow, setProgressShow] = useState(false);

  const openModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const login = (userData) => {
    localStorage.setItem("USER_DATA", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("USER_DATA");
    setUser(null);
  };

  const [voice, setVoice] = useState([]);

  const setUserVoice = (newVoice) => {
    if (voice.length !== 0) {
      setVoice([...voice, newVoice]);
      return;
    }

    setVoice([newVoice]);

    localStorage.setItem("USER_VOICE", JSON.stringify(voice));
  };

  useEffect(() => {
    // const userData = JSON.parse(localStorage.getItem("USER_DATA"));
    // setUser(userData);

    // const localVoice = JSON.parse(localStorage.getItem('USER_VOICE')) || [];

    const localVoice = userVoice;
    localStorage.setItem("USER_VOICE", JSON.stringify(localVoice));

    setVoice(localVoice);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        currentPage,
        setCurrentPage,
        partyImage,
        DPRdata,
        presidentDetail,
        modalMessage,
        openModal,
        showModal,
        closeModal,
        isLoading,
        setIsLoading,
        progressShow,
        setProgressShow,
        userData,
        login,
        logout,
        setUserVoice,
        userVoice,
        voice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
