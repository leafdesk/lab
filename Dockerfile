# ───────────────────────────────────
# 1) Build stage
# ───────────────────────────────────
FROM node:22.14.0-alpine AS builder

# 시스템 라이브러리 (Next.js standalone 실행에 필요)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# pnpm 설치 및 의존성 캐시
RUN npm install -g pnpm@10.10.0
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# 소스 복사 & 빌드
COPY . .
RUN pnpm build

# ───────────────────────────────────
# 2) Runtime stage
# ───────────────────────────────────
FROM node:22.14.0-alpine AS runner

# 앱 전용 그룹(app:1001), 사용자(app:1001) 생성
RUN addgroup -g 1001 app \
 && adduser  -D -u 1001 -G app -s /bin/sh app

WORKDIR /app

# 빌드 결과물만 복사
COPY --from=builder --chown=1001:1001 /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 로그 디렉터리를 앱 유저 권한으로 생성
RUN mkdir -p /app/logs \
 && chown -R app:app /app/logs

# 비(非)루트 실행을 위해 app 유저 사용
USER app

# 환경 변수
ENV NODE_ENV=production
EXPOSE 3000

# Next.js Standalone output의 entrypoint
CMD ["node", "server.js"]