import React from "react";
import "./Header.css";
import "./Main.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slide from "./Slide";
import { getResizeEventListener } from "./utils";

const Mainpage = () => {
  // 프로젝트 소개 모달 상태 관리
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [hideForWeek, setHideForWeek] = useState(false);

  useEffect(() => {
    // localStorage에서 마지막으로 모달을 닫은 날짜 확인
    const lastClosedDate = localStorage.getItem("projectModalLastClosed");

    if (lastClosedDate) {
      const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // 일주일을 밀리초로 변환
      const timeDiff = Date.now() - parseInt(lastClosedDate);

      // 일주일이 지나지 않았으면 모달을 보여주지 않음
      if (timeDiff < oneWeekInMs) {
        setShowProjectModal(false);
      } else {
        setShowProjectModal(true);
      }
    } else {
      // 처음 방문이면 모달 표시
      setShowProjectModal(true);
    }
  }, []);

  // 모달 닫기 함수
  const handleCloseModal = () => {
    if (hideForWeek) {
      // 현재 날짜를 localStorage에 저장
      localStorage.setItem("projectModalLastClosed", Date.now().toString());
    }
    setShowProjectModal(false);
  };

  useEffect(() => {
    // 리사이즈 이벤트가 발생할 때마다 화면 크기에 따라 요소들을 조정하는 이벤트 리스너 추가
    const resizeEventListener = getResizeEventListener(1920, 1080);
    window.addEventListener("resize", resizeEventListener);

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", resizeEventListener);
    };
  }, []);

  // 이미지 슬라이더
  const myRef = React.createRef();

  const [showBanner, setShowBanner] = useState(true);
  // showBanner라는 상태 변수를 선언 , 초기값으로 'false'를 설정 => 플로팅 배너의 보이기/숨기기 여부를 제어할 때 사용
  const [bannerTop, setBannerTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBanner(scrollY >= 0);
      setBannerTop(scrollY + 20);
      // 플로팅 배너의 상단 위치를 스크롤 값에 따라 업데이트
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 스크롤이 내려갔을대 메인버튼이 움직이도록 구현되게 하는 코드

  const [animate, setAnimate] = useState(false);

  const animationTriggerPosition = 500; // 스크롤이 이 위치보다 아래로 내려갔을 때 애니메이션 실행

  const handleScroll = () => {
    if (window.scrollY > animationTriggerPosition) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="main-bg">
      {/* 메인 배경이미지 */}

      <Slide />
      <img src="/img/mainImage.png" id="main-image" />

      <div id="main-container">
        {/* 플로팅 배너 */}
        <div
          className={`floating-banner ${showBanner ? "show" : ""}`}
          style={{ top: bannerTop, textDecoration: "none" }}
        >
          {/* showBanner 변수의 값에 따라 플로팅 배너에 show 클래스를 추가하거나 제거 */}
          {/* 배너 내용 */}
          <Link to="/machin" className="MACHINBANNER">
            <img
              src="/img/main_banner.png"
              alt="banner"
              className="machinBanner"
            />

            <span
              className="machin_text1"
              style={{ textDecorationLine: "none" }}
            >
              <span>작물 추천 </span>
              <br />
              <span style={{ paddingLeft: "185px", textDecoration: "none" }}>
                알아보기
              </span>
            </span>
          </Link>
        </div>

        <div id="mainTitle">
          <span>소중한 땅 한조각</span>
          <br />
          <span>행복을 키우는</span>
          <br />
          <span className="mainTitle_1">팜팜을 만나보세요!</span>
        </div>
        <div id="sub">
          <span>
            텃밭을 나누고 받으며, 자연과 소통하는 특별한 공간을 경험해보세요.
            <br />
            지금 내 텃밭을 내놓거나 특별한 나만의 공간을 구해보세요!
          </span>
        </div>

        <div id="MAINTITLE2">
          <div id="mainTitle2">
            <span>팜팜탐험</span>
          </div>
          <span className="sub2">작은 행복과 자연의 만남을 기다려요~</span>
          <div className="brocol">
            <img src="/img/brocol.png" />
          </div>
        </div>

        <span className="mainTitle3">텃밭소식</span>
        <br />
        <span className="sub3">지금 바로 나만의 텃밭을 만나보세요!</span>

        <div id="MAINBUTTON" className={animate ? "animate" : ""}>
          <div className="mainbutton1">
            <img src="/img/mainbutton1.png" alt="mainbutton1" />
          </div>
          <div className="mainbutton2">
            <img src="/img/mainbutton2.png" alt="mainbutton2" />
          </div>

          <div className="findbtn">
            <Link to="/find/" className="findname">
              <span>바로가기→</span>
            </Link>
          </div>

          {/* mainbutton1에 버튼으로 사용할 것 만들기 */}

          <div className="findbtn2">
            <Link to="/out" className="findname2">
              <span>바로가기→</span>
            </Link>
          </div>
        </div>

        {/* 프로젝트 소개 모달 */}
        {showProjectModal && (
          <div className="project-modal" onClick={handleCloseModal}>
            <div
              className="project-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>🌱 팜팜 프로젝트에 오신 것을 환영합니다!</h2>
              <p>
                <span className="project-highlight">팜팜</span>은 광인사 4기
                App이앙 조에서 만든 프로젝트로 코딩을 처음 배우기 시작한
                멤버들이 열심히 만든 사이트입니다.
              </p>
              <p>
                처음 만들었던 만큼 부족한 점이 많지만, 그때의 추억을 보존하기
                위해 최대한 수정하지 않은 상태로 배포했으니 참고바랍니다.
              </p>
              <p>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  ⚠️ 실제 운영되는 서비스가 아닌 프로젝트 작품입니다.
                </span>
              </p>

              <div className="project-modal-buttons">
                <label className="project-modal-checkbox">
                  <input
                    type="checkbox"
                    checked={hideForWeek}
                    onChange={() => setHideForWeek(!hideForWeek)}
                  />
                  일주일 동안 보지 않기
                </label>
                <button
                  className="project-modal-close"
                  onClick={handleCloseModal}
                >
                  시작하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mainpage;
