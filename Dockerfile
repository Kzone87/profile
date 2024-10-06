# Node.js 이미지 사용
FROM node:20

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 설치를 위한 package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 환경 변수 파일 복사
COPY .env ./

# 애플리케이션 소스 복사
COPY ./ ./

# 환경 변수 설정 (올바른 형식)
ENV PORT=5000

# 애플리케이션 실행
CMD ["node", "index.js"]

# 포트 설정
EXPOSE 80
