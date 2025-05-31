import React from "react";
import PageTitle from "../Components/PageTitle";
import "../Css/PredictPage.css";
import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import axios from "axios";
import MachineSlide from "../MachineSlide ";
import { Recommend } from "@mui/icons-material";
import Recommendation from "../Components/Recommendation";
import API_URL from "../api_url";

const Machin = () => {
  const [priceList, setPriceList] = useState([]);

  useEffect(() => {
    const priceUrl = `${API_URL}/price/crop_price`;
    axios
      .get(priceUrl, { responseType: "json" })
      .then((response) => {
        setPriceList(response.data);
        console.log("예측 페이지 들어왔을때 받은 데이터", response.data);
      })
      .catch((error) => {
        console.error("보내기 에러");
      });
  }, []);

  return (
    <>
      <PageTitle data={"작물 추천"} num={3} />
      <div className="machinAll-container">
        <div id="predictPage"></div>
        <div>
          <Recommendation />

          <p className="machin_title">
            작물가격 예측하기(현재 지원하지 않습니다.)
          </p>
          <MachineSlide slideData={priceList} />
        </div>
      </div>
    </>
  );
};

export default Machin;
