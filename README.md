# 제목

- 내용

---
# 🌐 Demo

url

---

## ⚡ 실행 방법 (How to Run)

### 1. 데이터베이스 설정

- MySQL 실행 후 아래 SQL 파일 실행

```bash
경로
```
## 2. 로컬 실행

### 📦 Client 실행

#### 1) 패키지 설치

```bash
cd client
npm install
```

#### 2) 개발 서버 실행

```bash
npm run dev
```

#### 3) 빌드

```bash
npm run build
```

---

### ⚙️ Server 실행

#### 1) 패키지 설치

```bash
cd server
npm install
```

#### 2) 서버 실행

```bash
node server.js
```

---

### 🚀 배포용 실행 순서

#### 1) Client 빌드

```bash
cd client
npm install
npm run build
```

#### 2) 빌드 파일을 Server로 복사

```bash
cp -r dist ../server/static
```

#### 3) Server 실행

```bash
cd ../server
npm install
node server.js
```

---

### 🌐 실행 주소

| 구분 | 주소 |
|------|------|
| Client | `http://localhost:5173` |
| Server | `http://localhost:5000` |

---

## 📌 1. 프로젝트 개요 (Project Overview)

### 제공 기능

- 내용

---

## 🛠 2. 기술 스택 (Tech Stack)

### Front-End

- React
- React Query
- Zustand

### Back-End

- Node.js

### Data

- MySQL
- JWT (인증)
- bcrypt (비밀번호 암호화)

---

## 📂 3. 프로젝트 구조 (Project Structure)

```
Dotori-Bank/
├── client/                         # React(Vite) 프론트엔드
│   ├── public/                     # 정적 파일
│   ├── src/                        # 소스 코드
│   │   ├── api/                    # API 요청 함수
│   │   ├── assets/                 # 이미지, 아이콘 등 정적 리소스
│   │   ├── components/             # 공통 컴포넌트
│   │   ├── data/                   # 더미 데이터 및 상수
│   │   ├── hooks/                  # 커스텀 훅
│   │   ├── pages/                  # 페이지 컴포넌트
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── style.css
│   │
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                         # Node.js + Express 백엔드
│   ├── controllers/                # 라우트 핸들러 (비즈니스 로직 처리)
│   │   └── userController.js       # 파일명 예시
│   │
│   ├── routes/                     # API 라우터 정의
│   │   └── userRoutes.js           # 파일명 예시
│   │
│   ├── services/                   # 서비스 계층
│   │   └── userService.js          # 파일명 예시
│   │
│   ├── models/                     # 데이터 모델
│   │   └── userModel.js            # 파일명 예시
│   │
│   ├── middlewares/                # 공통 미들웨어
│   │   └── errorHandler.js         # 파일명 예시
│   │
│   ├── config/                     # 환경 변수 및 설정
│   │   └── default.js              # 파일명 예시
│   │
│   ├── script/                     # 쿼리 폴더
│   │   └── users.sql               # 파일명 예시
│   │
│   ├── utils/                      # 유틸 함수
│   │   └── logger.js               # 파일명 예시
│   │
│   ├── db.js                       # DB 연결 설정
│   ├── app.js                      # Express 앱 설정
│   ├── server.js                   # 서버 실행
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

## 🏗️ 4. 시스템 아키텍처 (Architecture)

```
내용
```

---

## 🔄 5. 코드 실행 흐름

```
내용
```

---

## 🔑 6. 인증 흐름 (JWT)

### 로그인 프로세스

```
내용
```

### 인증 처리

- 내용

```
프로세스
```

---

## 👤 7. 사용자 흐름

```
내용
```

---

## 📊 8. 주요 기능

### 1️⃣ 회원가입

- 입력값: Local State
- 아이디 중복 확인: Server State (React Query)
- 비밀번호 확인: Lifecycle
- 회원가입 처리: Lifecycle
- DB 반영: Server State

---

### 2️⃣ 로그인

- 입력값 검증 (미입력 시 toast)
- 로그인 성공 시 사용자 이름 표시
- 상태 관리: Global UI State (Zustand)


---

## 🧠 9. 상태 관리 (State Management)

### 상태 종류

```
Local State
→ 내용 

Server State (React Query)
→ 내용 

Global State (Zustand)
→ 내용

UI State (Lifecycle)
→ 내용
```

---

### 전체 흐름

```
내용
```

---

### 회원가입

- 입력값: Local State  
- 아이디 중복 확인: Server State
- 비밀번호 확인: UI State  
- 회원가입 요청: Server State
- DB 반영: Server State  

---

### 로그인

- 입력값: Local State  
- 미입력 toast: UI State  
- 로그인 요청: Server State  
- 로그인 결과: Global State (Zustand)  

---

### 핵심 기준

```
서버 데이터 → React Query
UI 상태 → useState
로그인 상태 → Zustand
```

---

### 주의 사항

❌ 내용 
✅ 내용


---

## ⚠️ 어려웠던 점 & 해결 방법

### 1. 제목

- 내용

👉 해결  
- 내용

---

## 📚 배운 점

### 1. 제목

- 내용

👉 해결  
- 내용

---

## 👍 좋은 점


### 1. 제목

- 내용

👉 해결  
- 내용

---

## 🚀 개선 방향 (Future Improvements)

- 내용