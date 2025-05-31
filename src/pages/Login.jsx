import * as React from "react";
import { useState, useHistory } from "react";
import PageTitle from "../Components/PageTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ViewKanban } from "@mui/icons-material";
import API_URL from "../api_url";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        FarmFarm
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme({
  typography: {
    fontFamily: ["SUIT-regular", "SUIT-Bold"],
  },
});

const Login = () => {
  const [form, setForm] = useState({ user_id: "", user_pw: "" });

  const [message, setMessage] = useState(""); //DB 응답 결과

  const loginUrl = `${API_URL}/auth/login`;

  const infoSending = async () => {
    console.log(form);
    try {
      const response = await axios.post(loginUrl, form);
      const responseData = response.data;
      console.log("응답 데이터:", responseData);

      if (response.status) {
        Swal.fire({
          title: `${responseData.user_nick}님, 반갑습니다!🥕`,
          timer: 0,
          imageUrl:
            "https://media.tenor.com/uTq6EOBVvYoAAAAC/%EC%9D%B8%EC%82%AC-%EB%86%80%EC%9E%90%EA%B3%B0.gif",
          imageWidth: 400,
          imageHeight: 400,
          confirmButtonColor: "#05AC7B",
          imageAlt: "Custom image",
          buttons: "확인",
          closeOnClickOutside: false,
        }).then((value) => {
          if (value) {
            window.location.replace("/");
          }
        });

        sessionStorage.setItem("user_id", responseData.id);
        sessionStorage.setItem("user_nick", responseData.user_nick);
        sessionStorage.setItem("user_type", responseData.user_type);
      }

      // window.location.replace('/')

      setMessage(responseData);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400)
        return alert(error.response.data.message);
      console.error("통신 실패:", error);
      alert("서버에 문제가 발생하였습니다. 다시 한 번 시도해주세요!");
    }
  };

  return (
    <>
      <PageTitle data={"로그인"} num={1} />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          {/* <CssBaseline /> */}
          <Box
            sx={{
              marginTop: 8,
              marginLeft: "320px",
              marginRight: "320px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          ></Box>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              color="success"
              margin="normal"
              required
              fullWidth
              id="user_id"
              value={form.user_id}
              label="아이디"
              name="id"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setForm({ ...form, user_id: e.target.value });
              }}
            />
            <TextField
              color="success"
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              value={form.user_pw}
              autoComplete="current-password"
              onChange={(e) => {
                setForm({ ...form, user_pw: e.target.value });
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                component={Link}
                to="/"
                type="submit"
                sx={{
                  "&:hover": {
                    background: "#00C897",
                  },
                  background: "#05AC7B",
                  borderRadius: "20px",
                  marginTop: "40px",
                  width: "180px",
                }}
                onClick={infoSending}
              >
                로그인
              </Button>
            </Box>
            <Grid container justifyContent="center">
              <Grid
                item
                sx={{
                  borderRadius: "20px",
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                <Link href="/join" variant="body2">
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
          <Box
            xs={{
              height: "300px",
            }}
          ></Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
