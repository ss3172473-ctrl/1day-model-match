# Data Model

MVP 구현을 위한 핵심 데이터베이스 엔티티 설계입니다. 결제 관련 정보는 초기 버전에서 제외되었습니다.

## 1. User (사용자 계정)
사용자의 역할(Role)에 따라 접근 권한과 인터페이스가 다릅니다.
- `id`: PK (UUID 등)
- `email` / `password_hash`: 인증 수단
- `role`: Enum (`ORGANIZER`, `MODEL`, `MD`)
- `name`: 가입자 이름 또는 닉네임
- `phone`: 연락처
- `created_at` / `updated_at`

## 2. ModelProfile (모델 프로필 정보)
개인 모델이 자신의 계정에 만들거나, MD가 소속 모델을 위해 생성합니다.
- `id`: PK
- `owner_id`: FK -> User.id (이 프로필을 관리하는 계정. 모델 본인이면 본인 id, MD면 MD의 id)
- `name`: 모델 활동명
- `age`: 나이 (필수)
- `height`: 키 (필수)
- `weight`: 몸무게 (필수)
- `photos`: Array of URLs (기본 프로필 사진들, 필수)
- `bio`: 추가 소개 (선택)
- `instagram_id`: 인스타그램 링크 (선택)
- `experience`: 경력 텍스트 (선택)
- `created_at` / `updated_at`

## 3. JobPost (구인 공고)
파티 주최자가 작성하는 1일 알바 공고입니다.
- `id`: PK
- `organizer_id`: FK -> User.id
- `event_datetime`: 행사 일시
- `location_detail`: 상세 장소
- `pay_amount`: 일당 (숫자 또는 문자열)
- `required_headcount`: 필요 인원수
- `additional_requirements`: 추가 요구 사항 (복장, 컨셉 등)
- `status`: Enum (`OPEN`, `CLOSED`, `CANCELLED`)
- `created_at` / `updated_at`

## 4. Application (지원 내역)
모델 프로필을 가진 주체(모델 또는 MD)가 공고에 지원할 때 생성됩니다.
- `id`: PK
- `job_post_id`: FK -> JobPost.id
- `applicant_user_id`: FK -> User.id (실제 지원 버튼을 누른 사람, 모델 본인 or MD)
- `model_profile_id`: FK -> ModelProfile.id (누가 일하러 가는지 식별)
- `live_photo_url`: 실시간 카메라로 촬영한 사진 URL (핵심 기능, 필수)
- `status`: Enum (`PENDING`, `APPROVED`, `REJECTED`)
- `applied_at`: 지원 일시

## 핵심 논리 (Relationships)
* **MD의 다중 프로필 관리:** `User` (role=MD)는 여러 개의 `ModelProfile`을 생성할 수 있습니다. `ModelProfile.owner_id`가 해당 MD의 `User.id`가 됩니다.
* **지원 주체 분리:** MD가 지원할 경우 `applicant_user_id`는 MD이고, `model_profile_id`는 그가 선택한 소속 모델입니다. 주최자는 `Applicant(지원자=MD)`와 소통해야 함을 알 수 있습니다.
