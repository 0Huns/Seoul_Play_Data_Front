<h1 align="center">
  <br>
  <img src="https://github.com/user-attachments/assets/82de2341-4070-4738-88e6-d48a5d5becca" alt="Pick-On logo" width="200">
  <p>
  <p>
  Pick-On
  </p>
</h1>

<h4 align="center">서울 창업자를 위한 상권 추천 및 커뮤니티 서비스</h4>

<p align="center">
Pick-On은 서울에서 창업을 준비하는 예비 사장님들을 위해
상권 추천, 성공 확률 예측, 커뮤니티 기능을 제공하는 웹 서비스입니다.
머신러닝 기반의 추천 시스템과 실시간 인기 데이터,
간편한 OAuth 로그인, 반응형 UI를 제공합니다.
</p>

<br>

## 📅 프로젝트 정보

- **개발 기간** : 2025. 04. 14 ~ 2025. 05. 21
- **프론트엔드 배포 사이트** : [pick-on.vercel.app](https://pick-on.vercel.app/)
  <br>
  <br>

## 🛠️ 기술 스택

### 🪄 프론트엔드

<div>
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /> 
  <img src="https://img.shields.io/badge/typescript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/react--icons-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
</div>

### 🪄 배포

<div> 
  <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</div>

<br>

- **프레임워크**: Next.js (App Router)
- **UI 라이브러리**: React, TailwindCSS, React Icons
- **상태/쿠키 관리**: React Hooks, js-cookie
- **API 통신**: fetch (RESTful API)
- **배포/운영**: AWS(통합), Vercel(프론트)

<br>

## 🗂️ 폴더 구조

```bash
📦src
 ┣ 📂app
 ┃ ┣ 📂(main)     // 메인페이지
 ┃ ┣ 📂api        // Next.js API 라우트
 ┃ ┣ 📂board      // 커뮤니티 관련 페이지
 ┃ ┃ ┣ 📂edit
 ┃ ┃ ┣ 📂write
 ┃ ┃ ┗ 📂[id]
 ┃ ┣ 📂login      // 로그인 및 콜백 페이지
 ┃ ┣ 📂search     // 상권 추천/검색 결과 페이지
 ┣ 📂component
 ┃ ┣ 📂auth       // 로그인 관련 컴포넌트
 ┃ ┣ 📂hotTopic   // 인기 카테고리 컴포넌트
 ┃ ┣ 📂nav        // 네비게이션 바
 ┃ ┣ 📂result     // 추천 결과 카드
 ┃ ┣ 📂selectForm // 검색/필터 폼
 ┃ ┣ 📂common     // 공통 컴포넌트
 ┗ 📂data         // 선택 옵션 등 정적 데이터
```

<br>

## 아키텍쳐

![아키텍쳐](https://github.com/user-attachments/assets/7fbdcfcf-1b48-4204-8f85-a67a77c05d3a)

<br>

## 🖥️ UI 구성

- 반응형 네비게이션 바
- 커뮤니티 게시판(글 작성, 수정, 삭제, 상세조회)
- 상권 추천 결과 카드 및 인기 카테고리 시각화
- 로그인/마이페이지/검색/필터 폼 등

<br>

## ✨ 주요 기능

- 간편 로그인 (카카오, 네이버 OAuth)
- 글 작성 / 삭제 / 수정
- 상권 추천 및 성공 확률 예측 (머신러닝 기반)
- 인기 지역/업종/연령/성별 등 실시간 집계
- 반응형 UI

<br>

## ⚙️ 실행 방법

1. **환경 변수 설정**  
   `.env` 파일에 API 엔드포인트 등 환경 변수 작성

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

<br>

---

Pick-On과 함께 서울 창업의 성공 확률을 높여보세요! 🚀
