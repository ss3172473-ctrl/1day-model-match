# Project Spec & Implementation Guide

본 프로젝트의 기술 스택, 플랫폼 요건, 구현 시 주의사항을 정의합니다.

## Platform & UI Guidelines
* **Target Device:** 모바일 웹 중심 (스마트폰 브라우저 Safari, Chrome 등에서 접속 시 네이티브 앱처럼 동작). 데스크탑 화면에서는 모바일 프레임뷰(가운데 정렬된 좁은 width)로 대응.
* **Aesthetics (UI/UX):**
  * 토스(Toss) 앱 빌더 수준의 디자인을 지향합니다.
  * 큰 타이포그래피, 여백(padding/margin)을 넓게 쓴 시원한 레이아웃.
  * 플로팅 액션 버튼(FAB)과 스티키 하단 버튼 등 모바일 친화적인 조작계 사용.
  * 불필요한 라인을 줄이고 면과 그림자로 계층을 구분하는 깔끔한 스타일.

## Recommended Tech Stack
(구체적인 스택은 협의에 따라 변경 가능하지만, 현대적인 웹앱 구축을 위한 제안입니다.)
* **Frontend:** Next.js (또는 React + Vite) 기반 모바일 반응형 웹 구축.
* **Styling:** Vanilla CSS, CSS Modules 또는 TailwindCSS를 활용한 커스텀 UI 토큰 구축. (토스 스타일의 디자인 시스템 적용)
* **Backend / Database:** Supabase (PostgreSQL + Auth + Storage) 또는 Firebase. (MVP 단계에서 빠른 구축, 실시간 사진 업로드를 위한 스토리지 지원 등 이점)
* **Hosting:** Vercel (Next.js 사용 시)

## Key Implementation Details

1. **실시간 카메라 호출 (Live Camera Capture)**
   - 모바일 브라우저에서 사용자가 갤러리가 아닌 **반드시 카메라를 열어 촬영하도록** 유도해야 합니다.
   - HTML 속성: `<input type="file" accept="image/*" capture="user">` (또는 `capture="environment"`)를 사용하여 구현. (iOS Safari와 Android Chrome 모두 지원)
   - 사진이 너무 크면 스토리지 비용이 발생하고 업로드가 느려지므로, 브라우저 단에서 Image Resizing(Canvas 활용)을 거친 후 서버로 업로드하는 로직 권장.

2. **MD와 모델의 데이터 분리 제어**
   - MD 유저로 접속 시, '내 프로필'이 아니라 '소속 모델 목록' 메뉴가 먼저 보여야 합니다.
   - 지원 폼 제출 시 API 요청 payload에 `applicant_user_id`와 `model_profile_id`를 각각 검증하여 권한 없는 프로필로 지원하는 것을 차단.

## Do Not Build (개발 금지)
* **MVP 단계에서 결제 기능 연동 금지:** PG사 연동이나 에스크로 로직 코드는 완전히 배제합니다.
* **데스크탑 전용 와이드 뷰 금지:** PC에서 접속하더라도 모바일 사이즈(max-width: 480px) 컨테이너 내에서 렌더링되게 처리하고 무리하게 2단/3단 레이아웃을 짜지 마세요.
* **복잡한 캘린더 예약 컴포넌트:** 초기에는 주최자가 단순 날짜/시간 선택기를 이용하고 목록으로 보여주는 선에서 끝내세요. 복잡한 캘린더 스케줄러 구현은 오버엔지니어링입니다.
